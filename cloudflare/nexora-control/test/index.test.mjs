import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

const call = (path, method = 'GET') => worker.fetch(new Request(`https://nexora.example${path}`, { method }));

test('GET /health returns bounded public JSON without cache', async () => {
  const response = await call('/health');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/json/);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.deepEqual(await response.json(), {
    service: 'nexora-control', status: 'ok', version: '0.1.1', mode: 'public-health-only'
  });
});

test('HEAD /health has no response body', async () => {
  const response = await call('/health', 'HEAD');
  assert.equal(response.status, 200);
  assert.equal(await response.text(), '');
});

test('non-read methods are rejected with Allow header', async () => {
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
    const response = await call('/health', method);
    assert.equal(response.status, 405, method);
    assert.equal(response.headers.get('allow'), 'GET, HEAD');
  }
});

test('memory, auth, agent, unknown paths fail closed for read and write', async () => {
  for (const path of ['/api/memory', '/memory', '/api/auth', '/api/agents', '/unknown', '/health/']) {
    for (const method of ['GET', 'POST']) {
      const response = await call(path, method);
      assert.equal(response.status, 404, `${method} ${path}`);
      assert.equal(await response.text(), 'Not found');
      assert.equal(response.headers.get('cache-control'), 'no-store');
    }
  }
});
