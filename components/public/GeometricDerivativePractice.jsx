import Link from 'next/link';
import DerivativeMiniQuiz from './DerivativeMiniQuiz';
import TangentExplorer from './TangentExplorer';

const examples = [
  { title: '1. Bir noktadaki eğim', question: 'f(x) = x² için x = 3 noktasındaki teğetin eğimi nedir?', steps: ['Eğim, fonksiyonun o noktadaki türev değeridir; f(3) ile karıştırılmaz.', 'Kuvvet kuralıyla f′(x) = 2x bulunur.', 'x = 3 yazınca f′(3) = 6 olur.'], answer: 'Teğetin eğimi 6’dır. Noktanın yüksekliği olan f(3) = 9, eğim değildir.' },
  { title: '2. Teğetin denklemi', question: 'f(x) = x² eğrisinin x = −1 noktasındaki teğetini bulun.', steps: ['Nokta için f(−1) = 1 hesaplanır: (−1, 1).', 'Eğim için f′(−1) = 2 · (−1) = −2 bulunur.', 'Nokta-eğim formunda y − 1 = −2(x + 1) yazılır.'], answer: 'y = −2x − 1. Kontrol: x = −1 için y = 1; doğru teğme noktasından geçer.' },
  { title: '3. Verilen doğruya paralel teğet', question: 'f(x) = x² üzerinde y = 4x + 7 doğrusuna paralel teğet hangi noktadadır?', steps: ['Paralel doğruların eğimleri aynıdır. Verilen doğrunun eğimi 4’tür.', 'f′(a) = 4 koşulundan 2a = 4 ve a = 2 bulunur.', 'f(2) = 4 olduğundan teğme noktası (2, 4) olur.'], answer: 'Nokta (2, 4), teğet y = 4x − 4’tür. Paralel doğruların sabit terimleri aynı olmak zorunda değildir.' },
  { title: '4. Normal doğrusunun denklemi', question: 'f(x) = x² eğrisine (1, 1) noktasında çizilen normal doğrusunu bulun.', steps: ['Normal, teğete dik olan doğrudur. Önce teğetin eğimi bulunur: f′(1) = 2.', 'Dik doğrular için normal eğimi −1/2 olur.', 'Aynı noktadan geçtiği için y − 1 = −(1/2)(x − 1) yazılır.'], answer: 'y = −x/2 + 3/2. Eğimlerin çarpımı 2 · (−1/2) = −1’dir.' },
  { title: '5. Yatay teğet ve ekstremum ayrımı', question: 'f(x) = x³ eğrisinin x = 0 noktasında yatay teğeti vardır. Bu nokta maksimum veya minimum mudur?', steps: ['f′(x) = 3x² olduğundan f′(0) = 0: teğet yataydır.', 'Sıfırın hem solunda hem sağında f′(x) pozitiftir; fonksiyon artmayı sürdürür.', 'Türevin işareti değişmediği için burada yerel maksimum ya da minimum oluşmaz.'], answer: 'Teğet y = 0’dır; (0, 0) bir ekstremum değildir. Yatay teğet tek başına ekstremum kanıtı olmaz.' },
  { title: '6. Eğri dışındaki noktadan teğetler', question: 'f(x) = x² eğrisine (0, −1) noktasından geçen teğetleri bulun.', steps: ['Bilinmeyen teğme noktası (a, a²), eğim 2a’dır.', 'Genel teğet denklemi y − a² = 2a(x − a), yani y = 2ax − a² olur.', 'Doğru (0, −1) noktasından geçmeli: −1 = −a². Buradan a = 1 veya a = −1 bulunur.', 'Her a değerini genel teğet denklemine ayrı ayrı yerleştirin.'], answer: 'İki teğet vardır: y = 2x − 1 ve y = −2x − 1. Teğme noktaları (1, 1) ve (−1, 1)’dir.' },
];
const exercises = [
  ['f(x) = x² için x = 2 noktasındaki normal doğrusunun eğimi nedir?', 'f′(2) = 4. Normalin eğimi −1/4’tür.'],
  ['f(x) = x² + 1 eğrisinin x = 1 noktasındaki teğetini bulun.', 'Nokta (1, 2), eğim 2. y − 2 = 2(x − 1), yani y = 2x.'],
  ['f(x) = x³ − 3x için yatay teğetlerin x koordinatları nedir?', 'f′(x) = 3x² − 3 = 0 ⇒ x = −1 veya x = 1. Teğet doğruları sırasıyla y = 2 ve y = −2’dir.'],
];
export const geometricPracticeToc = [
  { id: 'turev-mini-test', label: '8 soruluk mini test' },
  { id: 'etkilesimli-teget', label: 'Etkileşimli teğet grafiği' },
  { id: 'cozumlu-sorular', label: 'Kolaydan zora 6 soru' },
  { id: 'yaygin-hatalar', label: 'Sık yapılan 3 hata' },
  { id: 'kendini-dene', label: 'Kendinizi deneyin' },
];
export default function GeometricDerivativePractice() {
  return <>
    <section id="etkilesimli-teget"><h2>Teğet eğimini grafikte keşfedin</h2><TangentExplorer /></section>
    <section id="cozumlu-sorular"><h2>Türevin geometrik yorumu: kolaydan zora 6 çözümlü soru</h2><p>Her soruda önce teğme noktasını ve eğimi ayırın. Gerekirse <Link href="/makaleler/turev-alma-kurallari">türev alma kurallarını</Link> tekrar edin.</p>
      {examples.map(example => <div className="geometry-example" key={example.title}><h3>{example.title}</h3><p><strong>Soru:</strong> {example.question}</p><ol>{example.steps.map(step => <li key={step}>{step}</li>)}</ol><p className="geometry-answer"><strong>Sonuç ve kontrol:</strong> {example.answer}</p></div>)}
    </section>
    <section id="yaygin-hatalar"><h2>Türevin geometrik yorumunda sık yapılan 3 hata</h2>
      <h3>1. f(a) ile f′(a) değerini karıştırmak</h3><p>f(a), noktanın y koordinatıdır; f′(a), teğetin eğimidir. f(x) = x² ve a = 2 için yükseklik 4, eğim 4 olur; bu eşitlik tesadüftür. a = 3 seçilirse yükseklik 9, eğim 6’dır.</p>
      <h3>2. Normal eğimini her durumda −1/m yazmak</h3><p>Bu formül teğet eğimi sıfırdan farklı olduğunda kullanılır. Yatay teğetin normali düşeydir: x = a. Düşey doğrunun eğimi tanımlı değildir; sıfıra bölmeyin.</p>
      <h3>3. f′(a) = 0 ise mutlaka ekstremum vardır sanmak</h3><p>Sıfır türev yalnızca yatay teğeti gösterir. <Link href="/makaleler/artan-azalan-fonksiyonlar">Türevin işaretini noktanın iki yanında inceleyin</Link>. +’dan −’ye geçiş yerel maksimum, −’den +’ya geçiş yerel minimum verir. Ayrıntılar için <Link href="/makaleler/turevde-maksimum-minimum">maksimum ve minimum örneklerine</Link> bakın.</p>
    </section>
    <section id="kendini-dene"><h2>Kendinizi deneyin: 3 kısa alıştırma</h2><p>Önce kendiniz çözün, ardından cevabı açarak karşılaştırın.</p>{exercises.map(([question, answer], index) => <div className="geometry-exercise" key={question}><h3>Alıştırma {index + 1}</h3><p>{question}</p><details><summary>Cevabı ve çözüm yolunu göster</summary><p>{answer}</p></details></div>)}</section>
    <DerivativeMiniQuiz />
  </>;
}
