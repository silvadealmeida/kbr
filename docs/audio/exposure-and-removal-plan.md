# Exposição do áudio restrito e plano de remoção — Fase 8F

> **Plano histórico, superado pela decisão da Fase 14.** O responsável aceitou a distribuição do
> corpus com os créditos publicados. O estado atual é **resolvido com créditos**, com 7.790 MP3
> servidos por padrão; `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` é apenas kill switch. As verificações e
> opções de remoção abaixo não são ações ou bloqueios atuais. A produção foi aceita pelo
> responsável; este documento não a revalida nem exige nova validação.

**Verificado em 2026-11-12** (somente leitura: `curl -I`, `git ls-remote`, API pública do GitHub e `gh api` autenticado como o dono). Nada foi enviado, apagado, reescrito ou alterado na Vercel/GitHub nesta fase.

> **Decisão posterior (2026-11-12):** o dono do projeto optou por **manter o corpus público e usá-lo no app**. A contenção foi revertida, os MP3 voltaram para `public/audio/v1/` e a licença não esclarecida foi registrada como risco aceito em `license-audit.md` §11. Este documento permanece como registro histórico do plano de remoção.

## 1. Estado real (corrige o §9 da 8E)

A 8E assumia que o deploy novo ainda não tinha acontecido. **Já aconteceu**: `origin/main` = `daf4f12` (= HEAD local, 0 commits de divergência; `git ls-remote` confirma), a Vercel marcou o commit como `success` e a produção já não serve os MP3.

| Superfície | Evidência | Estado |
|---|---|---|
| Produção `kbr-amber.vercel.app` | `/audio/hangul/v1/ko-cdd08b15.mp3` e `ko-2620702c.mp3` → **HTTP 404** (`x-matched-path: /404`); `/restricted-assets/...` → 404 | **contido** neste domínio |
| Cópias já baixadas | MP3 serviam `cache-control: public, max-age=31536000, immutable` desde `f0b2f43` (12:06 UTC) até o deploy de `daf4f12` (~13:01 UTC) | navegadores/CDN de terceiros podem manter cópias; **irreversível** |
| Deployments anteriores (ex.: `f0b2f43`, status Vercel `wjKiv9SJ…`) | URLs únicas `kbr-<hash>-…vercel.app` **não são descobríveis sem a Vercel**; os aliases `kbr-silvadealmeidas-projects` e `kbr-git-main-…` redirecionam para SSO (302) | **não verificado**; ver §4 |
| GitHub, `main`, caminho antigo | `raw.githubusercontent.com/.../main/public/audio/...` → 404 | removido do HEAD |
| GitHub, `main`, **caminho novo** | `.../main/restricted-assets/audio/hangul/v1/ko-cdd08b15.mp3` → **HTTP 200**, 3989 B | **exposto**: mover para fora de `public/` só mudou o caminho |
| GitHub, histórico | `.../f0b2f43/public/audio/...` → 200; 287 blobs únicos, em 574 caminhos (`public/audio` e `restricted-assets/audio`) | **exposto** |
| Rede do repositório | repositório **público**, `forks: 0`, `stars: 1`, `webhooks: 0` (`gh api`, 2026-11-12) | um stargazer pode ter clonado; fork zero |

**Resposta direta:** o push da 8E já republicou os MP3 em `restricted-assets/audio/`. A contenção protege o **site**, não o **repositório**.

Commits que contêm MP3: `f0b2f43` (adição, `public/audio`, 12:06 UTC) e `a8a7fb0` (renomeação para `restricted-assets/audio`); todos os commits posteriores os herdam. Nenhuma outra branch/tag remota (`backup-kbr-local` é só local e não os contém).

## 2. Plano reversível para o HEAD (recomendado; precisa de aprovação)

Objetivo: parar de distribuir no HEAD público **mantendo** o corpus, o manifesto e os scripts localmente e em backup privado. Nada reescreve história.

1. **Backup privado (fora do repositório e fora de qualquer pasta sincronizada publicamente):**
   ```bash
   cd /root/estudos/kbr
   tar -czf ~/kbr-audio-backup-$(date +%F).tgz restricted-assets/audio src/content/audio/manifest.json
   sha256sum ~/kbr-audio-backup-*.tgz > ~/kbr-audio-backup-$(date +%F).tgz.sha256
   git bundle create ~/kbr-full-$(date +%F).bundle --all   # inclui a história inteira (backup do que existe hoje)
   # copiar para um segundo local privado (disco externo/armazenamento privado do dono)
   tar -tzf ~/kbr-audio-backup-*.tgz | grep -c '\.mp3$'   # esperado: 287
   ```
   O manifesto já guarda o SHA-256 de cada MP3 (`src/content/audio/manifest.json`), então a restauração é verificável (`npm test` → `audio-manifest`).
2. **Parar de rastrear (HEAD), mantendo os arquivos em disco:**
   ```bash
   git rm -r --cached restricted-assets/audio     # índice apenas; arquivos permanecem
   echo '/restricted-assets/' >> .gitignore
   ```
   `git rm -r --cached --dry-run` foi executado nesta fase (sem erro).
3. **Ajustar o que depende dos arquivos** (num clone sem eles, falham): `tests/audio-manifest.test.ts`, `tests/content/curriculum-audit.test.ts`, `tests/audio-containment.test.ts` (`SAMPLE`/"fonte permanece versionada") e `scripts/audio/stage-static-audio.mjs`. Trocar por `test.skipIf(!existsSync(...))` e atualizar a frase "permanece versionada" em `AGENTS.md`/docs. O teste anti-reintrodução adicionado na 8F (nenhum áudio versionado fora de `restricted-assets/`) passa a poder exigir **nenhum áudio versionado** quando o dono decidir.
4. **Commit pequeno + push** (só com ordem do dono). O HEAD público deixa de servir o corpus; a história continua expondo.
5. **Reverter:** `git add -f restricted-assets/audio` (ou restaurar do `tar` + `bundle`) recria o estado atual.

## 3. Limpeza de histórico (avaliada separadamente; **não executada**)

| Opção | Efeito | Custo / risco |
|---|---|---|
| A. Tornar o repositório **privado** | para a distribuição pública de HEAD **e** de histórico imediatamente; reversível (Settings → Danger Zone); não exige reescrever nada | perde visibilidade pública e o stargazer; se a Vercel usa a integração GitHub, ela continua funcionando para o dono; **a mais barata e a mais reversível** |
| B. `git filter-repo --path restricted-assets --path public/audio --invert-paths` + force-push | remove o corpus de **todos** os commits | reescreve todos os SHAs (de `f0b2f43` em diante); invalida clones, referências em docs (`f0b2f43`, `a8a7fb0`…) e o status da Vercel; exige o backup do §2.1 e acordo explícito do dono; commits antigos podem continuar acessíveis por SHA no GitHub até o GC (precisa pedir ao suporte do GitHub a remoção de visões em cache/"dangling") |
| C. Manter público | decisão aceita na Fase 14, com créditos publicados | **Estado vigente:** resolvido com créditos; ver `license-audit.md` §13 |

**Recomendação:** A agora (reversível, minutos) + passos 1–4 do §2; só considerar B se o repositório precisar voltar a ser público antes da resolução da licença. Se escolher B, trabalhar num clone espelho novo (`git clone --mirror`), validar, e só então force-push, com backup do §2.1 intacto.

Não é possível desfazer cópias que terceiros já baixaram; nenhuma das opções afirma o contrário.

## 4. Vercel — o que verificar e o que depende do dono

Sem acesso à Vercel nesta fase (`vercel` CLI ausente), então **não se afirma** que deployments antigos estão limpos.

Verificações que o agente consegue repetir de fora:
```bash
# produção (esperado: HTTP/2 404 em ambos)
for f in ko-cdd08b15 ko-2620702c; do curl -sI https://kbr-amber.vercel.app/audio/hangul/v1/$f.mp3 | head -1; done
# nenhum caminho alternativo
curl -sI https://kbr-amber.vercel.app/restricted-assets/audio/hangul/v1/ko-cdd08b15.mp3 | head -1
# deployment imutável específico (hostname vem do painel): 200 = ainda serve; 302 → vercel.com/sso-api = protegido por Vercel Authentication; 404/410 = removido
curl -sI https://<deployment-url>.vercel.app/audio/hangul/v1/ko-cdd08b15.mp3 | head -3
# integridade do artefato local antes de qualquer deploy
npm run build   # prebuild/postbuild: "[audio-guard] OK"
find .next -iname '*.mp3' | wc -l   # esperado: 0
```

**Ações que exigem o dono (conta Vercel):**
1. *Project → Deployments*: listar todos os deployments anteriores ao commit `daf4f12`/`a8a7fb0`. O de `f0b2f43` (e os que vieram depois até o deploy contido) **serviram ou ainda servem** os MP3. Para cada um: testar o `curl` acima; **excluir** (Delete) os que respondem 200. Desfazer exclusão não existe; o código continua no Git.
2. *Settings → Deployment Protection*: confirmar que *Vercel Authentication* cobre **Preview e Production-unique-URLs**. Os aliases `kbr-git-main-…` já retornam 302 para SSO — indício de proteção, não prova para todos os deployments.
3. *Settings → Environment Variables*: confirmar que `NEXT_PUBLIC_KBR_STATIC_AUDIO` **não existe** em Production/Preview/Development (é lido na compilação e embutido no cliente). Nada foi alterado.
4. *Settings → Data Cache / CDN*: depois de excluir os deployments, usar *Purge CDN cache* no projeto para derrubar entradas `immutable` dos caminhos antigos.
5. *Retention*: *Settings → Security → Deployment Retention* — definir uma política (ex.: 30 dias para deployments antigos) para que deployments futuros não persistam indefinidamente.

Limites: excluir um deployment remove o artefato servido, mas **não** cópias já baixadas, proxies ou caches de terceiros; `max-age=31536000, immutable` fez navegadores segurarem os MP3 por até 1 ano.

### Achado corrigido na 8F
`next.config.mjs` aplicava `Cache-Control: public, max-age=31536000, immutable` a `/audio/:path*` **mesmo com a flag desligada**, e a produção respondia 404 com esse cabeçalho (`x-matched-path: /404`) — um 404 cacheável por um ano em navegadores/CDN, que atrapalharia a reativação do áudio. O cabeçalho agora só é emitido com `NEXT_PUBLIC_KBR_STATIC_AUDIO=1`. **A produção só muda no próximo deploy** (decisão do dono).

## 5. Prevenção de reintrodução (já ativa)

- `.gitignore` bloqueia `/public/audio/`; MP3 só em `restricted-assets/`.
- `prebuild`/`postbuild` (`verify-no-restricted-audio.mjs`) falham o build se o corpus (por extensão, caminho **ou hash do manifesto**) aparecer em `public/`, `.next/` ou `.vercel/output`.
- `tests/audio-containment.test.ts` (inclui, desde a 8F, "nenhum arquivo de áudio versionado fora de `restricted-assets/`" via `git ls-files`).
- A guarda é desligada **apenas** por `NEXT_PUBLIC_KBR_STATIC_AUDIO=1`; não definir em deploy.
- Lacuna conhecida: nada impede o dono de definir a flag no painel da Vercel **e** de mover os arquivos; a proteção é procedimental (`AGENTS.md`, este documento).
