export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return Response.json({ service: "nexora-control", status: "ok", version: "0.1.0", mode: "public-health-only" }, { headers: { "cache-control": "no-store" } });
    }
    return new Response("Not found", { status: 404 });
  }
};
