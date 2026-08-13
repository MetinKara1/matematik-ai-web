import Link from 'next/link';
import PublicHeader from './PublicHeader';

const appStoreLink = 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761';

export default function IntegralTopicArticle({ article, children }) {
  const articleUrl = `https://matematik-ai.com/makaleler/${article.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', '@id': `${articleUrl}#article`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
        headline: article.title, description: article.description,
        url: articleUrl,
        image: [`https://matematik-ai.com${article.image || '/assets/og/integral-sorusu-nasil-cozulur.png'}`],
        datePublished: article.datePublished || '2026-08-12T00:00:00+03:00', dateModified: article.dateModified || article.datePublished || '2026-08-12T00:00:00+03:00',
        inLanguage: 'tr-TR', articleSection: 'AYT Matematik', keywords: article.keywords,
        about: { '@type': 'Thing', name: article.category || 'İntegral' },
        educationalLevel: 'Lise ve üniversite sınavına hazırlık',
        isAccessibleForFree: true,
        author: { '@type': 'Organization', name: 'MatAI', url: 'https://matematik-ai.com' },
        publisher: { '@type': 'Organization', name: 'MatAI', url: 'https://matematik-ai.com', logo: { '@type': 'ImageObject', url: 'https://matematik-ai.com/assets/MatAI-logo.png' } },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${articleUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://matematik-ai.com' },
          { '@type': 'ListItem', position: 2, name: 'Makaleler', item: 'https://matematik-ai.com/makaleler' },
          { '@type': 'ListItem', position: 3, name: article.shortTitle, item: articleUrl },
        ],
      },
    ],
  };

  return (
    <div className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <PublicHeader />
      <main className="article-main"><article className="article-card">
        <header className="article-heading">
          <nav className="article-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana Sayfa</Link><span aria-hidden="true">›</span><Link href="/makaleler">Makaleler</Link><span aria-hidden="true">›</span><span>{article.shortTitle}</span></nav>
          <span className="article-category">{article.category || 'İntegral'} · AYT Matematik</span>
          <h1>{article.title}</h1><p className="article-summary">{article.summary}</p>
          <div className="article-meta" aria-label="Makale bilgileri"><time dateTime={article.date || '2026-08-12'}>{article.displayDate || '12 Ağustos 2026'}</time><span>{article.readingTime} dakika okuma</span><span>{article.level}</span></div>
        </header>
        <div className="article-content">
          <nav className="article-toc" aria-label="İçindekiler"><span>Bu yazıda</span>{article.toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}</nav>
          <div className="article-body">
            <div className="article-intro">{article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            {children}
            {article.seriesLinks?.length > 0 && <nav className="article-series" aria-label={`${article.category || 'İntegral'} makale serisi`}>
              <span>Bu seride</span>
              <div>{article.seriesLinks.map((item) => <Link href={`/makaleler/${item.slug}`} key={item.slug}>{item.title}</Link>)}</div>
            </nav>}
            <aside className="article-cta"><div className="article-cta-copy"><h2>{article.category || 'İntegral'} sorusuna mı takıldınız?</h2><p>Sorunun fotoğrafını çekin veya metin olarak yazın; çözüm yolunu MatAI ile adım adım inceleyin.</p><a href={appStoreLink} target="_blank" rel="noopener noreferrer" aria-label="MatAI uygulamasını App Store'dan indirin">App Store&apos;dan indirin</a></div></aside>
            <div className="article-related"><span>Sonraki okuma</span><Link href={`/makaleler/${article.related.slug}`}><strong>{article.related.title}</strong><small>{article.related.text} →</small></Link></div>
          </div>
        </div>
      </article></main>
    </div>
  );
}
