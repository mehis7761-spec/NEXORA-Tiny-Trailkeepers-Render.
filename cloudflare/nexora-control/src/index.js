const HEALTH = Object.freeze({
  service: "nexora-control",
  status: "ok",
  version: "0.1.1",
  mode: "public-health-only"
});
const COMMON_HEADERS = {
  "cache-control": "no-store",
  "x-content-type-options": "nosniff"
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    // Never expose memory, agent or account data through this public scaffold.
    if (url.pathname !== "/health") {
      return new Response("Not found", { status: 404, headers: COMMON_HEADERS });
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response(null, {
        status: 405,
        headers: { ...COMMON_HEADERS, allow: "GET, HEAD" }
      });
    }
    if (request.method === "HEAD") {
      return new Response(null, {
        status: 200,
        headers: { ...COMMON_HEADERS, "content-type": "application/json; charset=utf-8" }
      });
    }
    return Response.json(HEALTH, { headers: COMMON_HEADERS });
  }
};
