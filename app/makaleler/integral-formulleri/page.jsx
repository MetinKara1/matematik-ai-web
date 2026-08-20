import Link from 'next/link';
import IntegralTopicArticle from '../../../components/public/IntegralTopicArticle';

const title = 'İntegral Formülleri: AYT İçin Formül Tablosu ve Örnekler';
const description = 'Temel, üstel, logaritmik ve trigonometrik integral formüllerini kullanım koşulları ve kısa çözümlü örneklerle tek tabloda inceleyin.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/makaleler/integral-formulleri' },
  keywords: ['integral formülleri', 'integral formülleri tablosu', 'temel integral formülleri', 'AYT integral formülleri', 'trigonometrik integral formülleri'],
  openGraph: {
    title, description, type: 'article', locale: 'tr_TR', siteName: 'MatAI', url: '/makaleler/integral-formulleri',
    images: [{ url: '/assets/articles/integral-alan.jpg', width: 1536, height: 1024, alt: 'İntegral formülleri tablosu ve çözümlü örnekler' }],
    publishedTime: '2026-08-20T00:00:00+03:00', modifiedTime: '2026-08-20T00:00:00+03:00', authors: ['MatAI'],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/assets/articles/integral-alan.jpg'] },
};

const faq = [
  ['İntegral formülleri nasıl daha kolay öğrenilir?', 'Her formülü karşılık gelen türev formülüyle eşleştirin ve küçük örneklerde uygulayın. Formülü yalnız okumak yerine sonucunun türevini almak, işaret ve katsayıları kalıcı hâle getirir.'],
  ['AYT için hangi integral formülleri bilinmeli?', 'Kuvvet, 1/x, üstel, temel trigonometrik integraller ile toplam, sabit katsayı ve belirli integral özellikleri temel düzeyde bilinmelidir. Sorunun yapısına göre değişken değiştirme ve kısmi integrasyon da gerekir.'],
  ['İçinde ax+b olan integral formülleri nasıl uygulanır?', 'İç fonksiyon doğrusal olduğunda temel formül uygulanır ve sonuç x’in katsayısı olan a’ya bölünür. Bu işlem zincir kuralından gelen katsayıyı dengeler.'],
  ['İntegral formülünün doğru olduğu nasıl kontrol edilir?', 'Bulduğunuz ilkel fonksiyonun türevini alın. Türev, integral işaretinin içindeki başlangıç fonksiyonunu veriyorsa sonuç doğrudur.'],
];

const article = {
  slug: 'integral-formulleri', title, shortTitle: 'İntegral Formülleri', description,
  summary: 'İntegral formülü seçerken önce fonksiyon türünü belirleyin, içerideki doğrusal ifadenin katsayısını dengeleyin ve sonucu türev alarak kontrol edin.',
  date: '2026-08-20', displayDate: '20 Ağustos 2026', datePublished: '2026-08-20T00:00:00+03:00', dateModified: '2026-08-20T00:00:00+03:00',
  readingTime: 13, level: 'Formül ve tekrar rehberi',
  keywords: ['integral formülleri', 'integral formülleri tablosu', 'temel integral formülleri', 'AYT integral formülleri', 'trigonometrik integral formülleri'],
  toc: [
    { id: 'kullanim', label: 'Tablo nasıl kullanılır?' }, { id: 'temel', label: 'Temel formüller' },
    { id: 'ustel-logaritmik', label: 'Üstel ve logaritmik' }, { id: 'trigonometrik', label: 'Trigonometrik formüller' },
    { id: 'dogrusal', label: 'ax+b kalıbı' }, { id: 'belirli', label: 'Belirli integral' },
    { id: 'secim', label: 'Formül seçme rehberi' }, { id: 'ozet', label: 'Kompakt özet' }, { id: 'sss', label: 'Sık sorulanlar' },
  ],
  intro: [
    'İntegral formülleri, türev tablosunun ters yönde okunmuş hâlidir. Ancak doğru formülü bilmek tek başına yeterli değildir; fonksiyonun biçimini tanımak, iç türevi dengelemek ve formülün kullanım koşulunu kontrol etmek gerekir.',
    'Bu sayfa hızlı tekrar için formülleri gruplar hâlinde toplar. Kuralların nedenlerini ve ayrıntılı işlem sırasını öğrenmek istiyorsanız önce integral alma kuralları anlatımını okuyabilirsiniz.',
  ],
  seriesLinks: [
    { slug: 'integral-alma-kurallari', title: 'İntegral Alma Kuralları' },
    { slug: 'belirsiz-integral-nedir', title: 'Belirsiz İntegral' },
    { slug: 'belirli-integral-nedir', title: 'Belirli İntegral' },
  ],
  related: { slug: 'integral-alma-kurallari', title: 'İntegral Alma Kuralları', text: 'Formüllerin mantığını ve uygulama adımlarını öğrenin' },
  faq,
};

export default function IntegralFormulasPage() {
  return <IntegralTopicArticle article={article}>
    <section id="kullanim">
      <h2>İntegral Formülleri Tablosu Nasıl Kullanılır?</h2>
      <p>Önce integrandın polinom, üstel, logaritmik veya trigonometrik hangi aileye ait olduğunu belirleyin. Ardından formüldeki x yerine sorudaki ifadenin doğrudan yazılıp yazılamayacağını kontrol edin. İçeride 3x+1 gibi bir ifade varsa onun türevinden gelen katsayı ayrıca dengelenmelidir.</p>
      <p>Belirsiz integralde sonuç bir ilkel fonksiyon ailesidir ve sonuna C eklenir. Belirli integralde ise alt ve üst sınırlar uygulandığı için sonuçta C bulunmaz. Temel mantığı pekiştirmek için <Link href="/makaleler/integral-alma-kurallari" className="article-inline-link">integral alma kuralları konu anlatımını</Link> kullanabilirsiniz.</p>
    </section>

    <section id="temel">
      <h2>Temel İntegral Formülleri</h2>
      <div className="article-math article-math-lines">
        <span>∫0 dx = C</span><span>∫k dx = kx + C</span>
        <span>∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ −1</span>
        <span>∫1/x dx = ln|x| + C</span>
        <span>∫[f(x) ± g(x)] dx = ∫f(x) dx ± ∫g(x) dx</span>
        <span>∫k·f(x) dx = k∫f(x) dx</span>
      </div>
      <p><strong>Kısa örnek:</strong> ∫(4x³ − 2/x) dx integralinde kuvvet ve 1/x formülleri birlikte kullanılır.</p>
      <div className="article-math">∫(4x³ − 2/x) dx = x⁴ − 2ln|x| + C</div>
      <p>Buradaki mutlak değer önemlidir; ln(x) yalnızca x &gt; 0 için tanımlıyken 1/x negatif x değerlerinde de vardır.</p>
    </section>

    <section id="ustel-logaritmik">
      <h2>Üstel ve Logaritmik İntegral Formülleri</h2>
      <div className="article-math article-math-lines">
        <span>∫eˣ dx = eˣ + C</span>
        <span>∫aˣ dx = aˣ/ln(a) + C, a &gt; 0 ve a ≠ 1</span>
        <span>∫ln(x) dx = xln(x) − x + C, x &gt; 0</span>
      </div>
      <p>eˣ kendi türevi olduğu için integralde değişmeden kalır. aˣ fonksiyonunda ise türevden gelen ln(a) katsayısını dengelemek için bölme yapılır.</p>
      <div className="article-math article-math-lines"><span>∫2ˣ dx = 2ˣ/ln(2) + C</span><span>Kontrol: d/dx [2ˣ/ln(2)] = 2ˣ</span></div>
      <p>ln(x) integrali temel tablodan doğrudan görünmüyorsa kısmi integrasyonla elde edilir. Bu yöntemi <Link href="/makaleler/integral-sorusu-nasil-cozulur" className="article-inline-link">integral sorusu çözüm rehberinde</Link> inceleyebilirsiniz.</p>
    </section>

    <section id="trigonometrik">
      <h2>Trigonometrik İntegral Formülleri</h2>
      <div className="article-math article-math-lines">
        <span>∫sin(x) dx = −cos(x) + C</span><span>∫cos(x) dx = sin(x) + C</span>
        <span>∫sec²(x) dx = tan(x) + C</span><span>∫csc²(x) dx = −cot(x) + C</span>
        <span>∫sec(x)tan(x) dx = sec(x) + C</span><span>∫csc(x)cot(x) dx = −csc(x) + C</span>
      </div>
      <p>Sinüs ve cosecant–cotangent formüllerindeki eksi işaretleri sık karıştırılır. Sonucun türevini zihinden kontrol etmek, işaret hatasını hızlıca yakalar.</p>
      <div className="article-math article-math-lines"><span>∫[2cos(x) − 3sec²(x)] dx</span><span>= 2sin(x) − 3tan(x) + C</span></div>
      <p>sin²(x), cos²(x) veya trigonometrik fonksiyonların daha yüksek kuvvetleri bu temel tabloya doğrudan uymaz; özdeşlik veya farklı bir dönüşüm gerekebilir.</p>
    </section>

    <section id="dogrusal">
      <h2>İçinde ax+b Bulunan İntegral Formülleri</h2>
      <p>u = ax+b ifadesinin türevi a&apos;dır. Bu nedenle aşağıdaki kalıplarda sonuç a&apos;ya bölünür. Burada a ≠ 0 olmalıdır.</p>
      <div className="article-math article-math-lines">
        <span>∫(ax+b)ⁿ dx = (ax+b)ⁿ⁺¹/[a(n+1)] + C, n ≠ −1</span>
        <span>∫1/(ax+b) dx = ln|ax+b|/a + C</span>
        <span>∫eᵃˣ⁺ᵇ dx = eᵃˣ⁺ᵇ/a + C</span>
        <span>∫sin(ax+b) dx = −cos(ax+b)/a + C</span>
        <span>∫cos(ax+b) dx = sin(ax+b)/a + C</span>
      </div>
      <p><strong>Örnek:</strong> ∫(5x−2)³ dx = (5x−2)⁴/20 + C. Sonucun türevinde 4 ve 5 katsayıları oluşur; paydadaki 20 bu katsayıları dengeler.</p>
      <p>İç fonksiyon doğrusal değilse yalnızca katsayıya bölme kuralı yeterli olmaz. İç fonksiyonun türevi integrandda bulunuyorsa <Link href="/makaleler/integralde-degisken-degistirme" className="article-inline-link">u dönüşümü</Link> düşünülmelidir.</p>
    </section>

    <section id="belirli">
      <h2>Belirli İntegral Formülleri ve Özellikleri</h2>
      <p>F&apos;(x) = f(x) olduğunda integralin temel teoremi, [a,b] aralığındaki belirli integrali F(b)−F(a) ile hesaplamamızı sağlar.</p>
      <div className="article-math article-math-lines">
        <span>∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)</span>
        <span>∫<sub>a</sub><sup>a</sup> f(x) dx = 0</span>
        <span>∫<sub>a</sub><sup>b</sup> f(x) dx = −∫<sub>b</sub><sup>a</sup> f(x) dx</span>
        <span>∫<sub>a</sub><sup>b</sup> f(x) dx + ∫<sub>b</sub><sup>c</sup> f(x) dx = ∫<sub>a</sub><sup>c</sup> f(x) dx</span>
      </div>
      <p><strong>Kısa örnek:</strong> ∫<sub>0</sub><sup>2</sup> 3x² dx = [x³]<sub>0</sub><sup>2</sup> = 8. Belirli integral işaretli birikimi verir; geometrik alan sorularında negatif bölgelerin ayrıca ele alınması gerekebilir.</p>
      <p>Sınırların anlamı ve alan ayrımı için <Link href="/makaleler/belirli-integral-nedir" className="article-inline-link">belirli integral özelliklerini</Link> ayrıntılı okuyabilirsiniz.</p>
    </section>

    <section id="secim">
      <h2>Hangi İntegral Formülü Seçilmeli?</h2>
      <ul>
        <li><strong>Polinom veya köklü ifade:</strong> Kökleri üslü yazın ve kuvvet formülünü deneyin.</li>
        <li><strong>Paydada yalnız x:</strong> 1/x kalıbını ve ln|x| sonucunu kontrol edin.</li>
        <li><strong>Üstel fonksiyon:</strong> Taban e ise aynı kalır; başka bir tabanda ln(a)&apos;ya bölünür.</li>
        <li><strong>Temel trigonometrik fonksiyon:</strong> Karşılık gelen türev–integral çiftini kullanın.</li>
        <li><strong>İçeride ax+b:</strong> Temel sonucu a&apos;ya bölerek iç türevi dengeleyin.</li>
        <li><strong>Bileşke fonksiyon ve iç türevi:</strong> Değişken değiştirmeyi değerlendirin.</li>
        <li><strong>İki farklı fonksiyonun çarpımı:</strong> Kısmi integrasyon gerekebilir.</li>
      </ul>
      <p>Genel bir kontrol olarak sonucun türevini alın. Başlangıçtaki ifade geri gelmiyorsa genellikle işaret, sabit katsayı veya iç türev eksiktir.</p>
    </section>

    <section id="ozet">
      <h2>İntegral Formülleri Kompakt Özet</h2>
      <div className="article-answer"><span>Hızlı tekrar</span><p>Kuvvette üssü artır ve yeni üsse böl; 1/x için ln|x| yaz; eˣ aynı kalır; aˣ için ln(a)&apos;ya böl; sinüsün integralinde eksi kosinüsü, kosinüsün integralinde sinüsü kullan; ax+b kalıbında sonucu a&apos;ya böl; belirsiz integralde C ekle ve her sonucu türevle kontrol et.</p></div>
    </section>

    <section id="sss">
      <h2>İntegral Formülleri Hakkında Sık Sorulanlar</h2>
      {faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
    </section>
  </IntegralTopicArticle>;
}
