#!/bin/sh

knex migrate:latest --env production  && npm run start;