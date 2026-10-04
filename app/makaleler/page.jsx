import { serializeStructuredData } from '../../lib/structuredData';
import Link from 'next/link';
import TopicCards from '../../components/public/TopicCards';
import PublicFooter from '../../components/public/PublicFooter';
import { topicHubs, getTopicLessons } from '../../lib/topicHubs';
import PublicHeader from '../../components/public/PublicHeader';
import ArticlesGrid from '../../components/public/ArticlesGrid';
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

  const lessons = topicHubs.flatMap((topic) => getTopicLessons(topic).map(({ title, slug, description, readingTime, symbol, formula }) => ({ title, slug, description, readingTime, symbol, formula, category: topic.title })));
  const updates = [...topicalArticles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).map(({ title, slug, section, description, readingTime, symbol, formula, category }) => ({ title, slug, href: `/${section}/${slug}`, description, readingTime, symbol, formula, category }));
  const articles = [...lessons, ...updates];
  const pageUrl = 'https://matematik-ai.com/makaleler';
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: metadata.title, description: metadata.description, inLanguage: 'tr-TR', isPartOf: { '@id': 'https://matematik-ai.com/#website' } },
    { '@type': 'ItemList', '@id': `${pageUrl}#articles`, itemListElement: articles.map(({ title, slug, href }, index) => ({ '@type': 'ListItem', position: index + 1, name: title, url: href ? `https://matematik-ai.com${href}` : `${pageUrl}/${slug}` })) },
    { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://matematik-ai.com' }, { '@type': 'ListItem', position: 2, name: 'Makaleler', item: pageUrl }] },
  ] };
  return (
    <div className="articles-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} />
      <PublicHeader languageHref="/en/articles" />

      <main className="articles-main">
        <header className="articles-hero">
          <span className="articles-eyebrow">MatAI Kütüphane</span>
          <h1>Fonksiyonlardan integrale, kalkülüsü doğru sırayla öğrenin.</h1>
          <p>Üniversite matematiğine hazırlık için konu anlatımları, temel formüller ve adım adım çözümlü örnekler.</p>
          <nav className="library-jump-links" aria-label="Kütüphane bölümleri"><a href="#konu-sec">Konunu seç</a><a href="#dersler">Derslere geç</a><a href="#matematik-gundemi">Gündem ve rehberler</a></nav>
        </header>

        <section id="konu-sec" className="topic-library" aria-labelledby="topic-library-heading">
          <h2 id="topic-library-heading">Konunu seç</h2>
          <p>Nereden başlayacağını bilmiyorsan konu merkezini seç. Ön bilgiden derslere, kontrol sorusundan pratiğe adım adım ilerle.</p>
          <TopicCards />
          <Link href="/konular">Öğrenme yollarını incele →</Link>
        </section>

        <aside className="library-start" aria-labelledby="library-start-heading"><div><span>Çalışmaya başla</span><h2 id="library-start-heading">Temelin sağlam olsun</h2><p>İlk kez başlıyorsan fonksiyonlar ve grafiklerle ilerle. Bir soruyu kendin denemek istiyorsan ücretsiz hesaplama araçlarını aç.</p></div><div className="library-start-actions"><Link href="/makaleler/fonksiyonlar-ve-grafikler">İlk derse başla →</Link><Link href="/araclar">Hesaplama araçlarını aç →</Link></div></aside>

        <section id="dersler" className="articles-list library-lessons" aria-labelledby="articles-title">
          <div className="articles-list-heading">
            <div>
              <span>{lessons.length} ders · Öğrenme sırasıyla</span>
              <h2 id="articles-title">Konu anlatımları ve çözümlü örnekler</h2>
            </div>
            <p>Fonksiyonlar, trigonometri, limit, süreklilik, türev ve integral aynı öğrenme yolunda.</p>
          </div>

          <ArticlesGrid articles={lessons} contentLabel="Konu anlatımı" headingLevel={3} categoryLabel="Ders konuları" />
          <noscript>
            <div className="articles-noscript"><h3>Tüm dersler</h3><ul>{lessons.map(({ title, slug, href }) => <li key={slug}><a href={href || `/makaleler/${slug}`}>{title}</a></li>)}</ul></div>
          </noscript>
        </section>
        <section id="matematik-gundemi" className="articles-list library-updates" aria-labelledby="updates-title">
          <div className="articles-list-heading"><div><span>Matematik dünyasından</span><h2 id="updates-title">Gündem ve rehberler</h2></div><p>Matematik haberleri, yapay zekâ gelişmeleri ve genel rehberler. En yeni yazılar önce gösterilir.</p></div>
          <ArticlesGrid articles={updates} contentLabel="Gündem ve rehber" headingLevel={3} categoryLabel="Gündem ve rehber kategorileri" />
          <noscript><div className="articles-noscript"><h3>Tüm gündem ve rehber yazıları</h3><ul>{updates.map(({title,slug,href}) => <li key={slug}><Link href={href}>{title}</Link></li>)}</ul></div></noscript>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
