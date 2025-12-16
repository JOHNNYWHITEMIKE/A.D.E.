Title: Secrets & token management
Status: Accepted
Date: 2025-12-16
Owner: A.D.E. System

Decision
--------
Secrets (GH tokens, GitHub App private keys, provider API keys) MUST NOT be stored in the repository. Use host environment variables, GitHub Secrets, or an external secret manager (e.g., HashiCorp Vault) for long-term storage and rotation.

Rationale
---------
- Prevents accidental disclosure and reduces blast radius when a secret is leaked.
- Enables rotation and audit trails; external managers often provide access controls and auditing.

Consequences
------------
- Implementation work to integrate with Vault or managed secret stores will be required for production.

Next steps
----------
1. Rotate the PAT used to bootstrap the system (immediately).
2. Integrate with GitHub Secrets for Actions and a secret manager (Vault/KMS) for host-runner secrets.
