Title: Repo privacy & access policy for `silver-pay`
Status: Accepted
Date: 2025-12-16
Owner: A.D.E. System

Decision
--------
`silver-pay` will remain a **private** repository. Access will be granted on a need-to-know basis and protected by branch protections and code owners as appropriate.

Rationale
---------
- The repo contains sensitive material (KYC, integrations, provider keys, vendor outreach records) and should not be publicly viewable.

Consequences
------------
- Access management is required; ensure collaborators have the minimum permissions required.

Next steps
----------
1. Enable branch protection rules on `main` (require PR reviews, status checks).
2. Add `CODEOWNERS` and limit who can merge into protected branches.
3. Review repository collaborators and org membership. Consider SSO enforcement for orgs.
