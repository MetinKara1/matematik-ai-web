import Link from 'next/link';
import PublicHeader from '../../components/public/PublicHeader';

export const metadata = {
  title: 'Matematik Makaleleri ve Çözümlü Örnekler',
  description: 'Matematik konularını anlaşılır anlatımlar, pratik yöntemler ve adım adım çözümlü örneklerle öğrenin.',
  alternates: { canonical: '/makaleler' },
  keywords: ['matematik makaleleri', 'AYT matematik konu anlatımı', 'integral konu anlatımı', 'çözümlü matematik örnekleri'],
  openGraph: {
    title: 'Matematik Makaleleri ve Çözümlü Örnekler | MatAI',
    description: 'Matematik konularını anlaşılır anlatımlar ve adım adım çözümlü örneklerle öğrenin.',
    type: 'website', locale: 'tr_TR', siteName: 'MatAI', url: '/makaleler',
    images: [{ url: '/assets/og/integral-sorusu-nasil-cozulur.png', width: 1200, height: 630, alt: 'MatAI matematik makaleleri' }],
  },
  twitter: { card: 'summary_large_image', title: 'Matematik Makaleleri ve Çözümlü Örnekler | MatAI', description: 'Matematik konularını anlaşılır anlatımlar ve çözümlü örneklerle öğrenin.', images: ['/assets/og/integral-sorusu-nasil-cozulur.png'] },
};

export default function ArticlesPage() {
  const articles = [
    ['İntegral Sorusu Nasıl Çözülür?', 'integral-sorusu-nasil-cozulur'],
    ['Belirsiz İntegral Nedir?', 'belirsiz-integral-nedir'],
    ['İntegralde Değişken Değiştirme', 'integralde-degisken-degistirme'],
    ['Belirli İntegral Nedir?', 'belirli-integral-nedir'],
    ['İntegral ile Alan Hesabı', 'integral-ile-alan-hesabi'],
  ];
  const pageUrl = 'https://matematik-ai.com/makaleler';
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: metadata.title, description: metadata.description, inLanguage: 'tr-TR', isPartOf: { '@id': 'https://matematik-ai.com/#website' } },
    { '@type': 'ItemList', '@id': `${pageUrl}#articles`, itemListElement: articles.map(([name, slug], index) => ({ '@type': 'ListItem', position: index + 1, name, url: `${pageUrl}/${slug}` })) },
    { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://matematik-ai.com' }, { '@type': 'ListItem', position: 2, name: 'Makaleler', item: pageUrl }] },
  ] };
  return (
    <div className="articles-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <PublicHeader />

      <main className="articles-main">
        <header className="articles-hero">
          <span className="articles-eyebrow">MatAI Kütüphane</span>
          <h1>Matematiği ezberlemeden, mantığıyla öğrenin.</h1>
          <p>Kısa anlatımlar, çözümlü örnekler ve sınavda işinize yarayacak pratik yöntemler.</p>
        </header>

        <section className="articles-list" aria-labelledby="articles-title">
          <div className="articles-list-heading">
            <div>
              <span>Güncel içerikler</span>
              <h2 id="articles-title">Makaleler</h2>
            </div>
            <p>Yeni anlatımlar düzenli olarak eklenecek.</p>
          </div>

          <Link href="/makaleler/integral-sorusu-nasil-cozulur" className="article-list-card">
            <div className="article-list-visual" aria-hidden="true">
              <span>∫</span>
              <small>u · dv</small>
            </div>
            <div className="article-list-copy">
              <div className="article-list-meta">
                <span>İntegral</span>
                <span>8 dakika</span>
                <span>AYT Matematik</span>
              </div>
              <h3>İntegral Sorusu Nasıl Çözülür?</h3>
              <p>Kısmi integrasyon yöntemini ne zaman kullanacağınızı, doğru seçimi nasıl yapacağınızı ve sonucu nasıl kontrol edeceğinizi adım adım öğrenin.</p>
              <strong>Yazıyı oku <span aria-hidden="true">→</span></strong>
            </div>
          </Link>

          <Link href="/makaleler/belirsiz-integral-nedir" className="article-list-card">
            <div className="article-list-visual article-list-visual-secondary" aria-hidden="true">
              <span>∫</span><small>F(x) + C</small>
            </div>
            <div className="article-list-copy">
              <div className="article-list-meta"><span>İntegral</span><span>7 dakika</span><span>AYT Matematik</span></div>
              <h3>Belirsiz İntegral Nedir?</h3>
              <p>Belirsiz integralin mantığını, C sabitinin neden kullanıldığını ve temel integral kurallarını çözümlü örneklerle öğrenin.</p>
              <strong>Yazıyı oku <span aria-hidden="true">→</span></strong>
            </div>
          </Link>

          <Link href="/makaleler/integralde-degisken-degistirme" className="article-list-card">
            <div className="article-list-visual" aria-hidden="true"><span>u</span><small>du = g&apos;(x) dx</small></div>
            <div className="article-list-copy"><div className="article-list-meta"><span>İntegral</span><span>8 dakika</span><span>AYT Matematik</span></div><h3>İntegralde Değişken Değiştirme</h3><p>Karmaşık integralleri u dönüşümüyle sadeleştirmeyi ve doğru değişkeni seçmeyi çözümlü örneklerle öğrenin.</p><strong>Yazıyı oku <span aria-hidden="true">→</span></strong></div>
          </Link>

          <Link href="/makaleler/belirli-integral-nedir" className="article-list-card">
            <div className="article-list-visual article-list-visual-secondary" aria-hidden="true"><span>∫</span><small>F(b) − F(a)</small></div>
            <div className="article-list-copy"><div className="article-list-meta"><span>İntegral</span><span>8 dakika</span><span>AYT Matematik</span></div><h3>Belirli İntegral Nedir?</h3><p>Alt ve üst sınırları, integralin temel teoremini ve belirli integral özelliklerini adım adım öğrenin.</p><strong>Yazıyı oku <span aria-hidden="true">→</span></strong></div>
          </Link>

          <Link href="/makaleler/integral-ile-alan-hesabi" className="article-list-card">
            <div className="article-list-visual" aria-hidden="true"><span>∫</span><small>üst − alt</small></div>
            <div className="article-list-copy"><div className="article-list-meta"><span>İntegral</span><span>9 dakika</span><span>AYT Matematik</span></div><h3>İntegral ile Alan Hesabı</h3><p>Eğri ile x ekseni ve iki eğri arasında kalan alanı doğru integral düzeniyle hesaplayın.</p><strong>Yazıyı oku <span aria-hidden="true">→</span></strong></div>
          </Link>
        </section>
      </main>
    </div>
  );
}
