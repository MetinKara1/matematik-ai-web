import Link from 'next/link';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import ArticleTrustBox from './ArticleTrustBox';

const site = 'https://matematik-ai.com';

export default function TopicalArticle({ article, locale = 'tr', relatedArticles = [] }) {
  const en = locale === 'en';
  const basePath = en ? `/en/${article.section}` : `/${article.section}`;
  const pageUrl = `${site}${basePath}/${article.slug}`;
  const languageHref = en
    ? `/${article.trSection}/${article.trSlug}`
    : `/en/${article.enSection}/${article.enSlug}`;
  const faq = article.faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }));
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': article.section === 'news' || article.section === 'gundem' ? 'NewsArticle' : 'Article', '@id': `${pageUrl}#article`, mainEntityOfPage: pageUrl, headline: article.title, description: article.description, datePublished: `${article.publishedAt}T00:00:00+03:00`, dateModified: `${article.publishedAt}T00:00:00+03:00`, inLanguage: en ? 'en' : 'tr-TR', articleSection: article.category, isAccessibleForFree: true, author: { '@type': 'Organization', name: en ? 'MatAI Content Team' : 'MatAI İçerik Ekibi' }, publisher: { '@type': 'Organization', name: 'MatAI', url: site } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: en ? 'Home' : 'Ana Sayfa', item: `${site}${en ? '/en' : ''}` }, { '@type': 'ListItem', position: 2, name: en ? 'Articles' : 'Makaleler', item: `${site}${en ? '/en/articles' : '/makaleler'}` }, { '@type': 'ListItem', position: 3, name: article.title, item: pageUrl }] },
    { '@type': 'FAQPage', mainEntity: faq },
  ] };
  return <div className="article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <PublicHeader locale={locale} languageHref={languageHref} />
    <main className="article-main"><article className="article-card">
      <header className="article-heading"><nav className="article-breadcrumb" aria-label={en ? 'Breadcrumb' : 'Sayfa yolu'}><Link href={en ? '/en' : '/'}>{en ? 'Home' : 'Ana Sayfa'}</Link><span aria-hidden="true">›</span><Link href={en ? '/en/articles' : '/makaleler'}>{en ? 'Articles' : 'Makaleler'}</Link><span aria-hidden="true">›</span><span>{article.title}</span></nav><span className="article-category">{article.category}</span><h1>{article.title}</h1><p className="article-summary">{article.description}</p><div className="article-meta"><time dateTime={article.publishedAt}>{en ? '24 September 2026' : '24 Eylül 2026'}</time><span>{article.readingTime} {en ? 'min read' : 'dakika okuma'}</span><span>{en ? 'Source-checked' : 'Kaynak kontrollü'}</span></div></header>
      <div className="article-content"><nav className="article-toc" aria-label={en ? 'Table of contents' : 'İçindekiler'}><span>{en ? 'In this article' : 'Bu yazıda'}</span>{article.sections.map(([id, title]) => <a href={`#${id}`} key={id}>{title}</a>)}<a href="#faq">{en ? 'Frequently asked questions' : 'Sık sorulan sorular'}</a><a href="#sources">{en ? 'Sources' : 'Kaynaklar'}</a></nav>
        <div className="article-body"><div className="article-answer"><span>{en ? 'Direct answer' : 'Kısaca'}</span><p>{article.summary}</p></div>
          {article.sections.map(([id, title, paragraphs]) => <section id={id} key={id}><h2>{title}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <section id="faq"><h2>{en ? 'Frequently asked questions' : 'Sık sorulan sorular'}</h2>{article.faq.map(([question, answer]) => <div key={question}><h3>{question}</h3><p>{answer}</p></div>)}</section>
          {relatedArticles.length > 0 && <nav className="article-series" aria-label={en ? 'Related articles' : 'İlgili yazılar'}><span>{en ? 'Related reading' : 'İlgili okumalar'}</span><div>{relatedArticles.map((item) => <Link href={`${en ? `/en/${item.section}` : `/${item.section}`}/${item.slug}`} key={item.key}>{item.title}</Link>)}</div></nav>}
          <aside className="article-cta"><div className="article-cta-copy"><h2>{en ? 'Review a problem step by step' : 'Bir soruyu adım adım inceleyin'}</h2><p>{en ? 'MatAI is a student learning tool, not a research proof system. Upload or type your own mathematics problem and examine the solution path.' : 'MatAI bir araştırma kanıtlama sistemi değil, öğrenci öğrenme aracıdır. Kendi matematik sorunuzun fotoğrafını yükleyin veya metnini yazın ve çözüm yolunu inceleyin.'}</p><Link href={en ? '/en/ai-math-solver' : '/yapay-zeka-matematik-cozucu'}>{en ? 'Explore the AI Math Solver' : 'Yapay zekâ matematik çözücüyü inceleyin'}</Link></div></aside>
          <section id="sources"><h2>{en ? 'Sources' : 'Kaynaklar'}</h2><ul>{article.sources.map(({ title, url }) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{title}</a></li>)}</ul><p><small>{en ? 'Claims and source availability were checked on 24 September 2026.' : `Kaynaklar 24 Eylül 2026 tarihinde kontrol edildi. Olay tarihi (${article.eventDate}) ile bu sayfanın yayın tarihi farklıdır.`}</small></p></section>
          {!en && <ArticleTrustBox />}
        </div></div>
    </article></main><PublicFooter locale={locale} />
  </div>;
}
