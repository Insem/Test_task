#!/bin/bash

docker compose -f ./docker-compose.yml  up -d rabbit db router
docker compose -f ./docker-compose.yml  up -d --no-start --scale task=$REPLICA_COUNT task

for (( c=1; c<=$REPLICA_COUNT; c++ ))
do  
    sleep 5
    docker  start test_task-task-"$c"
done