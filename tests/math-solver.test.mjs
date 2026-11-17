import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeMathQuery } from '../lib/sanitizeMath.mjs';
import { solveMathProblem, solveMathImage } from '../lib/mathSolverEngine.mjs';
import { PRICING_PLANS, POLAR_CHECKOUT_WEEKLY, POLAR_CHECKOUT_ANNUAL, APP_STORE_URL } from '../lib/pricing.mjs';

test('sanitizeMathQuery: allows valid mathematical expressions and LaTeX syntax', () => {
  const inputs = [
    '\\int x e^x dx',
    '2x^2 - 5x + 2 = 0',
    '\\lim_{x \\to 0} \\frac{\\sin x}{x}',
    '\\frac{d}{dx}(x^3 \\ln x)',
    'x^2 + y^2 = 25',
    '3x + 12 = 0'
  ];

  for (const input of inputs) {
    const res = sanitizeMathQuery(input);
    assert.equal(res.valid, true, `Should accept valid math: ${input}`);
    assert.ok(res.sanitized.length > 0);
  }
});

test('sanitizeMathQuery: normalizes unicode symbols correctly', () => {
  const res = sanitizeMathQuery('2x² − 5x × 3 + √4 = 0');
  assert.equal(res.valid, true);
  assert.ok(res.sanitized.includes('^2'));
  assert.ok(res.sanitized.includes('-'));
  assert.ok(res.sanitized.includes('*'));
  assert.ok(res.sanitized.includes('\\sqrt'));
});

test('sanitizeMathQuery: rejects XSS and script injection attacks', () => {
  const malicious = [
    '<script>alert("xss")</script>',
    '<img src=x onerror=alert(1)>',
    'javascript:stealToken()',
    'x^2 + <svg onload=fetch("/steal")>',
    'document.cookie'
  ];

  for (const attack of malicious) {
    const res = sanitizeMathQuery(attack);
    assert.equal(res.valid, false, `Should reject XSS attack: ${attack}`);
    assert.ok(res.error.includes('Güvenlik ihlali'));
  }
});

test('sanitizeMathQuery: rejects SQL injection attempts', () => {
  const sqli = [
    "select * from users",
    "x^2; DROP TABLE students;",
    "' or '1'='1"
  ];

  for (const attack of sqli) {
    const res = sanitizeMathQuery(attack);
    assert.equal(res.valid, false, `Should reject SQLi: ${attack}`);
  }
});

test('sanitizeMathQuery: enforces Zero-PII policy (GDPR & KVKK)', () => {
  const piiExamples = [
    'ali.veli@gmail.com soruyu coz',
    'telefonum 05321234567 denklem 2x+1=0',
    'TC kimlik 12345678901 integral cozumu',
    'kart no 4111 2222 3333 4444'
  ];

  for (const pii of piiExamples) {
    const res = sanitizeMathQuery(pii);
    assert.equal(res.valid, false, `Should reject PII: ${pii}`);
    assert.ok(res.error.includes('Kişisel veri'));
  }
});

test('sanitizeMathQuery: enforces maximum query length bound', () => {
  const longQuery = 'x + '.repeat(100);
  const res = sanitizeMathQuery(longQuery);
  assert.equal(res.valid, false);
  assert.ok(res.error.includes('karakter'));
});

test('solveMathProblem: solves preset integration by parts problem correctly', () => {
  const sol = solveMathProblem('\\int x e^x dx');
  assert.ok(sol);
  assert.equal(sol.topic.includes('Kısmi İntegrasyon'), true);
  assert.equal(sol.difficulty, 'Orta');
  assert.equal(sol.step1.stepNumber, 1);
  assert.ok(sol.step1.math.includes('du = dx'));
  assert.equal(sol.lockedSteps.length, 3);
  assert.equal(sol.totalSteps, 4);
  assert.equal(sol.freeStepsCount, 1);
  assert.equal(sol.requiresPro, true);
  assert.equal(sol.fullSolutionAnswer, 'e^x(x - 1) + C');
});

test('solveMathProblem: solves quadratic equation with discriminant', () => {
  const sol = solveMathProblem('2x^2 - 5x + 2 = 0');
  assert.ok(sol);
  assert.equal(sol.topic.includes('İkinci Dereceden Denklemler'), true);
  assert.ok(sol.step1.math.includes('\\Delta = b^2 - 4ac'));
  assert.equal(sol.lockedSteps.length, 3);
  assert.equal(sol.requiresPro, true);
});

test('solveMathProblem: solves trigonometric limit', () => {
  const sol = solveMathProblem('\\lim_{x \\to 0} \\frac{\\sin x}{x}');
  assert.ok(sol);
  assert.equal(sol.topic.includes('Limit'), true);
  assert.ok(sol.step1.math.includes('0/0') || sol.step1.math.includes('Belirsizlik'));
});

test('solveMathProblem: handles product rule derivative', () => {
  const sol = solveMathProblem('\\frac{d}{dx}(x^3 \\ln x)');
  assert.ok(sol);
  assert.equal(sol.topic.includes('Türevi'), true);
  assert.ok(sol.step1.math.includes('3x^2'));
});

test('solveMathProblem: dynamic fallback classifies arbitrary integral and generates locked steps', () => {
  const sol = solveMathProblem('\\int (5x^4 - 2x) dx');
  assert.ok(sol);
  assert.equal(sol.topic.includes('İntegral'), true);
  assert.equal(sol.step1.stepNumber, 1);
  assert.ok(sol.lockedSteps.length >= 2);
  assert.equal(sol.requiresPro, true);
});

test('solveMathProblem: dynamic fallback classifies arbitrary derivative', () => {
  const sol = solveMathProblem('d/dx (x^5 + 4x^2)');
  assert.ok(sol);
  assert.equal(sol.topic.includes('Türev'), true);
  assert.equal(sol.requiresPro, true);
});

test('solveMathImage: solves sample photo question presets', () => {
  const sol = solveMathImage({ sampleId: 'integral', fileName: 'ayt-integral.png' });
  assert.ok(sol);
  assert.equal(sol.detectionSource, 'photo_ocr');
  assert.equal(sol.detectedFileName, 'ayt-integral.png');
  assert.ok(sol.problem.includes('e^x'));
  assert.equal(sol.step1.stepNumber, 1);
  assert.equal(sol.lockedSteps.length, 3);
});

test('pricing: plans and checkout URLs are configured properly', () => {
  assert.ok(Array.isArray(PRICING_PLANS));
  assert.equal(PRICING_PLANS.length, 3);

  const [free, weekly, annual] = PRICING_PLANS;
  assert.equal(free.id, 'free');
  assert.equal(free.price, '₺0');

  assert.equal(weekly.id, 'weekly');
  assert.equal(weekly.price, '₺79');
  assert.ok(weekly.ctaHref.includes('polar'));

  assert.equal(annual.id, 'annual');
  assert.equal(annual.price, '₺499');
  assert.equal(annual.highlighted, true);
  assert.ok(annual.ctaHref.includes('polar'));

  assert.ok(APP_STORE_URL.includes('apps.apple.com'));
});
