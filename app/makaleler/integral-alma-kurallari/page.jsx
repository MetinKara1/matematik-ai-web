import Link from 'next/link';
import IntegralTopicArticle from '../../../components/public/IntegralTopicArticle';

const title = 'İntegral Alma Kuralları: Formüller ve Çözümlü Örnekler';
const description = 'İntegral alma kurallarını, temel integral formüllerini ve hangi yöntemin ne zaman kullanılacağını adım adım çözümlü örneklerle öğrenin.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/makaleler/integral-alma-kurallari' },
  keywords: ['integral alma kuralları', 'integral kuralları', 'temel integral formülleri', 'integral nasıl alınır', 'AYT integral'],
  openGraph: {
    title, description, type: 'article', locale: 'tr_TR', siteName: 'MatAI',
    url: '/makaleler/integral-alma-kurallari',
    images: [{ url: '/assets/articles/integral-alan.jpg', width: 1536, height: 1024, alt: 'İntegral alma kuralları ve çözümlü örnekler' }],
    publishedTime: '2026-08-20T00:00:00+03:00', modifiedTime: '2026-08-20T00:00:00+03:00', authors: ['MatAI'],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/assets/articles/integral-alan.jpg'] },
};

const faq = [
  ['İntegral alırken üs neden bir artırılır?', 'Kuvvet kuralı, türevdeki kuvvet kuralının tersidir. x üzeri n+1 ifadesinin türevi (n+1)x üzeri n olduğu için katsayıyı dengelemek amacıyla n+1’e böleriz.'],
  ['İntegralde C sabiti ne zaman yazılır?', 'Sınırları olmayan belirsiz integralin sonucuna C sabiti eklenir. Alt ve üst sınırı bulunan belirli integralin sonucu bir sayı olduğu için C yazılmaz.'],
  ['1/x fonksiyonunda kuvvet kuralı neden kullanılmaz?', 'Kuvvet kuralında n = -1 olursa paydada n+1 = 0 oluşur. Bu özel integralin sonucu ln|x| + C’dir.'],
  ['Her integral temel kurallarla çözülebilir mi?', 'Hayır. Önce sadeleştirme denenir; ardından ifadenin yapısına göre değişken değiştirme, kısmi integrasyon veya başka özel yöntemler gerekebilir.'],
];

const article = {
  slug: 'integral-alma-kurallari', title, shortTitle: 'İntegral Alma Kuralları', description,
  summary: 'İntegral alırken önce ifadeyi sadeleştirin, toplamı terimlerine ayırın ve her terime uygun temel formülü uygulayın; sonuç belirsiz integralse C sabitini ekleyin.',
  date: '2026-08-20', displayDate: '20 Ağustos 2026', datePublished: '2026-08-20T00:00:00+03:00', dateModified: '2026-08-20T00:00:00+03:00',
  readingTime: 12, level: 'Temel konu anlatımı',
  keywords: ['integral alma kuralları', 'integral kuralları', 'temel integral formülleri', 'integral nasıl alınır', 'AYT integral'],
  toc: [
    { id: 'mantik', label: 'İntegralin mantığı' }, { id: 'temel-kurallar', label: 'Temel kurallar' },
    { id: 'formuller', label: 'Temel formüller' }, { id: 'ornekler', label: 'Çözümlü örnekler' },
    { id: 'yontem-secimi', label: 'Yöntem seçimi' }, { id: 'hatalar', label: 'Sık hatalar' }, { id: 'sss', label: 'Sık sorulanlar' },
  ],
  intro: [
    'İntegral alma, bir fonksiyonun türevi bilinen ilkel fonksiyonunu bulma işlemidir. Kuralları ezberlemek başlangıçta işe yarasa da kalıcı öğrenme için her formülün türevle nasıl kontrol edildiğini görmek gerekir.',
    'Bu anlatımda önce doğrusal kuralları ve temel integral tablosunu kuracak, ardından polinom, köklü, üstel ve trigonometrik ifadelerde kuralları adım adım uygulayacağız.',
  ],
  seriesLinks: [
    { slug: 'integral-formulleri', title: 'İntegral Formülleri' },
    { slug: 'belirsiz-integral-nedir', title: 'Belirsiz İntegral' },
    { slug: 'integralde-degisken-degistirme', title: 'Değişken Değiştirme' },
    { slug: 'belirli-integral-nedir', title: 'Belirli İntegral' },
  ],
  related: { slug: 'integralde-degisken-degistirme', title: 'İntegralde Değişken Değiştirme', text: 'Temel kurallar yetmediğinde u dönüşümüne geçin' },
  faq,
};

export default function IntegralRulesPage() {
  return <IntegralTopicArticle article={article}>
    <section id="mantik">
      <h2>İntegral Almanın Mantığı</h2>
      <p>F&apos;(x) = f(x) ise ∫f(x) dx = F(x) + C&apos;dir. Başka bir deyişle integral sonucunu kontrol etmenin en güvenilir yolu türev almaktır. Bulduğunuz F(x) ifadesinin türevi başlangıçtaki fonksiyonu vermelidir.</p>
      <div className="article-math article-math-lines"><span>d/dx (x³/3) = x²</span><span>Bu nedenle ∫x² dx = x³/3 + C</span></div>
      <p>C sabiti, türevi sıfır olan bütün sabitleri temsil eder. Bu konuya ilk kez başlıyorsanız <Link href="/makaleler/belirsiz-integral-nedir" className="article-inline-link">belirsiz integralin anlamını ve C sabitini</Link> ayrıca inceleyebilirsiniz.</p>
    </section>

    <section id="temel-kurallar">
      <h2>İntegral Alma Kuralları</h2>
      <h3>Sabit katsayı kuralı</h3>
      <p>Sabit bir sayı integral işaretinin dışına alınabilir. Değişkene bağlı bir ifade ise sabit gibi dışarı çıkarılamaz.</p>
      <div className="article-math">∫ k·f(x) dx = k·∫ f(x) dx</div>
      <h3>Toplama ve çıkarma kuralı</h3>
      <p>Toplam veya fark biçimindeki bir integral terimlerine ayrılabilir. Bu işlem, uzun polinomları yönetmeyi kolaylaştırır.</p>
      <div className="article-math">∫ [f(x) ± g(x)] dx = ∫f(x) dx ± ∫g(x) dx</div>
      <h3>Kuvvet kuralı</h3>
      <p>n ≠ −1 olmak üzere x&apos;in üssü bir artırılır ve yeni üssüne bölünür.</p>
      <div className="article-math">∫xⁿ dx = xⁿ⁺¹/(n+1) + C &nbsp; (n ≠ −1)</div>
      <p>n = −1 özel durumdur: ∫1/x dx = ln|x| + C. Kuvvet kuralında n = −1 yazmak sıfıra bölmeye yol açacağı için kullanılamaz.</p>
    </section>

    <section id="formuller">
      <h2>Temel İntegral Formülleri</h2>
      <p>Aşağıdaki sonuçları sadece tablo olarak ezberlemek yerine sağ tarafın türevini alarak doğrulayın.</p>
      <div className="article-math article-math-lines">
        <span>∫k dx = kx + C</span><span>∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ −1</span>
        <span>∫1/x dx = ln|x| + C</span><span>∫eˣ dx = eˣ + C</span>
        <span>∫aˣ dx = aˣ/ln(a) + C, a &gt; 0 ve a ≠ 1</span>
        <span>∫sin(x) dx = −cos(x) + C</span><span>∫cos(x) dx = sin(x) + C</span>
        <span>∫sec²(x) dx = tan(x) + C</span><span>∫csc²(x) dx = −cot(x) + C</span>
      </div>
      <p>İçeride ax+b gibi doğrusal bir ifade varsa, iç fonksiyonun türevini dengelemek için sonuç a&apos;ya bölünür: ∫cos(ax+b) dx = sin(ax+b)/a + C.</p>
    </section>

    <section id="ornekler">
      <h2>Adım Adım Çözümlü İntegral Örnekleri</h2>
      <h3>Örnek 1: Polinom integrali</h3>
      <p>∫(3x² − 4x + 5) dx integralinde terimleri ayırıp her kuvvete ayrı ayrı kural uygularız.</p>
      <div className="article-math article-math-lines"><span>∫3x² dx − ∫4x dx + ∫5 dx</span><span>= x³ − 2x² + 5x + C</span></div>
      <p>Kontrol: Sonucun türevi 3x² − 4x + 5&apos;tir.</p>

      <h3>Örnek 2: Kök ve negatif üs</h3>
      <p>√x = x¹⁄² ve 1/x² = x⁻² yazarak kuvvet kuralını görünür hâle getiririz.</p>
      <div className="article-math article-math-lines"><span>∫(√x + 2/x²) dx = ∫(x¹⁄² + 2x⁻²) dx</span><span>= (2/3)x³⁄² − 2/x + C</span></div>

      <h3>Örnek 3: Üstel fonksiyon</h3>
      <p>e üzeri doğrusal bir ifade varsa iç türevi dengelemek gerekir.</p>
      <div className="article-math article-math-lines"><span>∫4e²ˣ dx = 4 · e²ˣ/2</span><span>= 2e²ˣ + C</span></div>

      <h3>Örnek 4: Trigonometrik fonksiyon</h3>
      <p>Sinüsün integralindeki eksi işaretini ve 3x&apos;in türevinden gelen 3 katsayısını birlikte dikkate alırız.</p>
      <div className="article-math">∫sin(3x) dx = −cos(3x)/3 + C</div>
    </section>

    <section id="yontem-secimi">
      <h2>Hangi İntegral Yöntemi Seçilmeli?</h2>
      <p>Her integral doğrudan temel formül tablosuna uymaz. İşleme başlamadan önce şu sırayı izlemek yöntem seçimini kolaylaştırır:</p>
      <ol>
        <li><strong>Sadeleştirin:</strong> Parantezleri açın, kesri ayırın ve kökleri üslü biçimde yazın.</li>
        <li><strong>Temel formülü arayın:</strong> Polinom, 1/x, üstel veya temel trigonometrik yapı var mı?</li>
        <li><strong>İç fonksiyonu kontrol edin:</strong> Bir bileşke fonksiyon ve onun türevi birlikteyse <Link href="/makaleler/integralde-degisken-degistirme" className="article-inline-link">değişken değiştirme yöntemi</Link> uygun olabilir.</li>
        <li><strong>Çarpımı inceleyin:</strong> İki farklı tür fonksiyon çarpılıyorsa <Link href="/makaleler/integral-sorusu-nasil-cozulur" className="article-inline-link">kısmi integrasyon</Link> gerekebilir.</li>
        <li><strong>Türevle kontrol edin:</strong> Bulduğunuz sonucun türevi integrandın aynısı mı?</li>
      </ol>
    </section>

    <section id="hatalar">
      <h2>İntegral Alırken Sık Yapılan Hatalar</h2>
      <p><strong>C sabitini unutmak:</strong> Belirsiz integralin sonunda C bulunmalıdır. <strong>Üssü artırıp bölmemek:</strong> xⁿ integralinde hem üs artırılır hem yeni üssüne bölünür. <strong>1/x&apos;e kuvvet kuralı uygulamak:</strong> Bu ifadenin sonucu ln|x| + C&apos;dir. <strong>İç türevi görmezden gelmek:</strong> sin(3x) integralinde 1/3 katsayısı gerekir. <strong>Çarpımı ayrı ayrı integre etmek:</strong> Genel olarak ∫f(x)g(x) dx, integrallerin çarpımına eşit değildir.</p>
      <p>Alt ve üst sınır bulunan sorularda C yazılmaz ve ilkel fonksiyon değerleri F(b) − F(a) biçiminde hesaplanır. Ayrıntılar için <Link href="/makaleler/belirli-integral-nedir" className="article-inline-link">belirli integral konu anlatımına</Link> geçebilirsiniz.</p>
    </section>

    <section id="sss">
      <h2>İntegral Alma Kuralları Hakkında Sık Sorulanlar</h2>
      {faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
    </section>
  </IntegralTopicArticle>;
}
