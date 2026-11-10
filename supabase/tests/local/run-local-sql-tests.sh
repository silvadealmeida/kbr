#!/usr/bin/env bash
# Executa as migrações e os testes SQL/pgTAP num PostgreSQL local, sem
# Supabase CLI. Requer um superusuário PostgreSQL (o script cria/derruba um
# banco de teste descartável).
#
# Uso:
#   PGUSER=postgres ./supabase/tests/local/run-local-sql-tests.sh
#   KBR_SQL_TEST_DB=meu_teste ./supabase/tests/local/run-local-sql-tests.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
DB="${KBR_SQL_TEST_DB:-kbr_sync_test}"
MAINTENANCE_DB="${PG_MAINTENANCE_DB:-postgres}"
PSQL="${PSQL:-psql}"

case "$DB" in
  *_test) ;;
  *)
    echo "Recusando: KBR_SQL_TEST_DB='$DB' não termina em _test." >&2
    exit 1
    ;;
esac

echo "[sql] recriando banco de teste $DB"
"$PSQL" -v ON_ERROR_STOP=1 -d "$MAINTENANCE_DB" \
  -c "drop database if exists \"$DB\" with (force);" \
  -c "create database \"$DB\";"

echo "[sql] aplicando bootstrap mínimo (roles, auth.uid, pgTAP)"
"$PSQL" -v ON_ERROR_STOP=1 -d "$DB" -f "$SCRIPT_DIR/bootstrap.sql"

echo "[sql] aplicando migrações"
for migration in "$ROOT"/supabase/migrations/*.sql; do
  echo "  - $(basename "$migration")"
  "$PSQL" -v ON_ERROR_STOP=1 -d "$DB" -f "$migration"
done

echo "[sql] rodando pgTAP"
pg_prove --dbname "$DB" \
  "$ROOT/supabase/tests/user_progress_rls.test.sql" \
  "$ROOT/supabase/tests/save_user_progress_rpc.test.sql"

echo "[sql] rodando concorrência real com duas conexões"
bash "$SCRIPT_DIR/run-concurrency.sh" "$DB"

echo "[sql] ok"
