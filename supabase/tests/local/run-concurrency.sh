#!/usr/bin/env bash
# Teste de concorrência real do RPC CAS com duas conexões PostgreSQL.
# Requer um banco de teste já migrado (use run-local-sql-tests.sh).
set -euo pipefail

DB="${1:-${KBR_SQL_TEST_DB:-kbr_sync_test}}"
PSQL="${PSQL:-psql}"
USER_ID="33333333-3333-4333-8333-333333333333"
TOKEN="44444444-4444-4444-8444-444444444444"

case "$DB" in
  *_test) ;;
  *)
    echo "Recusando: o banco '$DB' não termina em _test." >&2
    exit 1
    ;;
esac

tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

doc() {
  printf '{"v":1,"lessons":{"%s":{"done":true,"score":100}},"cards":{},"history":[],"streak":0,"dailyGoal":10,"lastActive":"2026-11-10T12:00:00.000Z"}' "$1"
}

run_session() {
  local name="$1"
  local token="$2"
  local lesson="$3"
  local sleep_seconds="$4"
  local sql="$tmpdir/$name.sql"

  {
    echo "begin;"
    echo "set local role authenticated;"
    echo "set local request.jwt.claim.sub = '$USER_ID';"
    echo "select applied from public.save_user_progress("
    echo "  '$USER_ID',"
    if [ "$token" = "null" ]; then
      echo "  null,"
    else
      echo "  '$token'::uuid,"
    fi
    echo "  '$(doc "$lesson")'::jsonb"
    echo ");"
    if [ "$sleep_seconds" != "0" ]; then
      echo "select pg_sleep($sleep_seconds);"
    fi
    echo "commit;"
  } > "$sql"

  "$PSQL" -At -v ON_ERROR_STOP=1 -d "$DB" -f "$sql" > "$tmpdir/$name.out"
}

applied_of() {
  grep -E '^[tf]$' "$1" | head -n 1
}

assert_pair() {
  local label="$1"
  local first="$2"
  local second="$3"
  local first_value second_value

  first_value="$(applied_of "$first")"
  second_value="$(applied_of "$second")"

  if [ "$first_value" = "t" ] && [ "$second_value" = "f" ]; then
    echo "ok - $label: primeira escrita venceu, segunda recebeu conflito"
    return 0
  fi
  if [ "$first_value" = "f" ] && [ "$second_value" = "t" ]; then
    echo "ok - $label: segunda escrita venceu, primeira recebeu conflito"
    return 0
  fi

  echo "not ok - $label (primeira=$first_value, segunda=$second_value)" >&2
  cat "$first" >&2
  cat "$second" >&2
  return 1
}

seed_row() {
  "$PSQL" -v ON_ERROR_STOP=1 -d "$DB" >/dev/null <<SQL
insert into auth.users (id, email)
values ('$USER_ID', 'concurrency@example.com')
on conflict (id) do nothing;

delete from public.user_progress where user_id = '$USER_ID';

insert into public.user_progress (user_id, progress, sync_id, updated_at)
values ('$USER_ID', '$(doc seed)'::jsonb, '$TOKEN', now());
SQL
}

echo "1..3"

# Cenário 1: duas sessões leem o mesmo token e tentam gravar ao mesmo tempo.
seed_row
run_session "a1" "$TOKEN" "race-a" "1.5" &
session_a_pid=$!
sleep 0.3
run_session "b1" "$TOKEN" "race-b" "0"
wait "$session_a_pid"
assert_pair "token compartilhado" "$tmpdir/a1.out" "$tmpdir/b1.out"

# Cenário 2: duas sessões tentam a primeira inserção (token nulo) ao mesmo tempo.
"$PSQL" -v ON_ERROR_STOP=1 -d "$DB" -c "delete from public.user_progress where user_id = '$USER_ID';" >/dev/null
run_session "a2" "null" "first-a" "1.5" &
session_a_pid=$!
sleep 0.3
run_session "b2" "null" "first-b" "0"
wait "$session_a_pid"
assert_pair "primeira inserção concorrente" "$tmpdir/a2.out" "$tmpdir/b2.out"

"$PSQL" -At -v ON_ERROR_STOP=1 -d "$DB" -c "
  select count(*)
    from public.user_progress,
         jsonb_object_keys(progress -> 'lessons') as lesson
   where user_id = '$USER_ID'
     and lesson in ('first-a', 'first-b');
" | grep -qx '1'
echo "ok - apenas uma das primeiras escritas ficou no documento final"
