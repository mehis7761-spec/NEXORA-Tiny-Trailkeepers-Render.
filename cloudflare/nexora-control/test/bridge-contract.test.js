import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.js";

const call = (path, method = "GET") => worker.fetch(new Request("https://nexora.example" + path, { method }));

test("public health is GET-only with HEAD support", async () => {
  const get = await call("/health");
  assert.equal(get.status, 200);
  assert.equal(get.headers.get("cache-control"), "no-store");
  assert.equal((await get.json()).mode, "public-health-only");
  const head = await call("/health", "HEAD");
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
});

test("health rejects unsafe methods", async () => {
  for (const method of ["POST", "PUT", "DELETE", "PATCH"]) {
    const response = await call("/health", method);
    assert.equal(response.status, 405, method);
    assert.equal(response.headers.get("allow"), "GET, HEAD");
  }
});

test("memory, auth and bridge routes fail closed for every tested method", async () => {
  for (const path of ["/memory", "/api/memory", "/auth", "/api/auth", "/bridge", "/api/bridge", "/agents"]) {
    for (const method of ["GET", "HEAD", "POST", "PUT", "DELETE"]) {
      const response = await call(path, method);
      assert.equal(response.status, 404, method + " " + path);
      assert.equal(response.headers.get("cache-control"), "no-store");
    }
  }
});

test("unknown routes cannot expose public data", async () => {
  const response = await call("/health/../memory");
  assert.equal(response.status, 404);
});
