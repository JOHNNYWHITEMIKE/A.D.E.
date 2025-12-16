## Secrets & tokens (A.D.E.) 🔐

This project may optionally use a GitHub personal access token to let A.D.E. create issues automatically when agents complete checklist phases.

Important security notes:
- Never commit secrets to the repository. Use a local `.env` file or environment variables on the host. Add `.env` to `.gitignore`.
- Rotate tokens immediately if they are ever shared insecurely. Use a minimal-scope token (repo:issues or fine-grained token where possible).

How to enable GitHub issue creation:
1. Copy `.env.example` to `.env` in the `AAA/ADE_TEMPLATE` folder.
2. Fill in `GH_TOKEN` with your PAT; optionally set `GITHUB_OWNER` and `GITHUB_REPO`.
3. Restart A.D.E. containers (see `scripts/restart-ade.sh` for a helper).

Alternative (recommended): export `GH_TOKEN` in your shell only for the session:

```bash
export GH_TOKEN="<your-token-here>"
docker compose -f docker-compose.yml down && docker compose -f docker-compose.yml up -d --build
```

If you shared the token in an insecure channel (e.g. chat), rotate it immediately and create a new token.

Repository dispatch vs direct issue creation
-----------------------------------------

By default, A.D.E. now prefers to trigger a `repository_dispatch` event on the target repo. This has two benefits:

- The actual issue creation runs on GitHub Actions (auditable, runs on GitHub infra).
- You can add more automation/validation in the workflow that creates the issue.

Control behavior with the `USE_REPO_DISPATCH` env var (defaults to `true`). Set it to `false` to revert to direct API issue creation.

Long-term recommendation: register a GitHub App with fine-grained permissions and update A.D.E. to use installation tokens (we can add this flow next). For now, `GH_TOKEN` + repo dispatch gives a secure, auditable path.

GitHub App setup (optional, recommended):

1. Create a GitHub App in your account settings (Settings → Developer settings → GitHub Apps).
2. Give the App `Repository permissions: Issues - Read & Write` and `Actions - Read & Write` as needed.
3. Generate and download the App private key (PEM).
4. Install the App on the `GITHUB_OWNER/GITHUB_REPO` repository and note the Installation ID.
5. Export the following as environment variables in your A.D.E. runtime (or add them to a local `.env`):

```
GITHUB_APP_ID=<app-id>
GITHUB_APP_INSTALLATION_ID=<installation-id>
GITHUB_APP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

With these set, A.D.E. will automatically use installation tokens (short-lived, scoped) for dispatch and issue creation.

Automating App creation (helper)
--------------------------------

To simplify creating the GitHub App, there are two helper scripts:

1. `./scripts/create-github-app-manifest.sh` — prints a manifest URL you can visit to create the App via GitHub's manifest flow. After you accept the manifest on GitHub you'll be redirected to the `redirect_url` with a `code` parameter.

2. `./scripts/complete-github-app-from-code.sh <code>` — exchanges the `code` for the created App metadata (including `app_id` and `pem` if available). **Do not** paste the PEM into chat; store it securely (Vault or repo secret) and then set environment variables in A.D.E. runtime.

Example flow:

```bash
./scripts/create-github-app-manifest.sh
# visit the returned URL, create the App, and note the `code` in the redirect URL
export GH_TOKEN="<your-bootstrap-token>"
./scripts/complete-github-app-from-code.sh <code>
```


Self-hosted runner (quick start)
--------------------------------

To bring up a self-hosted runner (Docker-based) for the `GITHUB_OWNER/GITHUB_REPO` repo, run:

```bash
export GH_TOKEN="<your-token-with-repo-admin-scopes>"
export GITHUB_OWNER="johnnywhitemike"
export GITHUB_REPO="silver-pay"
./scripts/setup-self-hosted-runner.sh
```

This script will request a registration token from GitHub, start a Docker container running a popular runner image, and wait for the runner to appear in the repository settings. To stop and remove the runner container, run:

```bash
./scripts/remove-self-hosted-runner.sh
```

Notes:
- The runner will show up in repository settings under **Settings → Actions → Runners** once registered.
- Runner labels can be added via the GitHub REST API or during configuration; the helper script adds the `ade` label when feasible.
- For production, consider installing a systemd service or orchestrating with Docker Compose and a token refresh mechanism (registration tokens expire shortly after issuance).

Systemd & persistence (optional)
--------------------------------

For a simple on-host persistence strategy, you can install the provided systemd unit and timer which call the `ensure-runner.sh` helper to keep the runner alive:

1. Copy the helper into a location on the host where it can execute (by default it refers to the repository scripts):

```bash
# from the repository root
sudo cp AAA/ADE_TEMPLATE/scripts/ensure-runner.sh /usr/local/bin/ensure-runner.sh
sudo chmod +x /usr/local/bin/ensure-runner.sh

sudo cp AAA/ADE_TEMPLATE/systemd/ade-self-hosted-runner.service /etc/systemd/system/ade-self-hosted-runner.service
sudo cp AAA/ADE_TEMPLATE/systemd/ade-self-hosted-runner.timer /etc/systemd/system/ade-self-hosted-runner.timer

sudo systemctl daemon-reload
sudo systemctl enable --now ade-self-hosted-runner.timer
```

2. The timer runs `ensure-runner.sh` at boot and every 10 minutes; the helper will call the `setup-self-hosted-runner.sh` script if the container is not running.

Security note: `setup-self-hosted-runner.sh` still requires `GH_TOKEN` in the environment to register the runner; restrict who can read this token on the host. For higher assurance, consider using a machine user with limited scopes or GitHub App flows.
