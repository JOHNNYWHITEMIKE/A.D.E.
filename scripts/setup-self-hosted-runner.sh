#!/usr/bin/env bash
set -euo pipefail

# setup-self-hosted-runner.sh
# Registers and runs a self-hosted GitHub Actions runner for the configured repo.
# Usage:
#   export GH_TOKEN="<token-with-repo-admin-scopes>" && ./scripts/setup-self-hosted-runner.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OWNER="${GITHUB_OWNER:-johnnywhitemike}"
REPO="${GITHUB_REPO:-silver-pay}"
RUNNER_NAME="ade-self-hosted-$(hostname)-$(date +%s)"
RUNNER_LABELS="ade,self-hosted"
IMAGE="ghcr.io/myoung34/github-runner:latest"

if [ -z "${GH_TOKEN:-}" ]; then
  echo "Error: GH_TOKEN must be set in the environment to register the runner" >&2
  exit 1
fi

echo "Requesting registration token for ${OWNER}/${REPO}..."
REG_JSON=$(curl -s -X POST -H "Authorization: token $GH_TOKEN" -H "Accept: application/vnd.github.v3+json" "https://api.github.com/repos/${OWNER}/${REPO}/actions/runners/registration-token")
RUNNER_TOKEN=$(printf "%s" "$REG_JSON" | jq -r .token)
if [ -z "$RUNNER_TOKEN" ] || [ "$RUNNER_TOKEN" = "null" ]; then
  echo "Failed to obtain registration token: $REG_JSON" >&2
  exit 1
fi

echo "Starting runner container (image: $IMAGE) ..."
docker run -d --name ade-self-hosted-runner \
  -e RUNNER_NAME="$RUNNER_NAME" \
  -e RUNNER_TOKEN="$RUNNER_TOKEN" \
  -e RUNNER_REPO="${OWNER}/${REPO}" \
  -e RUNNER_LABELS="$RUNNER_LABELS" \
  -e RUNNER_WORKDIR="/tmp/runner" \
  --restart unless-stopped \
  $IMAGE

echo "Runner container started. Use 'docker logs -f ade-self-hosted-runner' to watch registration and run logs."
echo "To remove the runner container and unregister, run: ./scripts/remove-self-hosted-runner.sh"
