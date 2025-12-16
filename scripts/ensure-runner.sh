#!/usr/bin/env bash
set -euo pipefail

# ensure-runner.sh — ensure the Docker-based self-hosted runner is running
# If container missing or stopped, re-run setup script to (re)create it.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CONTAINER_NAME="ade-self-hosted-runner"

if docker ps --filter "name=$CONTAINER_NAME" --filter "status=running" --format '{{.Names}}' | grep -q "$CONTAINER_NAME"; then
  echo "Runner container '$CONTAINER_NAME' is running."
  exit 0
fi

echo "Runner container '$CONTAINER_NAME' not running. Attempting to start via setup script..."
if [ -x "$ROOT_DIR/scripts/setup-self-hosted-runner.sh" ]; then
  (cd "$ROOT_DIR" && ./scripts/setup-self-hosted-runner.sh)
else
  echo "Error: setup script not found or not executable: $ROOT_DIR/scripts/setup-self-hosted-runner.sh" >&2
  exit 2
fi

echo "ensure-runner: done."
