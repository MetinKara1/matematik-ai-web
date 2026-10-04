'use client';

import { useRef, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { calculate } from '../../lib/math/polynomial.mjs';

function MathResult({ value }) {
  // Only generated expressions reach KaTeX; raw input is never interpreted as TeX.
  return <div className="tool-math" dangerouslySetInnerHTML={{ __html: katex.renderToString(value, { displayMode: true, throwOnError: false, trust: false }) }} />;
}

export default function MathCalculator({ tool }) {
  const [expression, setExpression] = useState(tool.initial);
  const [definite, setDefinite] = useState(false);
  const [lower, setLower] = useState('0');
  const [upper, setUpper] = useState('2');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const resultRef = useRef(null);
  const inputRef = useRef(null);
  function clearResult() { setResult(null); setError(''); }
  function solve(event) {
    event.preventDefault();
    try {
      const answer = calculate(tool.kind, expression, { definite, lower, upper });
      setResult(answer); setError('');
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (problem) {
      setResult(null); setError(problem.message);
    }
  }
  function reset() {
    setExpression(''); setDefinite(false); setLower('0'); setUpper('2'); clearResult(); inputRef.current?.focus();
  }
  return (
    <section className="tool-calculator" aria-labelledby="calculator-heading">
      <div className="tool-calculator-heading"><span className="tool-tag">Ücretsiz · Üyeliksiz</span><h2 id="calculator-heading">Sorunu yaz, adımları incele</h2></div>
      <form onSubmit={solve} noValidate>
        <label htmlFor="tool-expression">{tool.label}</label>
        <input ref={inputRef} id="tool-expression" className="tool-expression" value={expression} onChange={(event) => { setExpression(event.target.value); clearResult(); }} maxLength={160} autoComplete="off" autoCapitalize="none" spellCheck={false} aria-invalid={!!error} aria-describedby={`tool-syntax${error ? ' tool-error' : ''}`} placeholder={tool.initial} />
        <p id="tool-syntax" className="tool-hint">Üs: x^2 · Çarpma: 2x veya 2*x · Kesir: x/3 · Ondalık: 0,5 veya 0.5. Binlik ayırıcı kullanmayın.</p>
        <div className="tool-examples" aria-label="Örnek ifadeler"><span>Bir örnek seç:</span>{tool.examples.map((example) => <button type="button" key={example} onClick={() => { setExpression(example); clearResult(); inputRef.current?.focus(); }}>{example}</button>)}</div>
        {tool.kind === 'integral' && <fieldset className="tool-integral-mode"><legend>İntegral türü</legend>
          <label><input type="radio" name="integral-mode" checked={!definite} onChange={() => { setDefinite(false); clearResult(); }} /> Belirsiz integral</label>
          <label><input type="radio" name="integral-mode" checked={definite} onChange={() => { setDefinite(true); clearResult(); }} /> Belirli integral</label>
          {definite && <div className="tool-bounds"><div><label htmlFor="tool-lower">Alt sınır (a)</label><input id="tool-lower" value={lower} maxLength={40} onChange={(event) => { setLower(event.target.value); clearResult(); }} placeholder="0" /></div><div><label htmlFor="tool-upper">Üst sınır (b)</label><input id="tool-upper" value={upper} maxLength={40} onChange={(event) => { setUpper(event.target.value); clearResult(); }} placeholder="2" /></div><p className="tool-hint">Sayı veya kesir yazın: -2, 0,5, 1/2. Sonuç F(b) − F(a) olarak hesaplanır.</p></div>}
        </fieldset>}
        <div className="tool-actions"><button type="submit" className="tool-primary">Hesapla <span aria-hidden="true">→</span></button><button type="button" className="tool-reset" onClick={reset}>Temizle</button></div>
        {error && <p id="tool-error" className="tool-error" role="alert">{error}</p>}
      </form>
      <p className="tool-privacy">Hesaplama tarayıcınızda yapılır. Girdiğiniz ifade sunucuya gönderilmez.</p>
      <noscript><p className="tool-error">Hesaplayıcıyı kullanmak için JavaScript’i etkinleştirin. Aşağıdaki açıklama ve örnekleri JavaScript olmadan da okuyabilirsiniz.</p></noscript>
      {result && <div className="tool-result" ref={resultRef} tabIndex={-1} aria-label={result.title}>
        <span className="tool-tag">Sonuç</span><h3>{result.title}</h3><MathResult value={result.math} />
        {result.note && <p className="tool-result-note">{result.note}</p>}
        <h3 className="tool-steps-title">Çözüm adımları</h3><ol className="tool-steps">{result.steps.map((step, i) => <li key={i}><p>{step.text}</p>{step.math && <MathResult value={step.math} />}</li>)}</ol>
      </div>}
    </section>
  );
}
