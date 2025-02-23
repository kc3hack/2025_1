#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

until nc -z -v -w30 mysql 3306; do
  echo "Waiting for MySQL to be ready..."
  sleep 5
done

echo "MySQL is up - executing command"
exec $cmd