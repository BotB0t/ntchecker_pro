#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
SELECT 'CREATE USER ntchecker WITH PASSWORD ''ntchecker'''
WHERE NOT EXISTS (SELECT FROM   pg_catalog.pg_roles WHERE  rolname = 'ntchecker')\gexec

GRANT ALL PRIVILEGES ON DATABASE ntchecker TO ntchecker;
EOSQL
