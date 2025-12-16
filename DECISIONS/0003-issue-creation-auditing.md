Title: Issue creation policy — repository_dispatch + self-hosted execution
Status: Accepted
Date: 2025-12-16
Owner: A.D.E. System

Decision
--------
A.D.E. will prefer emitting `repository_dispatch` events to the target repository and rely on a workflow (running on a self-hosted runner) to create issues, rather than having agents call the Issues API directly.

Rationale
---------
- Ensures issue creation is auditable and recorded in GitHub Actions logs.
- Allows adding pre-conditions, validation, or enrichment before creating issues.
- Reduces direct exposure of issue-creation privileges to agent runtime.

Consequences
------------
- Requires a functioning Actions runner and workflow; we added fallback direct creation for resilience.

Next steps
----------
1. Harden the repository_dispatch workflow to include retries and clear observability on failure.
2. Add fallback notifications/alerts if dispatch or workflow fails (create issues automatically or send an alert to Slack/email).
