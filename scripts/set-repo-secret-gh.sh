#!/usr/bin/env bash
set -euo pipefail

# set-repo-secret-gh.sh <secret-name> <secret-value>
# Uses GitHub CLI (`gh`) to set a repository secret for the configured repo.
# Requires: gh authenticated and permission to write repo secrets.

if [ $# -lt 2 ]; then
  echo "Usage: $0 <secret-name> <secret-value>" >&2
  exit 2
fi

NAME="$1"
VALUE="$2"
OWNER="${GITHUB_OWNER:-johnnywhitemike}"
REPO="${GITHUB_REPO:-silver-pay}"

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: 'gh' CLI not installed. Install it or set the secret via the GitHub UI." >&2
  exit 2
fi

echo "Setting secret $NAME on $OWNER/$REPO via gh..."
echo -n "$VALUE" | gh secret set "$NAME" --repo "$OWNER/$REPO" --body -
echo "Done."
