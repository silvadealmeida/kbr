-- Fase 4D.2 — gravação CAS do Progress v1 por usuário.
--
-- O cliente envia o token `sync_id` lido junto com o snapshot. O RPC só grava
-- se o token ainda for o atual, devolvendo o snapshot vencedor em conflito.
-- `SECURITY INVOKER` mantém a RLS e os grants da tabela valendo; o dono da
-- linha é sempre `auth.uid()`, nunca um `user_id` vindo do payload.
--
-- `p_expected_user_id` é uma asserção de sessão: o cliente declara para qual
-- usuário construiu o store. Se a sessão atual for outra (troca de conta,
-- store antigo reutilizado), o RPC falha com 42501 em vez de gravar o
-- progresso antigo na conta nova.

create or replace function public.save_user_progress(
  p_expected_user_id uuid,
  p_expected_sync_id uuid,
  p_progress jsonb
)
returns table (
  applied boolean,
  progress jsonb,
  current_sync_id uuid
)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_inserted integer := 0;
  v_current public.user_progress%rowtype;
  v_new_sync_id uuid := pg_catalog.gen_random_uuid();
begin
  if v_user_id is null then
    raise exception 'not authenticated' using errcode = '42501';
  end if;

  if p_expected_user_id is null or p_expected_user_id is distinct from v_user_id then
    raise exception 'session user mismatch' using errcode = '42501';
  end if;

  -- Validação de envelope. A validação profunda continua no `isProgress` do
  -- cliente; aqui evitamos gravar um documento que quebraria a próxima leitura.
  if p_progress is null
     or pg_catalog.jsonb_typeof(p_progress) is distinct from 'object'
     or pg_catalog.jsonb_typeof(p_progress -> 'v') is distinct from 'number'
     or p_progress ->> 'v' is distinct from '1'
     or pg_catalog.jsonb_typeof(p_progress -> 'lessons') is distinct from 'object'
     or pg_catalog.jsonb_typeof(p_progress -> 'cards') is distinct from 'object'
     or pg_catalog.jsonb_typeof(p_progress -> 'history') is distinct from 'array'
     or pg_catalog.jsonb_typeof(p_progress -> 'streak') is distinct from 'number'
     or pg_catalog.jsonb_typeof(p_progress -> 'dailyGoal') is distinct from 'number'
     or pg_catalog.jsonb_typeof(p_progress -> 'lastActive') is distinct from 'string'
  then
    raise exception 'invalid progress payload' using errcode = '22023';
  end if;

  -- Primeira gravação: token nulo. O INSERT é atômico; se outra sessão
  -- inserir primeiro, o ON CONFLICT não grava e caímos no caminho de conflito.
  if p_expected_sync_id is null then
    insert into public.user_progress as up (user_id, progress, sync_id, updated_at)
    values (v_user_id, p_progress, v_new_sync_id, pg_catalog.now())
    on conflict (user_id) do nothing;

    get diagnostics v_inserted = row_count;
    if v_inserted = 1 then
      return query select true, p_progress, v_new_sync_id;
      return;
    end if;
  end if;

  -- Serializa as escritas do mesmo usuário e devolve a versão atual.
  select * into v_current
    from public.user_progress
   where user_id = v_user_id
   for update;

  if not found then
    -- Linha removida externamente: o cliente reidrata e tenta a inserção.
    return query select false, null::jsonb, null::uuid;
    return;
  end if;

  if v_current.sync_id is distinct from p_expected_sync_id then
    return query select false, v_current.progress, v_current.sync_id;
    return;
  end if;

  update public.user_progress as up
     set progress = p_progress,
         sync_id = v_new_sync_id,
         updated_at = pg_catalog.now()
   where up.user_id = v_user_id
     and up.sync_id = p_expected_sync_id
  returning * into v_current;

  if not found then
    -- Defensivo; com FOR UPDATE não deve ocorrer.
    select * into v_current
      from public.user_progress
     where user_id = v_user_id;

    if not found then
      return query select false, null::jsonb, null::uuid;
    end if;

    return query select false, v_current.progress, v_current.sync_id;
    return;
  end if;

  return query select true, v_current.progress, v_current.sync_id;
end;
$$;

revoke all on function public.save_user_progress(uuid, uuid, jsonb) from public, anon;
grant execute on function public.save_user_progress(uuid, uuid, jsonb) to authenticated;

comment on function public.save_user_progress(uuid, uuid, jsonb)
  is 'CAS save for the authenticated user Progress v1 snapshot; returns the winning snapshot on conflict';
