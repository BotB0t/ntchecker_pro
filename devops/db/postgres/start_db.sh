#!/usr/bin/env bash

if [ "$1" ]; then
    VIRTUALENV_PATH=${1}
    source ${VIRTUALENV_PATH}/bin/activate
fi

FILE_DIR="$(dirname $0)"
echo $FILE_DIR
cd $FILE_DIR
export DJANGO_READ_DOT_ENV_FILE=True

docker-compose up -d
# Wait 5 secs for the DB to startup, and execute DB scripts
sleep 5
docker exec ntchecker-postgresql /tmp/create-ntchecker-db.sh
docker exec ntchecker-postgresql /tmp/create-ntchecker-user.sh
python3 ../../../manage.py migrate
