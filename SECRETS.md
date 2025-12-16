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
