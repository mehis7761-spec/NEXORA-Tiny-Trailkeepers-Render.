# NEXORA Cloudflare control: phase 0

A public, credential-free **health-only** Worker. It has no agent commands, no data access, no trading, no secrets, no cron and no Cloudflare D1 binding. This is intentionally safe to publish publicly.

## Local verification (no GitHub Actions, no credits)
Requires Node.js 20+:

```sh
cd cloudflare/nexora-control
npm test
```

Tests cover GET/HEAD /health, rejection of unsafe methods (405), and fail-closed 404 behavior for memory, auth, agent and unknown paths. No external dependencies or account credentials are needed.

## Verification record — 2026-10-26
- Node.js v22.16.0, local test runner: **4/4 tests passed**.
- GitHub source, test suite and package.json were saved and re-read from the public repository.
- Higgsfield production website is deployed and its D1 database contains `nexora_memory`; schema was read, but **no records were read or changed**.
- Cloudflare account authentication and production Worker deployment **not verified**; do not interpret local tests as live API availability.
- Existing Higgsfield website repo checkout succeeded but sandbox file listing timed out; **no Higgsfield code was changed**.

## Deploy after Cloudflare authorization
From this directory, run `npx wrangler deploy` in an authenticated Cloudflare environment. Confirm account and free-plan settings before deploying. Never paste API tokens into chats or commit them.

## Next priority
Inspect the **actual** Higgsfield memory API source and current auth boundary, then design a scoped, authenticated ChatGPT bridge with no public memory reads, strict input validation, rate limits, and test coverage. Deployment requires verified Cloudflare authorization; this repository is public and must never contain private NEXORA memory, user data or tokens.
