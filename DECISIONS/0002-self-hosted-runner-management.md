Title: Self-hosted runner management & persistence
Status: Accepted
Date: 2025-12-16
Owner: A.D.E. System

Decision
--------
Use a Docker-based self-hosted runner for GitHub Actions that is managed by lightweight host tooling (systemd timer + helper scripts) to ensure persistence and automatic re-registration when needed.

Rationale
---------
- Provides controlled execution environment for workflows that must run on local resources (e.g., creating issues in sensitive repos, integration tests that require local network access).
- Docker runner images are widely available and simple to manage; helper scripts allow safe re-registration when registration tokens expire.

Consequences
------------
- Requires careful secrets handling (GH_TOKEN or App creds) on the host.
- Requires monitoring and automated restarts to ensure high availability.

Next steps
----------
1. Use the provided `scripts/setup-self-hosted-runner.sh` and `scripts/ensure-runner.sh` on the host.
2. Install the systemd unit & timer (documented in `SECRETS.md`).
3. Add monitoring & alerting (smoke test alerts) and consider migrating to a managed worker or Kubernetes for scale/availability.
