#!/usr/bin/env bash
set -euo pipefail

# create-github-app-manifest.sh
# Generates a GitHub App manifest URL you can visit to create the App via GitHub's manifest flow.

NAME="A.D.E. Automation"
URL="https://github.com/johnnywhitemike/A.D.E." # informational
HOOK_URL="https://example.com/ade-webhook"   # optional; you can change this after creating the App
REDIRECT_URL="https://example.com/ade-app-callback" # user will be redirected here with a code; copy it
PUBLIC=false

read -r -d '' MANIFEST_JSON <<EOF || true
{
  "name": "${NAME}",
  "url": "${URL}",
  "hook_attributes": { "url": "${HOOK_URL}" },
  "redirect_url": "${REDIRECT_URL}",
  "public": ${PUBLIC},
  "default_permissions": {
    "issues": "write",
    "actions": "write",
    "contents": "read",
    "metadata": "read"
  }
}
EOF

ENC=$(printf "%s" "$MANIFEST_JSON" | python3 -c 'import sys, json, urllib.parse; print(urllib.parse.quote(json.dumps(json.load(sys.stdin))))')

URL="https://github.com/settings/apps/new?manifest=${ENC}"

cat <<MSG
Visit the following URL to create the GitHub App via manifest flow (opens GitHub UI):

${URL}

When the creation completes you'll be redirected to the redirect URL with a `code` query parameter.
Copy that `code` value and run:

  ./scripts/complete-github-app-from-code.sh <code>

That script will exchange the code for the created app details (app_id, slug, client_id, private_key pem).
After you obtain the App private key and installation ID, store them securely and add to A.D.E. runtime as environment variables or repository secrets:

  GITHUB_APP_ID
  GITHUB_APP_INSTALLATION_ID
  GITHUB_APP_PRIVATE_KEY (PEM contents)

MSG
