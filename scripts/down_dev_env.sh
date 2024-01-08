#!/usr/bin/env bash
echo 'trying to down dev environment'
docker compose --env-file=../.env -p dev -f ../infrastructure/docker/docker-compose-env.yml down -v
echo 'dev environment is downed'
