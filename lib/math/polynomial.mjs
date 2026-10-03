// Bounded polynomial parser. User input is never evaluated as JavaScript.
const MAX_DEGREE = 10;
const fail = (message) => { throw new Error(message); };
const abs = (n) => n < 0n ? -n : n;
function gcd(a, b) { while (b) [a, b] = [b, a % b]; return abs(a); }
export function fraction(n, d = 1n) {
  if (!d) fail('Sıfıra bölme yapılamaz.');
  const g = gcd(n, d); n /= g; d /= g;
  if (d < 0n) { n = -n; d = -d; }
  if (abs(n).toString().length > 120 || d.toString().length > 120) fail('Sayılar çok büyüdü. Daha küçük katsayılar kullanın.');
  return { n, d };
}
const zero = () => fraction(0n);
const add = (a, b) => fraction(a.n * b.d + b.n * a.d, a.d * b.d);
const neg = (a) => fraction(-a.n, a.d);
const mul = (a, b) => fraction(a.n * b.n, a.d * b.d);
const div = (a, b) => fraction(a.n * b.d, a.d * b.n);
const trim = (p) => { while (p.length > 1 && !p.at(-1).n) p.pop(); return p; };
function plus(a, b) { return trim(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => add(a[i] || zero(), b[i] || zero()))); }
function times(a, b) {
  if (a.length + b.length - 2 > MAX_DEGREE) fail('En fazla 10. dereceden polinom girin.');
  const c = Array.from({ length: a.length + b.length - 1 }, zero);
  a.forEach((x, i) => b.forEach((y, j) => { c[i + j] = add(c[i + j], mul(x, y)); }));
  return trim(c);
}
function number(s) {
  const [whole, decimals = ''] = s.replace(',', '.').split('.');
  if (whole.length + decimals.length > 12) fail('Her sayıda en fazla 12 rakam kullanın.');
  return fraction(BigInt((whole || '0') + decimals), 10n ** BigInt(decimals.length));
}
export function parsePolynomial(input) {
  if (typeof input !== 'string' || !input.trim()) fail('Önce bir matematiksel ifade yazın.');
  if (input.length > 160) fail('İfadeyi en fazla 160 karakterle yazın.');
  const source = input.replace(/−/g, '-').replace(/[×·]/g, '*').replace(/²/g, '^2').replace(/³/g, '^3');
  const tokens = []; let offset = 0;
  while (offset < source.length) {
    const match = /^(\s+|(?:\d+(?:[.,]\d+)?|[.,]\d+)|[xX+\-*/^()])/.exec(source.slice(offset));
    if (!match) fail('Yalnız x, sayılar, +, −, *, /, ^ ve parantez kullanın. sin, kök, log ve değişkenli payda desteklenmiyor.');
    offset += match[0].length;
    if (!/^\s+$/.test(match[0])) tokens.push(match[0].toLowerCase());
  }
  if (tokens.length > 128) fail('İfade çok uzun. Daha az terim kullanın.');
  let pos = 0, depth = 0;
  const peek = () => tokens[pos];
  function atom() {
    const token = tokens[pos++];
    if (token === 'x') return [zero(), fraction(1n)];
    if (token === '(') {
      if (++depth > 16) fail('Çok fazla iç içe parantez var.');
      const result = sum();
      if (tokens[pos++] !== ')') fail('Parantezleri kontrol edin.');
      depth--; return result;
    }
    if (token && /^(\d|[.,])/.test(token)) return [number(token)];
    fail('Eksik veya hatalı ifade. Örneğin 3*x^2 - 2*x + 1 yazın.');
  }
  function power() {
    let p = atom();
    if (peek() === '^') {
      pos++; const exponent = tokens[pos++];
      if (!/^\d+$/.test(exponent || '') || Number(exponent) > MAX_DEGREE) fail('Üs, 0 ile 10 arasında bir tam sayı olmalı.');
      if (!p.some((c) => c.n) && Number(exponent) === 0) fail('0^0 bu araçta tanımlı değildir.');
      const base = p; p = [fraction(1n)];
      for (let i = 0; i < Number(exponent); i++) p = times(p, base);
    }
    return p;
  }
  function unary() {
    if (peek() === '+' || peek() === '-') {
      const sign = tokens[pos++];
      // Bound recursive unary signs independently from parentheses.
      if (peek() === '+' || peek() === '-') fail('Arka arkaya işaret yazmayın; gerekirse parantez kullanın.');
      const p = power(); return sign === '-' ? p.map(neg) : p;
    }
    return power();
  }
  function product() {
    let p = unary();
    while (peek() === '*' || peek() === '/' || peek() === 'x' || peek() === '(') {
      const operation = peek() === '/' ? '/' : '*';
      if (peek() === '*' || peek() === '/') pos++;
      const start = pos; const q = unary();
      if (operation === '/') {
        if (tokens.slice(start, pos).includes('x')) fail('Paydada x kullanılamaz. Bu araç yalnız polinomları destekler.');
        p = p.map((c) => div(c, q[0]));
      } else p = times(p, q);
    }
    return p;
  }
  function sum() {
    let p = product();
    while (peek() === '+' || peek() === '-') {
      const sign = tokens[pos++]; const q = product();
      p = plus(p, sign === '-' ? q.map(neg) : q);
    }
    return p;
  }
  const result = sum();
  if (pos !== tokens.length) fail('İfadeyi kontrol edin. Çarpma için * kullanın ve parantezleri kapatın.');
  return trim(result);
}
export function fractionTex(a) {
  const sign = a.n < 0n ? '-' : '';
  return a.d === 1n ? String(a.n) : `${sign}\\frac{${abs(a.n)}}{${a.d}}`;
}
export function polynomialTex(p) {
  const terms = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const c = p[i]; if (!c.n) continue;
    const magnitude = fraction(abs(c.n), c.d);
    const coefficient = i && magnitude.n === magnitude.d ? '' : fractionTex(magnitude);
    const variable = i === 0 ? '' : i === 1 ? 'x' : `x^{${i}}`;
    const sign = c.n < 0n ? '-' : terms.length ? '+' : '';
    terms.push(`${sign}${coefficient}${variable}`);
  }
  return terms.join(' ') || '0';
}
export const differentiate = (p) => p.length === 1 ? [zero()] : trim(p.slice(1).map((c, i) => mul(c, fraction(BigInt(i + 1)))));
export const integrate = (p) => trim([zero(), ...p.map((c, i) => div(c, fraction(BigInt(i + 1))))]);
export function evaluate(p, x) { return p.reduceRight((result, c) => add(mul(result, x), c), zero()); }
function scalar(input) {
  if (/[xX]/.test(input)) fail('İntegral sınırlarına yalnız sayı yazın; örneğin -2 veya 1/2.');
  return parsePolynomial(input)[0];
}
function sqrtInteger(n) {
  if (n < 2n) return n;
  let x = n, y = (x + 1n) / 2n;
  while (y < x) { x = y; y = (x + n / x) / 2n; }
  return x;
}
const asNumber = (c) => Number(c.n) / Number(c.d);
const approx = (n) => {
  const [mantissa, exponent] = Number(n.toPrecision(8)).toString().split('e');
  return exponent ? `${mantissa}\\times 10^{${Number(exponent)}}` : mantissa;
};
export function calculate(kind, input, options = {}) {
  if (kind === 'equation') {
    if (input.length > 160) fail('Denklemi en fazla 160 karakterle yazın.');
    const sides = input.split('=');
    if (sides.length !== 2 || sides.some((s) => !s.trim())) fail('Denklemin iki tarafını da yazın. Örneğin 2x + 3 = 7.');
    const p = plus(parsePolynomial(sides[0]), parsePolynomial(sides[1]).map(neg));
    if (p.length > 3) fail('Denklem çözücü yalnız birinci ve ikinci derece denklemleri destekler.');
    const steps = [{ text: 'Tüm terimleri sola taşıyıp benzer terimleri birleştir.', math: `${polynomialTex(p)} = 0` }];
    if (p.length === 1) return { title: p[0].n ? 'Gerçek sayılarda çözüm yok' : 'Her gerçek sayı bir çözümdür', math: p[0].n ? '\\varnothing' : 'x \\in \\mathbb{R}', steps: [...steps, { text: p[0].n ? 'Sıfırdan farklı bir sabit sıfıra eşit olamaz.' : 'Eşitlik x değerinden bağımsız olarak her zaman doğrudur.' }] };
    const [c, b, a] = p;
    if (p.length === 2) {
      const root = div(neg(c), b);
      steps.push({ text: 'Sabit terimi sağa geçir ve x’in katsayısına böl.', math: `x = \\frac{${fractionTex(neg(c))}}{${fractionTex(b)}} = ${fractionTex(root)}` });
      return { title: 'Denklemin çözümü', math: `x = ${fractionTex(root)}`, steps };
    }
    const delta = add(mul(b, b), neg(mul(fraction(4n), mul(a, c))));
    steps.push({ text: 'İkinci derece denklemin katsayılarını belirle.', math: `a=${fractionTex(a)},\\quad b=${fractionTex(b)},\\quad c=${fractionTex(c)}` });
    steps.push({ text: 'Diskriminantı hesapla: Δ = b² − 4ac.', math: `\\Delta = (${fractionTex(b)})^2 - 4(${fractionTex(a)})(${fractionTex(c)}) = ${fractionTex(delta)}` });
    if (delta.n < 0n) return { title: 'Gerçek sayılarda çözüm yok', math: '\\Delta < 0', steps: [...steps, { text: 'Negatif diskriminantın gerçek karekökü yoktur. Bu araç karmaşık kökleri hesaplamaz.' }] };
    const nRoot = sqrtInteger(delta.n), dRoot = sqrtInteger(delta.d), denominator = mul(fraction(2n), a);
    let math;
    if (nRoot * nRoot === delta.n && dRoot * dRoot === delta.d) {
      const root = fraction(nRoot, dRoot);
      const r1 = div(add(neg(b), neg(root)), denominator), r2 = div(add(neg(b), root), denominator);
      math = delta.n === 0n ? `x_1=x_2=${fractionTex(r1)}` : `x_1=${fractionTex(r1)},\\quad x_2=${fractionTex(r2)}`;
    } else {
      math = `x_{1,2}=\\frac{${fractionTex(neg(b))}\\pm\\sqrt{${fractionTex(delta)}}}{${fractionTex(denominator)}}`;
      // Stable quadratic formula avoids cancellation for small roots.
      const bn = asNumber(b), an = asNumber(a), cn = asNumber(c);
      const q = -0.5 * (bn + (bn >= 0 ? 1 : -1) * Math.sqrt(asNumber(delta)));
      steps.push({ text: 'Yaklaşık kökler (8 anlamlı basamak):', math: `x_1\\approx ${approx(q / an)},\\quad x_2\\approx ${approx(cn / q)}` });
    }
    steps.splice(3, 0, { text: 'Kök formülünde yerine koy.', math: `x_{1,2}=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}=\\frac{${fractionTex(neg(b))}\\pm\\sqrt{${fractionTex(delta)}}}{${fractionTex(denominator)}}` });
    return { title: delta.n === 0n ? 'Çakışık iki kök' : 'İki gerçek kök', math, steps };
  }
  const p = parsePolynomial(input);
  if (kind !== 'derivative' && kind !== 'integral') fail('Bu hesaplama türü desteklenmiyor.');
  const derivative = kind === 'derivative';
  const result = derivative ? differentiate(p) : integrate(p);
  const steps = [{ text: 'Parantezleri aç ve benzer terimleri birleştir.', math: `f(x)=${polynomialTex(p)}` }, { text: derivative ? 'Her terime kuvvet kuralını uygula. Sabitin türevi sıfırdır.' : 'Üssü bir artır, katsayıyı yeni üsse böl.', math: derivative ? '\\frac{d}{dx}(ax^n)=anx^{n-1}\\quad(n\\geq1)' : '\\int ax^n\\,dx=\\frac{a}{n+1}x^{n+1}+C\\quad(n\\geq0)' }];
  for (let i = p.length - 1; i >= 0; i--) {
    if (!p[i].n) continue;
    const single = Array.from({ length: i + 1 }, zero); single[i] = p[i];
    steps.push({ text: i === 0 && derivative ? 'Sabit terimin katkısı:' : 'Terimin katkısı:', math: derivative ? `\\frac{d}{dx}\\left(${polynomialTex(single)}\\right)=${polynomialTex(differentiate(single))}` : `\\int \\left(${polynomialTex(single)}\\right)\\,dx=${polynomialTex(integrate(single))}+C` });
  }
  if (derivative) return { title: 'Türev sonucu', math: `f'(x)=${polynomialTex(result)}`, steps };
  if (options.definite) {
    const lower = scalar(options.lower || ''), upper = scalar(options.upper || '');
    const lowValue = evaluate(result, lower), highValue = evaluate(result, upper);
    const value = add(highValue, neg(lowValue));
    steps.push({ text: 'Bir ilkel fonksiyon seç. Belirli integralde sabitler birbirini götürür.', math: `F(x)=${polynomialTex(result)}` });
    steps.push({ text: 'Üst sınırdaki değerden alt sınırdaki değeri çıkar.', math: `F(${fractionTex(upper)})-F(${fractionTex(lower)})=(${fractionTex(highValue)})-(${fractionTex(lowValue)})=${fractionTex(value)}` });
    return { title: 'Belirli integral sonucu', math: `\\int_{${fractionTex(lower)}}^{${fractionTex(upper)}}\\left(${polynomialTex(p)}\\right)\\,dx=${fractionTex(value)}`, steps, note: 'Bu sonuç işaretli integraldir; geometrik alan her zaman aynı değildir.' };
  }
  steps.push({ text: 'Terimleri birleştir ve integrasyon sabiti C’yi ekle. Sonucun türevi başlangıçtaki polinomu verir.' });
  return { title: 'Belirsiz integral sonucu', math: `\\int \\left(${polynomialTex(p)}\\right)\\,dx=${polynomialTex(result)}+C`, steps };
}
