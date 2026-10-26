# NEXORA Cloudflare control: phase 0

A public, credential-free **health-only** Worker. It has no agent commands, no data access, no trading, no secrets, no billing integrations and no cron. This is intentionally safe to publish publicly.

## Deploy after Cloudflare authorization
From this directory, run `npx wrangler deploy` in an authenticated Cloudflare environment. Confirm the account and free-plan settings in the Cloudflare dashboard before deploying. Never paste API tokens into chats or commit them.

## Test
GET `/health` returns `{"service":"nexora-control","status":"ok","version":"0.1.0","mode":"public-health-only"}`. Other routes return HTTP 404.

## Next phase
Only after identity and permissions are verified: add authenticated task queue, durable storage, limits, and separate render worker. Do not store secrets in this public repo.
