#!/bin/bash
args=("$@")
DEV=true docker compose -f docker-compose.yml -f docker-compose.prod.yml build ${args[0]};