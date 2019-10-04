#!/usr/bin/env bash

# common setup

set -e

DIRNAME=$( cd "$( dirname "$0" )" && pwd )
ROOT_DIR="$DIRNAME/.."
SCRIPTS_DIR="$ROOT_DIR/scripts"

# script specific sources, variables and function definitions

DOCKER_CONTAINER_NAME="nest-mysql"

# execution

docker stop "$DOCKER_CONTAINER_NAME"
docker rm "$DOCKER_CONTAINER_NAME"
