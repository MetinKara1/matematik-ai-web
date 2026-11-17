import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSharedQuestion, sharedSolutionImageSource } from '../lib/sharedSolutionImage.mjs';
import { decodeSolutionImage } from '../lib/solutionImage.server.mjs';
import { GET } from '../app/solution/[id]/image/route.js';

const id = 'e27e27a2-9100-4bbd-8c40-eb214bab0071';
const path = `/solution/${id}/image`;
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6sN8AAAAASUVORK5CYII=', 'base64');
const uri = `data:image/png;base64,${png.toString('base64')}`;

test('shared props replace the inline photo with a short URL and preserve question content', () => {
  const q = normalizeSharedQuestion({ Question: 'Q', Solution: 'A', Steps: ['S'], ImageUri: uri, UserId: 'private' }, id);
  assert.deepEqual(q, { Id: id, Question: 'Q', Solution: 'A', Steps: ['S'], ImageUri: path, HasImage: true, Type: undefined });
  assert.equal(JSON.stringify(q).includes('base64,'), false);
  assert.equal(JSON.stringify(q).includes('private'), false);
  assert.equal(normalizeSharedQuestion({question:'Q',solution:'A',steps:['S'],imageUri:uri}, id).ImageUri, path);
});

test('local, temporary and unsafe sources never become public image URLs', () => {
  for (const source of ['file:///var/mobile/photo.jpg', 'ph://photo', 'content://photo', 'javascript:alert(1)', 'blob:https://example.com/a', 'https://user:pass@example.com/a']) {
    assert.equal(sharedSolutionImageSource(source, id), null);
  }
  assert.equal(sharedSolutionImageSource(uri, '../../bad'), null);
  assert.equal(sharedSolutionImageSource(path, id), path);
  assert.equal(sharedSolutionImageSource('https://example.com/a.jpg', id), 'https://example.com/a.jpg');
  assert.equal(sharedSolutionImageSource('/uploads/a.jpg', id), 'https://api.matematik-ai.com/uploads/a.jpg');
  assert.equal(normalizeSharedQuestion({Type:'image',ImageUri:'file:///missing'}, id).HasImage, true);
});

test('decoder validates bytes and rejects malformed, spoofed or non-raster data', () => {
  assert.deepEqual(decodeSolutionImage(uri).bytes, png);
  assert.equal(decodeSolutionImage(uri).contentType, 'image/png');
  for (const bad of [null, 'data:image/svg+xml;base64,PHN2Zz4=', 'data:image/jpeg;base64,'+png.toString('base64'), 'data:image/png;base64,!!!!', 'data:image/png;base64,', 'data:image/png;base64,AAAAA']) assert.equal(decodeSolutionImage(bad), null);
});

test('public image endpoint returns image bytes, handles missing records and does not proxy arbitrary URLs', async () => {
  const original = global.fetch;
  let calls = 0;
  try {
    global.fetch = async () => { calls++;return Response.json({ImageUri:uri}); };
    const result = await GET(null, {params:Promise.resolve({id})});
    assert.equal(result.status, 200);
    assert.equal(result.headers.get('content-type'), 'image/png');
    assert.equal(result.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(result.headers.get('cache-control'), 'private, no-store');
    assert.deepEqual(Buffer.from(await result.arrayBuffer()), png);
    assert.equal((await GET(null, {params:Promise.resolve({id:'invalid'})})).status, 404);
    assert.equal(calls, 1);
    global.fetch = async () => Response.json({ImageUri:'https://internal.example/secret'});
    assert.equal((await GET(null, {params:{id}})).status, 404);
    global.fetch = async () => new Response(null,{status:404});
    assert.equal((await GET(null, {params:{id}})).status, 404);
    global.fetch = async () => {throw new Error('offline');};
    assert.equal((await GET(null, {params:{id}})).status, 502);
  } finally { global.fetch = original; }
});
