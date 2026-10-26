# NEXORA zero-budget cloud architecture (draft, 2026-10-26)

## Separation of concerns
- Cloudflare Workers + D1: small API, scheduled orchestration, durable state. Free Workers CPU limit is 10ms per invocation; do not run ML inference or FFmpeg inside Workers.
- Existing Higgsfield website: user-facing dashboard and memory; confirmed deployed. Higgsfield sandbox: ephemeral development/smoke tests only, NOT an always-on scheduler or guaranteed free render farm.
- Public GitHub repo: non-secret, reproducible smoke-test scripts and documentation only. GitHub Actions is currently blocked by account billing; do not depend on it.
- Optional Oracle Cloud Always Free ARM VM: possible later compute host, only if user creates/approves an account and capacity is available; never assume 24/7 or zero-risk billing.
- Local GPU workstation: future migration target when funded.

## Safety and operations
- No credentials or private NEXORA source in this public repository.
- Never place exchange API keys in public repositories or browser code.
- Paper trading only; no real orders without explicit user approval.
- Queue jobs with explicit limits, retries, status, and checkpoints. Design for paused/evicted workers.
- No claim of autonomous 24/7 agents until a persistent scheduler is deployed and observed running.

## Phase gates
1. Verify deployed dashboard and memory schema [verified].
2. Validate FFmpeg H.264/AAC synthetic smoke test in isolated sandbox [verified, 3 seconds].
3. Prototype lightweight scheduling and durable task queue, then deploy only with account access and user approval for any cost.
4. Connect existing agents through narrowly scoped endpoints, test error handling and security.
5. Add render queue and external worker; prove actual 12-second source-to-output workflow including effects.
6. Add metrics and quota alerts; keep hard stop at free limits.

## Cloud limitations to monitor
- Cloudflare Workers Free: 100,000 requests/day, 10 ms CPU/invocation, 128 MB isolate memory, 5 Cron Triggers/account (as of 2026-10-26).
- Oracle Always Free compute: region/capacity constraints, account verification, idle reclamation.
- Higgsfield: sandbox lifetime/credit/resource limits not guaranteed for persistent work.
