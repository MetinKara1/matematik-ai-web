import PublicHeader from '../../components/public/PublicHeader';
import ArticlesGrid from '../../components/public/ArticlesGrid';
import { derivativeArticles } from '../../lib/derivativeArticles';

export const metadata = {
  title: 'Matematik Makaleleri ve Çözümlü Örnekler',
  description: 'Matematik konularını anlaşılır anlatımlar, pratik yöntemler ve adım adım çözümlü örneklerle öğrenin.',
  alternates: { canonical: '/makaleler' },
  keywords: ['matematik makaleleri', 'AYT matematik konu anlatımı', 'integral konu anlatımı', 'türev konu anlatımı', 'çözümlü matematik örnekleri'],
  openGraph: {
    title: 'Matematik Makaleleri ve Çözümlü Örnekler | MatAI',
    description: 'Matematik konularını anlaşılır anlatımlar ve adım adım çözümlü örneklerle öğrenin.',
    type: 'website', locale: 'tr_TR', siteName: 'MatAI', url: '/makaleler',
    images: [{ url: '/assets/og/turev-konu-anlatimi.jpg', width: 1200, height: 630, alt: 'MatAI türev ve integral matematik makaleleri' }],
  },
  twitter: { card: 'summary_large_image', title: 'Matematik Makaleleri ve Çözümlü Örnekler | MatAI', description: 'Matematik konularını anlaşılır anlatımlar ve çözümlü örneklerle öğrenin.', images: ['/assets/og/turev-konu-anlatimi.jpg'] },
};

export default function ArticlesPage() {
  const integralArticles = [
    { title: 'İntegral Sorusu Nasıl Çözülür?', slug: 'integral-sorusu-nasil-cozulur', description: 'Kısmi integrasyon yöntemini ve doğru yöntem seçimini adım adım öğrenin.', category: 'İntegral', readingTime: 8, symbol: '∫', formula: 'u · dv' },
    { title: 'Belirsiz İntegral Nedir?', slug: 'belirsiz-integral-nedir', description: 'Belirsiz integralin mantığını, C sabitini ve temel kuralları öğrenin.', category: 'İntegral', readingTime: 7, symbol: '∫', formula: 'F(x) + C' },
    { title: 'İntegralde Değişken Değiştirme', slug: 'integralde-degisken-degistirme', description: 'Karmaşık integralleri u dönüşümüyle sadeleştirmeyi örneklerle öğrenin.', category: 'İntegral', readingTime: 8, symbol: 'u', formula: 'du = g′(x)dx' },
    { title: 'Belirli İntegral Nedir?', slug: 'belirli-integral-nedir', description: 'Alt ve üst sınırları, temel teoremi ve belirli integral özelliklerini öğrenin.', category: 'İntegral', readingTime: 8, symbol: '∫', formula: 'F(b) − F(a)' },
    { title: 'İntegral ile Alan Hesabı', slug: 'integral-ile-alan-hesabi', description: 'Eğri ile eksen ve iki eğri arasında kalan alanı hesaplayın.', category: 'İntegral', readingTime: 9, symbol: '∫', formula: 'üst − alt' },
  ];
  const articles = [
    ...derivativeArticles.map(({ title, slug, description, readingTime, symbol, formula }) => ({ title, slug, description, readingTime, symbol, formula, category: 'Türev' })),
    ...integralArticles,
  ];
  const pageUrl = 'https://matematik-ai.com/makaleler';
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: metadata.title, description: metadata.description, inLanguage: 'tr-TR', isPartOf: { '@id': 'https://matematik-ai.com/#website' } },
    { '@type': 'ItemList', '@id': `${pageUrl}#articles`, itemListElement: articles.map(({ title, slug }, index) => ({ '@type': 'ListItem', position: index + 1, name: title, url: `${pageUrl}/${slug}` })) },
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

          <ArticlesGrid articles={articles} />
          <noscript>
            <div className="articles-noscript"><h2>Tüm makaleler</h2><ul>{articles.map(({ title, slug }) => <li key={slug}><a href={`/makaleler/${slug}`}>{title}</a></li>)}</ul></div>
          </noscript>
        </section>
      </main>
    </div>
  );
}
