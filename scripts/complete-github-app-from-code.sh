#!/usr/bin/env bash
set -euo pipefail

# complete-github-app-from-code.sh <code>
# Exchanges the 'code' from the manifest flow to get the created App details.
# Requires a GH token with sufficient access (the account that created the manifest will be the owner).

if [ "${1:-}" = "" ]; then
  echo "Usage: $0 <code>" >&2
  exit 2
fi
CODE="$1"

if [ -z "${GH_TOKEN:-}" ]; then
  echo "Error: GH_TOKEN must be set in environment to call the manifest conversion API." >&2
  exit 2
fi

URL="https://api.github.com/app-manifests/${CODE}/conversions"
echo "Calling GitHub to convert manifest code..."
curl -s -X POST -H "Authorization: token $GH_TOKEN" -H "Accept: application/vnd.github.v3+json" "$URL" | jq -r '. | {id: .id, slug: .slug, app_id: .app_id, client_id:.client_id, pem: (.pem!=null), pem_sample: .pem? | if . then .[0:30]+"..." else null end }'

echo
echo "If the response includes a 'pem' field, copy the PEM from the response and save it securely (PEM contains the private key)."
echo "Recommended: create repository or host secret named GITHUB_APP_PRIVATE_KEY (store the PEM contents). Also set GITHUB_APP_ID and GITHUB_APP_INSTALLATION_ID as env or secrets."
