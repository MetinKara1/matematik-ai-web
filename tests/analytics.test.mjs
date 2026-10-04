import test from 'node:test';
import assert from 'node:assert/strict';
import { eventForLink, pageViewParameters, publicAnalyticsPath, safeEvent, validMeasurementId } from '../lib/analytics.mjs';

test('reject invalid IDs, private routes and non-public assets', () => {
  for (const id of ['', undefined, 'G-<script>', 'GTM-123456']) assert.equal(validMeasurementId(id), false);
  assert.equal(validMeasurementId('G-TEST12345'), true);
  for (const path of ['/malcolmX', '/malcolmX/users', '/solution/student-name', '/api/questions', '/kaynaklar/example.pdf', '/login']) assert.equal(publicAnalyticsPath(path), null);
});
test('strip query and fragment, preserve only safe referrer origin', () => {
  assert.deepEqual(pageViewParameters('/araclar/turev-hesaplama?expression=student-private#answer', 'https://google.com/search?q=student-private'), { page_location: 'https://matematik-ai.com/araclar/turev-hesaplama', page_title: '/araclar/turev-hesaplama', page_referrer: 'https://google.com/' });
  assert.equal(pageViewParameters('/solution/private'), null);
  assert.equal(pageViewParameters('/', 'javascript:alert(1)').page_referrer, '');
  assert.equal(publicAnalyticsPath('/rehber/fields-madalyasi-nedir'), '/rehber/fields-madalyasi-nedir');
});
test('only approved destinations produce link events', () => {
  assert.equal(eventForLink('https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761').name, 'app_store_click');
  assert.equal(eventForLink('/kaynaklar/temel-integral-calisma-kagidi.pdf?private=123').parameters.resource_slug, 'temel-integral-calisma-kagidi');
  for (const url of ['https://evil.test/kaynaklar/temel-integral-calisma-kagidi.pdf', '/kaynaklar/private.pdf', 'https://apps.apple.com/us/app/another/id123']) assert.equal(eventForLink(url), null);
});
test('drop input values and unknown telemetry parameters', () => {
  assert.deepEqual(safeEvent('calculator_success', { tool_kind: 'integral', expression: 'student-private', result: 'secret', user_id: 'student' }), { name: 'calculator_success', parameters: { tool_kind: 'integral' } });
  assert.equal(safeEvent('calculator_success', { tool_kind: 'private' }), null);
  assert.equal(safeEvent('resource_share', { resource_slug: 'private' }), null);
  assert.equal(safeEvent('unapproved_event', { expression: 'private' }), null);
});
