Title: GitHub authentication model for A.D.E. (PAT vs GitHub App)
Status: Accepted
Date: 2025-12-16
Owner: A.D.E. System

Decision
--------
We will prefer using a **GitHub App** (installation tokens) for any automated interactions with GitHub (repository_dispatch, issue creation, Actions access) instead of long-lived personal access tokens (PATs).

Rationale
---------
- Installation tokens are short-lived and scoped per installation, improving security.
- GitHub Apps support fine-grained permissions and auditability.
- We already added App-support code (`githubApp.js`) and it is low friction to adopt.

Consequences
------------
- Requires creating a GitHub App, storing the private key securely, and noting the installation ID.
- Systems that were using PATs temporarily must rotate/revoke PATs after migration.

Next steps
----------
1. Create a GitHub App with minimal repository permissions (Issues: Read & Write; Actions: Read & Write if needed).
2. Install app on target repos and export `GITHUB_APP_ID`, `GITHUB_APP_INSTALLATION_ID`, and `GITHUB_APP_PRIVATE_KEY` into A.D.E. runtime or a secret store.
3. Revoke or rotate previously used PATs and update docs (`SECRETS.md`).
