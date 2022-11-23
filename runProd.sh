#!/bin/bash

DEV=false docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d