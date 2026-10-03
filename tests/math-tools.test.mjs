import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePolynomial as parse, polynomialTex as tex, calculate, differentiate, integrate, evaluate, fraction } from '../lib/math/polynomial.mjs';

const equal = (source, expected) => assert.equal(tex(parse(source)), expected);
test('arithmetic precedence, implicit multiplication and decimals', () => {
  equal('-x^2 + 2x', '-x^{2} +2x');
  equal('(-x)^2', 'x^{2}');
  equal('(x + 1)(x - 1)', 'x^{2} -1');
  equal('2(x + 1)^3', '2x^{3} +6x^{2} +6x +2');
  equal('0,1x + 0.2x', '\\frac{3}{10}x');
  equal('x/3 + x/6', '\\frac{1}{2}x');
  equal('3x² − 2×x', '3x^{2} -2x');
  equal('x^0 + 3/(-2)', '-\\frac{1}{2}');
});
test('reject unsupported and malformed input, no domain-losing simplification', () => {
  for (const expression of ['', 'sin(x)', '1/x', 'x/(x-x+2)', 'x^-1', 'x^0.5', 'x^11', 'x^2^3', 'x/0', '0^0', 'x +', '(x', 'x)', '2 3', 'x2', 'x//2', 'Infinity', 'alert(1)', '<script>', '1;2', '1.2.3', 'x' .repeat(161), '('.repeat(17) + 'x' + ')'.repeat(17), '1234567890123']) {
    assert.throws(() => parse(expression), Error, expression);
  }
});
test('differentiation and integration are exact inverse operations for polynomials', () => {
  for (const expression of ['0', '7', 'x', '3x^3 - 2x^2 + 5x - 7', 'x^10/7 - 0.3x^2 + 1/9', '(x+2)^5']) {
    const p = parse(expression);
    assert.deepEqual(differentiate(integrate(p)), p, expression);
  }
  assert.equal(calculate('derivative', '7').math, "f'(x)=0");
  assert.equal(calculate('derivative', '3x^3-2x^2+5x-7').math, "f'(x)=9x^{2} -4x +5");
  assert.match(calculate('integral', '0').math, /0\+C$/);
});
test('linear, quadratic, repeated, irrational, absent and infinite real roots', () => {
  assert.equal(calculate('equation', '2x+3=7').math, 'x = 2');
  assert.equal(calculate('equation', '3x=1').math, 'x = \\frac{1}{3}');
  assert.equal(calculate('equation', 'x^2-5x+6=0').math, 'x_1=2,\\quad x_2=3');
  assert.equal(calculate('equation', '(x-2)^2=0').math, 'x_1=x_2=2');
  assert.match(calculate('equation', 'x^2=2').math, /sqrt/);
  assert.equal(calculate('equation', 'x^2+1=0').title, 'Gerçek sayılarda çözüm yok');
  assert.equal(calculate('equation', '2(x+1)=2x+2').math, 'x \\in \\mathbb{R}');
  assert.equal(calculate('equation', 'x+1=x+2').math, '\\varnothing');
  assert.equal(calculate('equation', '0x^2+2x=4').math, 'x = 2');
  assert.equal(calculate('equation', '0.5x^2-1.5x+1=0').math, 'x_1=1,\\quad x_2=2');
  for (const input of ['x^3=1', 'x=', '=2', 'x=2=3', '2x+3']) assert.throws(() => calculate('equation', input));
});
test('definite integral with exact fractions, reversed and equal bounds', () => {
  const definite = (p, lower, upper) => calculate('integral', p, { definite: true, lower, upper }).math;
  assert.match(definite('x^2', '0', '2'), /=\\frac\{8\}\{3\}$/);
  assert.match(definite('x^2', '2', '0'), /=-\\frac\{8\}\{3\}$/);
  assert.match(definite('x^2', '2', '2'), /=0$/);
  assert.match(definite('x', '-1', '1'), /=0$/);
  assert.match(definite('1', '0', '1/2'), /=\\frac\{1\}\{2\}$/);
  for (const bound of ['', 'x', 'Infinity', '1/0']) assert.throws(() => definite('x', bound, '1'));
});
test('polynomial evaluation and exact root substitution across generated cases', () => {
  for (let a = -4; a <= 4; a++) for (let b = -4; b <= 4; b++) {
    const p = parse(`(x-(${a}))(x-(${b}))`);
    assert.equal(evaluate(p, fraction(BigInt(a))).n, 0n);
    assert.equal(evaluate(p, fraction(BigInt(b))).n, 0n);
    const answer = calculate('equation', `(x-(${a}))(x-(${b}))=0`);
    assert.ok(!answer.math.includes('sqrt'));
  }
});

test('quadratic solutions match generated integer roots including negative leading coefficient', () => {
  for (let a = -4; a <= 4; a++) for (let b = -4; b <= 4; b++) {
    for (const scale of [-3, 2]) {
      const result = calculate('equation', `${scale}(x-(${a}))(x-(${b}))=0`);
      const roots = a === b ? [Number(result.math.split('=').at(-1)), Number(result.math.split('=').at(-1))] : [...result.math.matchAll(/x_[12]=(-?\d+)/g)].map((match) => Number(match[1]));
      assert.deepEqual(roots.sort((x,y) => x-y), [a,b].sort((x,y) => x-y));
    }
  }
});
