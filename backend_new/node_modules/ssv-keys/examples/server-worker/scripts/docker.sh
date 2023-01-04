#!/usr/bin/env bash

export PORT=3000
export $(grep -v '^#' ../.env | xargs)

docker build -t ssv-keys-worker . || exit 1
docker run -d --name ssv-keys-worker -p $PORT:$PORT ssv-keys-worker || exit 1
