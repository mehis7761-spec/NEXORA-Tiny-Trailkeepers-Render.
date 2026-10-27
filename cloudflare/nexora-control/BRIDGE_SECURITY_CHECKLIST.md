# NEXORA memory bridge: security acceptance gate

Status: DESIGN ONLY — no memory bridge deployed or tested.

## Before implementing
1. Locate the actual memory API implementation and its database bindings. Record endpoint paths and auth mechanism without copying secrets.
2. Confirm the identity and authorization model: per-user scoped access, explicit allowlist of permitted operations, and no unauthenticated memory reads.
3. Use short-lived credentials stored in platform secrets, never in source, URLs, logs or chat. Reject missing, invalid and expired credentials.
4. Validate request schema and size; return consistent 400/401/403/405/429 responses. Never return stack traces or private data.
5. Define strict CORS allowlist where browser access is needed; CORS is not authentication.
6. Add rate limiting, audit metadata without memory contents, and replay protections for write requests.
7. Default to read-only, then enable writes only after explicit approval and isolated tests. No trading or agent commands.

## Minimum automated tests
- No token, wrong token, expired token: no memory access.
- Correct token, wrong scope or user: 403, no cross-user data.
- Valid authorized read: only permitted records; verify pagination and size limits.
- Invalid JSON, oversized payload, unexpected fields: rejected safely.
- POST/PUT/DELETE to read-only routes: rejected.
- Repeated requests: rate limit enforced.
- No sensitive response data cached or written to logs.
- Existing public /health GET and HEAD behavior unchanged; all other public paths remain closed.

## Deployment gate
Run tests in a local isolated environment with synthetic records. Review code diff and deployment permissions. Only then test staging with test-only credentials; production deploy requires separate explicit approval.

## Verified source baseline (2026-10-27)
- cloudflare/nexora-control/src/index.js serves public GET/HEAD /health and returns 404 for all other paths.
- package.json defines npm test via node --test.
- Actual Higgsfield memory implementation, Cloudflare auth and production deployment have not been verified in this run.
