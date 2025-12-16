#!/usr/bin/env bash
set -euo pipefail

# restart-ade.sh — restart A.D.E. containers when GH_TOKEN (or other env vars) are set
# Usage:
#   export GH_TOKEN="<your_token>" && ./scripts/restart-ade.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/docker-compose.yml"

if [ -z "${GH_TOKEN:-}" ]; then
  echo "Error: GH_TOKEN is not set. Export GH_TOKEN before running this script." >&2
  exit 1
fi

echo "Restarting A.D.E. with GH_TOKEN present (token is not printed)"
docker compose -f "$COMPOSE_FILE" down
docker compose -f "$COMPOSE_FILE" up -d --build
echo "A.D.E. restarted — watch logs with: docker compose -f $COMPOSE_FILE logs -f"
