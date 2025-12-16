#!/usr/bin/env bash
set -euo pipefail

# remove-self-hosted-runner.sh
# Stops and removes the runner container and attempts to remove the runner registration token on GitHub
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OWNER="${GITHUB_OWNER:-johnnywhitemike}"
REPO="${GITHUB_REPO:-silver-pay}"
CONTAINER_NAME="ade-self-hosted-runner"

echo "Stopping container $CONTAINER_NAME if present..."
docker rm -f "$CONTAINER_NAME" || true

echo "NOTE: The GitHub Actions registration token expires automatically; no further cleanup is required on GitHub.
If you need to remove a runner from the repo settings UI, visit https://github.com/${OWNER}/${REPO}/settings/actions/runners"
