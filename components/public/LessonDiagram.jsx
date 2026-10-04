const diagrams = {
  'fonksiyonlar-ve-grafikler': 'parabola',
  'artan-azalan-fonksiyonlar': 'parabola',
  'turevde-maksimum-minimum': 'parabola',
  'turev-ile-grafik-cizimi': 'parabola',
  'trigonometrik-fonksiyonlar': 'circle',
  'birim-cember-ve-radyan': 'circle',
  'temel-trigonometrik-ozdeslikler': 'circle',
  'sagdan-ve-soldan-limit': 'jump',
  'sureklilik-nedir': 'jump',
  'sureksizlik-turleri': 'jump',
  'turevlenebilirlik-ve-sureklilik': 'corner',
  'turev-nedir': 'tangent',
  'turevin-geometrik-yorumu': 'tangent',
  'turev-hareket-problemleri': 'tangent',
  'belirsiz-integral-nedir': 'family',
  'integral-alma-kurallari': 'family',
  'integral-formulleri': 'family',
  'belirli-integral-nedir': 'area',
  'integral-ile-alan-hesabi': 'area',
};
const descriptions = {
  parabola: ['Parabol, kökler ve minimum', 'y = x² − 1 grafiğinin kökleri −1 ve 1, minimum noktası (0, −1). Sol tarafta azalan, sağ tarafta artan fonksiyon.', 'f(x) = x² − 1 için kökler −1 ve 1’dir. f′(x) = 2x solda negatif, sağda pozitiftir; (0, −1) minimumdur.'],
  circle: ['Birim çemberde sinüs ve kosinüs', 'Birim çemberde π/3 radyan açısındaki nokta (1/2, √3/2). Yatay izdüşüm kosinüs, düşey izdüşüm sinüstür.', 'θ = π/3 = 60° için P = (cos θ, sin θ) = (1/2, √3/2). Yarıçap 1 olduğundan cos²θ + sin²θ = 1.'],
  jump: ['Sağ ve sol limitin uyuşmaması', 'Sıfırdan küçük girdiler için değer −1, sıfırdan büyük girdiler için 1. Sıfırdaki dolu nokta 0. İki tek taraflı limit farklı.', 'f(x) = −1 (x < 0), f(0) = 0, f(x) = 1 (x > 0). Sol limit −1, sağ limit 1 olduğu için iki taraflı limit yoktur; f(0)’ı değiştirmek bunu düzeltmez.'],
  corner: ['Süreklilik türevlenebilirliği garanti etmez', 'y = |x| grafiği sıfırda kesintisiz bir V şekli. Sol eğim −1, sağ eğim 1 olduğu için köşede türev yok.', 'f(x) = |x| sıfırda süreklidir. Soldaki eğim −1 ve sağdaki eğim 1 uyuşmadığından f′(0) yoktur.'],
  tangent: ['Parabolün bir noktasındaki teğet', 'y = x² parabolü ve (1, 1) noktasındaki y = 2x − 1 teğeti. Teğette x bir artınca y iki artar.', 'f(x) = x² için f′(1) = 2. (1, 1) noktasındaki teğet y = 2x − 1’dir; teğet üzerindeki Δx = 1, Δy = 2 üçgeni eğimi gösterir.'],
  family: ['Aynı türeve sahip ilkel fonksiyonlar', 'y = x² − 1, y = x² ve y = x² + 1 aynı biçimdeki üç parabol. Aralarında sabit düşey fark var.', '∫2x dx = x² + C. C = −1, 0, 1 seçildiğinde farklı eğriler elde edilir; üçünün de türevi 2x’tir.'],
  area: ['İşaretli integral ile geometrik alan', 'y = x doğrusu üzerinde −1 ile 0 arası eksenin altında, 0 ile 1 arası üstünde eş büyüklükte iki üçgen.', '∫₋₁¹ x dx = −1/2 + 1/2 = 0. Geometrik alan ise |−1/2| + |1/2| = 1’dir. Negatif ve pozitif katkılar integralde birbirini götürür.'],
};
function curve(fn, min, max, X, Y) {
  return Array.from({ length: 81 }, (_, i) => {
    const x = min + (max - min) * i / 80;
    return `${i ? 'L' : 'M'}${X(x).toFixed(2)},${Y(fn(x)).toFixed(2)}`;
  }).join(' ');
}
export default function LessonDiagram({ slug }) {
  const kind = diagrams[slug];
  if (!kind) return null;
  const [title, desc, caption] = descriptions[kind];
  const X = (x) => 240 + x * 85;
  const Y = (y) => 240 - y * 65;
  const axes = <g stroke="#64748b" strokeWidth="1.5"><path d="M40 240H450 M240 285V30" fill="none" /><text x="451" y="257" stroke="none">x</text><text x="223" y="29" stroke="none">y</text><text x="225" y="259" stroke="none">0</text></g>;
  const plot = (fn, color, min = -1.8, max = 1.8) => <path d={curve(fn, min, max, X, Y)} fill="none" stroke={color} strokeWidth="3" />;
  return <figure className="lesson-diagram">
    <h2>{title}</h2>
    <svg viewBox="0 0 480 320" role="img" aria-labelledby={`diagram-${slug}-title diagram-${slug}-desc`}>
      <title id={`diagram-${slug}-title`}>{title}</title><desc id={`diagram-${slug}-desc`}>{desc}</desc>
      {kind !== 'circle' && axes}
      {kind === 'parabola' && <>{plot((x) => x*x-1, '#5b21b6', -2, 2)}<circle cx={X(0)} cy={Y(-1)} r="5" fill="#c2410c" /><text x="260" y="310">(0, −1)</text><text x={X(-1)-10} y="260">−1</text><text x={X(1)} y="260">1</text><text x="52" y="65">Azalan</text><text x="350" y="65">Artan</text><text x="190" y="62">y = x² − 1</text></>}
      {kind === 'circle' && <g><path d="M65 160H415 M240 290V25" stroke="#64748b" /><circle cx="240" cy="160" r="115" fill="none" stroke="#5b21b6" strokeWidth="3" /><path d="M240 160L297.5 60.41 M297.5 60.41V160" stroke="#c2410c" strokeWidth="3" fill="none" /><path d="M240 160H297.5" stroke="#0369a1" strokeWidth="4" /><path d="M272 160A32 32 0 0 0 256 132.29" stroke="#64748b" fill="none" /><circle cx="297.5" cy="60.41" r="5" fill="#c2410c" /><text x="303" y="49">P</text><text x="304" y="112">sin θ = √3/2</text><text x="250" y="186">cos θ = 1/2</text><text x="276" y="143">θ</text><text x="358" y="180">1</text><text x="420" y="164">x</text><text x="249" y="25">y</text><text x="35" y="310">θ = π/3 radyan = 60°</text></g>}
      {kind === 'jump' && <><path d={`M50 ${Y(-1)}H240 M240 ${Y(1)}H435`} stroke="#5b21b6" strokeWidth="3" fill="none" /><circle cx="240" cy={Y(-1)} r="6" fill="white" stroke="#5b21b6" strokeWidth="3" /><circle cx="240" cy={Y(1)} r="6" fill="white" stroke="#5b21b6" strokeWidth="3" /><circle cx="240" cy="240" r="5" fill="#c2410c" /><text x="60" y="292">Sol limit: −1</text><text x="285" y="160">Sağ limit: 1</text><text x="270" y="270">f(0) = 0</text></>}
      {kind === 'corner' && <>{plot(Math.abs,'#5b21b6',-2.2,2.2)}<text x="45" y="70">Sol eğim: −1</text><text x="310" y="70">Sağ eğim: 1</text><text x="285" y="215">y = |x|</text></>}
      {kind === 'tangent' && <>{plot((x)=>x*x,'#5b21b6',-1.6,1.6)}{plot((x)=>2*x-1,'#c2410c',-.1,1.8)}<path d={`M${X(0)} ${Y(-1)}H${X(1)}V${Y(1)}`} stroke="#0369a1" strokeDasharray="5 4" fill="none" /><circle cx={X(1)} cy={Y(1)} r="5" fill="#c2410c" /><text x="333" y="170">(1, 1)</text><text x="255" y="296">Δx = 1</text><text x="330" y="239">Δy = 2</text><text x="48" y="60" fill="#5b21b6">y = x²</text><text x="282" y="50" fill="#c2410c">y = 2x − 1</text></>}
      {kind === 'family' && <>{plot((x)=>x*x-1,'#0369a1',-1.7,1.7)}{plot((x)=>x*x,'#5b21b6',-1.7,1.7)}{plot((x)=>x*x+1,'#c2410c',-1.55,1.55)}<text x="300" y="307" fill="#0369a1">C = −1</text><text x="335" y="238" fill="#5b21b6">C = 0</text><text x="355" y="170" fill="#c2410c">C = 1</text></>}
      {kind === 'area' && <><path d={`M${X(-1)} ${Y(-1)}V240H240Z`} fill="#fed7aa" /><path d={`M240 240H${X(1)}V${Y(1)}Z`} fill="#bfdbfe" />{plot((x)=>x,'#5b21b6',-1,1)}<text x="145" y="278">−1/2</text><text x="285" y="224">+1/2</text><text x={X(-1)-10} y="230">−1</text><text x={X(1)} y="260">1</text><text x="300" y="150">y = x</text></>}
    </svg>
    <figcaption>{caption}</figcaption>
  </figure>;
}
