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
