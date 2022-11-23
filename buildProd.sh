#!/bin/bash
args=("$@")
DEV=false docker compose -f docker-compose.yml -f docker-compose.prod.yml build ${args[0]};