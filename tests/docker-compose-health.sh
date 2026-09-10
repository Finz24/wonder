#!/usr/bin/env bash
set -Eeuo pipefail

export COMPOSE_PROJECT_NAME="wonder-health-test"
export WONDER_PORT="3101"

cleanup() {
  docker compose down --volumes --remove-orphans || true
}
trap cleanup EXIT

docker compose up --build --wait --wait-timeout 180

container_id="$(docker compose ps --quiet wonder)"
health_status="$(docker inspect --format='{{.State.Health.Status}}' "$container_id")"

if [[ "$health_status" != "healthy" ]]; then
  echo "Expected the Wonder container to be healthy, got: $health_status" >&2
  exit 1
fi

node -e '
const response = await fetch("http://127.0.0.1:3101/api/health");
const body = await response.json();
if (!response.ok || body.status !== "ok") {
  throw new Error(`Unexpected health response: ${response.status} ${JSON.stringify(body)}`);
}
'
