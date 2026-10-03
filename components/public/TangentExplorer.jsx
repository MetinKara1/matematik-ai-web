"use client";

import { useRef, useState } from 'react';

const px = (x) => 300 + x * 75;
const py = (y) => 340 - y * 32;


export default function TangentExplorer({ locale = 'tr' }) {
  const en = locale === 'en';
  const format = n => Number(n.toFixed(2)).toLocaleString(en ? 'en-US' : 'tr-TR');
  const [a, setA] = useState(1);
  const svgRef = useRef(null);
  const slope = 2 * a;
  const curve = Array.from({ length: 121 }, (_, i) => { const x = -3 + i / 20; return `${px(x)},${py(x * x)}`; }).join(' ');
  function movePoint(event) {
    const svg = svgRef.current;
    const matrix = svg?.getScreenCTM();
    if (!matrix) return;
    const point = svg.createSVGPoint();
    point.x = event.clientX; point.y = event.clientY;
    const local = point.matrixTransform(matrix.inverse());
    setA(Math.round(Math.max(-2.5, Math.min(2.5, (local.x - 300) / 75)) * 10) / 10);
  }
  return <div className="tangent-explorer">
    <p>{en ? 'Drag the point on f(x) = x² or use the slider. The purple curve is the function; the orange line is its tangent at the selected point.' : 'f(x) = x² üzerinde noktayı sürükleyin veya kaydırıcıyı kullanın. Mor eğri fonksiyonu, turuncu doğru seçili noktadaki teğeti gösterir.'}</p>
    <svg ref={svgRef} viewBox="0 0 600 390" role="img" aria-labelledby="tangent-title tangent-description">
      <title id="tangent-title">{en ? 'The x squared curve and its moving tangent' : 'x kare eğrisi ve hareketli teğeti'}</title>
      <desc id="tangent-description">{en ? `Selected point (${format(a)}; ${format(a*a)}). Tangent slope ${format(slope)}. Use the slider below to change the point.` : `Seçili nokta (${format(a)}; ${format(a * a)}). Teğet eğimi ${format(slope)}. Aynı nokta aşağıdaki kaydırıcıyla da değiştirilebilir.`}</desc>
      <defs><clipPath id="tangent-clip"><rect x="35" y="15" width="530" height="355" /></clipPath></defs>
      <g clipPath="url(#tangent-clip)">
        {[-3,-2,-1,0,1,2,3].map(x => <line key={`x${x}`} x1={px(x)} x2={px(x)} y1="15" y2="370" stroke="#e5e7eb" />)}
        {[0,2,4,6,8,10].map(y => <line key={`y${y}`} x1="35" x2="565" y1={py(y)} y2={py(y)} stroke="#e5e7eb" />)}
        <line x1="35" x2="565" y1={py(0)} y2={py(0)} stroke="#64748b" />
        <line x1={px(0)} x2={px(0)} y1="15" y2="370" stroke="#64748b" />
        <polyline points={curve} fill="none" stroke="#6d28d9" strokeWidth="3" />
        <line x1={px(-4)} y1={py(slope * -4 - a*a)} x2={px(4)} y2={py(slope * 4 - a*a)} stroke="#c2410c" strokeWidth="3" />
      </g>
      {[-3,-2,-1,1,2,3].map(x => <text key={x} x={px(x)} y="360" textAnchor="middle" fontSize="13" fill="#475569">{x}</text>)}
      {[2,4,6,8,10].map(y => <text key={y} x="288" y={py(y)+5} textAnchor="end" fontSize="13" fill="#475569">{y}</text>)}
      <text x="565" y="332" fill="#475569">x</text><text x="310" y="20" fill="#475569">y</text>
      <circle cx={px(a)} cy={py(a*a)} r="18" fill="transparent" style={{ cursor: 'grab', touchAction: 'none' }} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); movePoint(event); }} onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) movePoint(event); }} onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} />
      <circle cx={px(a)} cy={py(a*a)} r="6" fill="#c2410c" stroke="white" strokeWidth="2" pointerEvents="none" />
    </svg>
    <label htmlFor="tangent-position">{en ? 'Tangent point x coordinate: ' : 'Teğme noktasının x koordinatı: '}<strong>{format(a)}</strong></label>
    <input id="tangent-position" type="range" min="-2.5" max="2.5" step="0.1" value={a} onChange={event => setA(Number(event.target.value))} />
    <div className="tangent-readout" aria-live="polite" aria-atomic="true">
      <p><strong>{en ? 'Point:' : 'Nokta:'}</strong> ({format(a)}; {format(a*a)}) · <strong>{en ? 'Slope:' : 'Eğim:'}</strong> f′(a) = {format(slope)}</p>
      <p><strong>{en ? 'Tangent:' : 'Teğet:'}</strong> y = {format(slope)}x {a === 0 ? '' : `− ${format(a*a)}`}</p>
      <p>{en ? (a < 0 ? 'The slope is negative: the tangent falls from left to right.' : a > 0 ? 'The slope is positive: the tangent rises from left to right.' : 'The slope is zero: the tangent is horizontal.') : a < 0 ? 'Bu noktada eğim negatif: teğet soldan sağa alçalır.' : a > 0 ? 'Bu noktada eğim pozitif: teğet soldan sağa yükselir.' : 'Bu noktada eğim sıfır: teğet yataydır.'}</p>
    </div>
  </div>;
}
