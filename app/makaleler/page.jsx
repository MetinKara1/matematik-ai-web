import Link from 'next/link';
import TopicCards from '../../components/public/TopicCards';
import PublicFooter from '../../components/public/PublicFooter';
import { integralArticles } from '../../lib/integralArticleIndex';
import PublicHeader from '../../components/public/PublicHeader';
import ArticlesGrid from '../../components/public/ArticlesGrid';
import { derivativeArticles } from '../../lib/derivativeArticles';
import { foundationArticles } from '../../lib/foundationArticles';
import { topicalArticles } from '../../lib/topicalArticles';

export const metadata = {
  title: 'Matematik Makaleleri ve Çözümlü Örnekler',
  description: 'Matematik konularını anlaşılır anlatımlar, pratik yöntemler ve adım adım çözümlü örneklerle öğrenin.',
  alternates: { canonical: '/makaleler', languages: { tr: '/makaleler', en: '/en/articles', 'x-default': '/makaleler' } },
  keywords: ['matematik makaleleri', 'üniversite matematiğine hazırlık', 'fonksiyonlar', 'trigonometri', 'limit ve süreklilik', 'türev konu anlatımı', 'integral konu anlatımı', 'çözümlü matematik örnekleri'],
  openGraph: {
    title: 'Matematik Makaleleri ve Çözümlü Örnekler | MatAI',
    description: 'Matematik konularını anlaşılır anlatımlar ve adım adım çözümlü örneklerle öğrenin.',
    type: 'website', locale: 'tr_TR', siteName: 'MatAI', url: '/makaleler',
    images: [{ url: '/assets/og/turev-konu-anlatimi.jpg', width: 1200, height: 630, alt: 'MatAI türev ve integral matematik makaleleri' }],
  },
  twitter: { card: 'summary_large_image', title: 'Matematik Makaleleri ve Çözümlü Örnekler | MatAI', description: 'Matematik konularını anlaşılır anlatımlar ve çözümlü örneklerle öğrenin.', images: ['/assets/og/turev-konu-anlatimi.jpg'] },
};

export default function ArticlesPage() {

  const articles = [
    ...topicalArticles.map(({ title, slug, section, description, readingTime, symbol, formula, category }) => ({ title, slug, href: `/${section}/${slug}`, description, readingTime, symbol, formula, category })),
    ...foundationArticles.map(({ title, slug, description, readingTime, symbol, formula, category }) => ({ title, slug, description, readingTime, symbol, formula, category })),
    ...derivativeArticles.map(({ title, slug, description, readingTime, symbol, formula }) => ({ title, slug, description, readingTime, symbol, formula, category: 'Türev' })),
    ...integralArticles,
  ].sort((a, b) => {
    const order = ['Yapay zekâ ve matematik', 'YKS rehberi', 'YKS verileri', 'Yapay zekâ rehberi', 'Fonksiyonlar', 'Trigonometri', 'Limit ve Süreklilik', 'Türev', 'İntegral'];
    return order.indexOf(a.category) - order.indexOf(b.category);
  });
  const pageUrl = 'https://matematik-ai.com/makaleler';
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: metadata.title, description: metadata.description, inLanguage: 'tr-TR', isPartOf: { '@id': 'https://matematik-ai.com/#website' } },
    { '@type': 'ItemList', '@id': `${pageUrl}#articles`, itemListElement: articles.map(({ title, slug, href }, index) => ({ '@type': 'ListItem', position: index + 1, name: title, url: href ? `https://matematik-ai.com${href}` : `${pageUrl}/${slug}` })) },
    { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://matematik-ai.com' }, { '@type': 'ListItem', position: 2, name: 'Makaleler', item: pageUrl }] },
  ] };
  return (
    <div className="articles-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <PublicHeader />

      <main className="articles-main">
        <header className="articles-hero">
          <span className="articles-eyebrow">MatAI Kütüphane</span>
          <h1>Fonksiyonlardan integrale, kalkülüsü doğru sırayla öğrenin.</h1>
          <p>Üniversite matematiğine hazırlık için konu anlatımları, temel formüller ve adım adım çözümlü örnekler.</p>
        </header>

        <section className="topic-library" aria-labelledby="topic-library-heading">
          <h2 id="topic-library-heading">Konuları bir öğrenme sırasıyla çalış</h2>
          <p>Nereden başlayacağını bilmiyorsan konu merkezini seç. Ön bilgiden derslere, kontrol sorusundan pratiğe adım adım ilerle.</p>
          <TopicCards />
          <Link href="/konular">Öğrenme yollarını incele →</Link>
        </section>

        <section className="articles-list" aria-labelledby="articles-title">
          <div className="articles-list-heading">
            <div>
              <span>Güncel içerikler</span>
              <h2 id="articles-title">Makaleler</h2>
            </div>
            <p>Fonksiyonlar, trigonometri, limit, süreklilik, türev ve integral aynı öğrenme yolunda.</p>
          </div>

          <ArticlesGrid articles={articles} />
          <noscript>
            <div className="articles-noscript"><h2>Tüm makaleler</h2><ul>{articles.map(({ title, slug, href }) => <li key={slug}><a href={href || `/makaleler/${slug}`}>{title}</a></li>)}</ul></div>
          </noscript>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
