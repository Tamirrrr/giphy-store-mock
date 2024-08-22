#!/bin/sh

MYSQL_HOST=${MYSQL_HOST:-mysql}
MYSQL_PORT=${MYSQL_PORT:-3306}
MYSQL_USER=${MYSQL_USER:-root}
MYSQL_PASSWORD=${MYSQL_PASSWORD:-rootpassword}
MIGRATIONS_DIR="./migrations"

until mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SHOW DATABASES;" > /dev/null 2>&1; do
  echo "Waiting for MySQL..."
  sleep 3
done

for file in $MIGRATIONS_DIR/*.sql; do
    if [ -f "$file" ]; then
        echo "Applying migration $file..."
        mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" < "$file"
        if [ $? -eq 0 ]; then
            echo "Migration $file applied successfully."
        else
            echo "Failed to apply migration $file."
            exit 1
        fi
    else
        echo "No SQL files found in $MIGRATIONS_DIR."
    fi
done

echo "All migrations applied successfully."