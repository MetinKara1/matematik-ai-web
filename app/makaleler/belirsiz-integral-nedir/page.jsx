import Link from 'next/link';
import PublicHeader from '../../../components/public/PublicHeader';

const appStoreLink = 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761';

export const metadata = {
  title: 'Belirsiz İntegral Nedir? Kuralları ve Çözümlü Örnekler',
  description: 'Belirsiz integralin ne olduğunu, C sabitinin neden kullanıldığını ve temel integral kurallarını adım adım çözümlü örneklerle öğrenin.',
  alternates: { canonical: '/makaleler/belirsiz-integral-nedir' },
  openGraph: {
    title: 'Belirsiz İntegral Nedir? Kuralları ve Örnekler',
    description: 'Belirsiz integral konusunu temel kurallar ve çözümlü örneklerle öğrenin.',
    type: 'article', locale: 'tr_TR', url: '/makaleler/belirsiz-integral-nedir',
    images: [{ url: '/assets/og/integral-sorusu-nasil-cozulur.png', width: 1200, height: 630, alt: 'Belirsiz integral kuralları ve çözümlü örnekler' }],
    publishedTime: '2026-08-12T00:00:00+03:00',
    modifiedTime: '2026-08-12T00:00:00+03:00',
  },
  twitter: { card: 'summary_large_image', images: ['/assets/og/integral-sorusu-nasil-cozulur.png'] },
};

export default function IndefiniteIntegralArticlePage() {
  const articleUrl = 'https://matematik-ai.com/makaleler/belirsiz-integral-nedir';
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', '@id': `${articleUrl}#article`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
        headline: 'Belirsiz İntegral Nedir? Kuralları ve Çözümlü Örnekler',
        description: 'Belirsiz integralin tanımı, temel kuralları, C sabiti ve çözümlü örnekler.',
        datePublished: '2026-08-12T00:00:00+03:00', dateModified: '2026-08-12T00:00:00+03:00',
        inLanguage: 'tr-TR', articleSection: 'AYT Matematik',
        keywords: ['belirsiz integral nedir', 'belirsiz integral kuralları', 'integral sabiti C', 'integral örnekleri', 'AYT matematik'],
        publisher: { '@type': 'Organization', name: 'MatAI', url: 'https://matematik-ai.com', logo: { '@type': 'ImageObject', url: 'https://matematik-ai.com/assets/MatAI-logo.png' } },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${articleUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://matematik-ai.com' },
          { '@type': 'ListItem', position: 2, name: 'Makaleler', item: 'https://matematik-ai.com/makaleler' },
          { '@type': 'ListItem', position: 3, name: 'Belirsiz İntegral Nedir?', item: articleUrl },
        ],
      },
    ],
  };

  return (
    <div className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <PublicHeader />
      <main className="article-main">
        <article className="article-card">
          <header className="article-heading">
            <nav className="article-breadcrumb" aria-label="Sayfa yolu">
              <Link href="/">Ana Sayfa</Link><span aria-hidden="true">›</span><Link href="/makaleler">Makaleler</Link><span aria-hidden="true">›</span><span>Belirsiz İntegral Nedir?</span>
            </nav>
            <span className="article-category">İntegral · AYT Matematik</span>
            <h1>Belirsiz İntegral Nedir? Kuralları ve Çözümlü Örnekler</h1>
            <p className="article-summary">Belirsiz integralin mantığını, temel kurallarını ve her sonucun yanına neden C sabiti yazdığımızı anlaşılır örneklerle inceleyelim.</p>
            <div className="article-meta" aria-label="Makale bilgileri"><time dateTime="2026-08-12">12 Ağustos 2026</time><span>7 dakika okuma</span><span>Temel konu anlatımı</span></div>
          </header>

          <div className="article-content">
            <nav className="article-toc" aria-label="İçindekiler">
              <span>Bu yazıda</span><a href="#tanim">Tanımı</a><a href="#c-sabiti">C sabiti</a><a href="#kurallar">Temel kurallar</a><a href="#ornekler">Çözümlü örnekler</a><a href="#hatalar">Sık hatalar</a>
            </nav>
            <div className="article-body">
              <div className="article-intro">
                <p>Belirsiz integral, türevi verilen bir fonksiyon olan bütün fonksiyonları bulma işlemidir. Başka bir ifadeyle türev almanın ters yönünde ilerleriz. Türevde bir fonksiyonun değişim hızını bulurken, integralde bu değişim hızından başlangıçtaki fonksiyon ailesine ulaşmaya çalışırız.</p>
                <p>Konuyu öğrenirken yalnızca formülleri ezberlemek yerine “hangi fonksiyonun türevi elimdeki ifadeyi verir?” sorusunu sormak, integral sorularını çok daha anlaşılır hale getirir.</p>
              </div>

              <section id="tanim"><h2>Belirsiz İntegralin Tanımı</h2><p>F&apos;(x) = f(x) eşitliğini sağlayan F fonksiyonuna, f fonksiyonunun bir ilkel fonksiyonu denir. f(x)&apos;in belirsiz integrali bütün bu ilkel fonksiyonları temsil eder.</p><div className="article-math">∫ f(x) dx = F(x) + C</div><p>Burada integral işareti işlemi, f(x) integrali alınan fonksiyonu, dx ise değişkenin x olduğunu gösterir.</p></section>

              <section id="c-sabiti"><h2>C Sabiti Neden Yazılır?</h2><p>Sabit sayıların türevi sıfırdır. Bu nedenle birbirinden yalnızca sabit kadar farklı olan fonksiyonların türevleri aynıdır. Örneğin x², x² + 3 ve x² − 8 fonksiyonlarının türevi 2x&apos;tir.</p><div className="article-math article-math-lines"><span>∫ 2x dx = x² + C</span><span>d/dx [x² + C] = 2x</span></div><p><strong>C, bütün olası sabitleri temsil eder.</strong> Belirsiz integral sorularında C yazılmadığında sonuç yalnızca tek bir ilkel fonksiyonu göstermiş olur ve eksik kalır.</p></section>

              <section id="kurallar"><h2>Temel Belirsiz İntegral Kuralları</h2><p>En sık kullanılan kural kuvvet kuralıdır. Üs bir artırılır ve elde edilen yeni üsse bölünür.</p><div className="article-math">∫ x<sup>n</sup> dx = x<sup>n+1</sup> / (n+1) + C &nbsp; (n ≠ −1)</div><p>Sabit katsayı integralin dışına alınabilir; toplam ve fark ifadelerinin integralleri ise ayrı ayrı hesaplanabilir.</p><div className="article-math article-math-lines"><span>∫ k·f(x) dx = k·∫ f(x) dx</span><span>∫ [f(x) ± g(x)] dx = ∫ f(x) dx ± ∫ g(x) dx</span></div></section>

              <section id="ornekler"><h2>Adım Adım Çözümlü Örnekler</h2><p><strong>Örnek 1:</strong> ∫ 3x² dx integralini bulalım. x²&apos;nin üssünü bir artırıp yeni üs olan 3&apos;e böleriz. Baştaki 3 katsayısı sadeleşir.</p><div className="article-math">∫ 3x² dx = 3 · x³/3 + C = x³ + C</div><p><strong>Örnek 2:</strong> ∫ (2x + 4) dx ifadesinde terimleri ayrı ayrı ele alırız.</p><div className="article-math">∫ (2x + 4) dx = x² + 4x + C</div><p>Sonucu kontrol etmek için türevini alabiliriz: x² + 4x + C fonksiyonunun türevi 2x + 4 olduğundan çözüm doğrudur.</p></section>

              <section id="hatalar"><h2>Sık Yapılan Hatalar</h2><p>En sık yapılan hata, kuvvet kuralında üssü artırdıktan sonra yeni üsse bölmeyi unutmaktır. Bir diğer hata ise bütün terimler için ayrı ayrı C yazmaktır. Toplamın sonunda tek bir C sabiti yazmak yeterlidir.</p><p>x<sup>−1</sup> için kuvvet kuralı kullanılamaz. Bu özel durumda sonuç doğal logaritmadır:</p><div className="article-math">∫ 1/x dx = ln|x| + C</div></section>

              <section><h2>Bir Sonraki Adım: İntegral Yöntemleri</h2><p>Temel kurallarla doğrudan çözülemeyen sorularda farklı yöntemler gerekir. İki fonksiyon çarpım halindeyse <Link href="/makaleler/integral-sorusu-nasil-cozulur" className="article-inline-link">kısmi integrasyonla çözülen örneğimizi</Link> inceleyebilirsiniz.</p><p>Sorunun hangi yöntemle çözüleceğinden emin değilseniz <Link href="/yapay-zeka-matematik-cozucu" className="article-inline-link">MatAI yapay zekâ matematik çözücü</Link> ile çözüm adımlarını inceleyebilirsiniz.</p></section>

              <aside className="article-cta"><div className="article-cta-copy"><h2>Benzer bir soruya mı takıldınız?</h2><p>Sorunun fotoğrafını çekin veya metin olarak yazın; çözüm yolunu MatAI ile adım adım inceleyin.</p><a href={appStoreLink} target="_blank" rel="noopener noreferrer">App Store&apos;dan indirin</a></div></aside>
              <div className="article-related"><span>İlgili yazı</span><Link href="/makaleler/integral-sorusu-nasil-cozulur"><strong>İntegral Sorusu Nasıl Çözülür?</strong><small>Kısmi integrasyonu adım adım öğrenin →</small></Link></div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
