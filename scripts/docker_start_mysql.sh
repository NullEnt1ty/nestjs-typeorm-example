#!/usr/bin/env bash

# common setup

set -e

DIRNAME=$( cd "$( dirname "$0" )" && pwd )
ROOT_DIR="$DIRNAME/.."
SCRIPTS_DIR="$ROOT_DIR/scripts"

# script specific sources, variables and function definitions

DOCKER_IMAGE_NAME="mariadb"
DOCKER_CONTAINER_NAME="nest-mysql"

MYSQL_ROOT_PASSWORD="root"
MYSQL_DATABASE_NAME="nestjs_typeorm_example"
MYSQL_DATABASE_USERNAME="nestjs_admin"
MYSQL_DATABASE_PASSWORD="nestjs_admin"

# execution

# Check if the container already exist
echo "Searching for an existing container with name '$DOCKER_CONTAINER_NAME'..."

FOUND_CONTAINER_ID=$( docker ps -aqf name="$DOCKER_CONTAINER_NAME" )

if [[ "$FOUND_CONTAINER_ID" != "" ]]
then
  echo "Found an existing container with id '$FOUND_CONTAINER_ID'!"

  CONTAINER_IS_RUNNING=$(docker inspect -f "{{.State.Running}}" "$FOUND_CONTAINER_ID" )

  if [[ "$CONTAINER_IS_RUNNING" = "true" ]]
  then
    echo "Container $FOUND_CONTAINER_ID is already running!"

    exit 0;
  fi

  echo "Container $FOUND_CONTAINER_ID is stopped. Starting container..."
  docker start "$FOUND_CONTAINER_ID"

  exit 0;
fi

echo "No container with name '$DOCKER_CONTAINER_NAME' was found. Creating container..."

docker run --name "$DOCKER_CONTAINER_NAME" \
  --env MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD" \
  --env MYSQL_DATABASE="$MYSQL_DATABASE_NAME" \
  --env MYSQL_USER="$MYSQL_DATABASE_USERNAME" \
  --env MYSQL_PASSWORD="$MYSQL_DATABASE_PASSWORD" \
  --publish 127.0.0.1:3306:3306 \
  --detach \
  "$DOCKER_IMAGE_NAME"
