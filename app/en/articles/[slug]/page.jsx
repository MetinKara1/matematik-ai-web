import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicHeader from '../../../../components/public/PublicHeader';
import PublicFooter from '../../../../components/public/PublicFooter';
import { englishArticles, getEnglishArticle } from '../../../../lib/enArticles';

export function generateStaticParams() {
  return englishArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getEnglishArticle(slug);
  if (!article) return {};
  const canonical = `/en/articles/${article.slug}`;
  return {
    title: article.title, description: article.description,
    alternates: { canonical, languages: { tr: `/makaleler/${article.trSlug}`, en: canonical, 'x-default': `/makaleler/${article.trSlug}` } },
    openGraph: { title: article.title, description: article.description, type: 'article', url: canonical, locale: 'en_US', siteName: 'MatAI', images: ['/assets/articles/integral-alan.jpg'] },
  };
}

export default async function EnglishArticlePage({ params }) {
  const { slug } = await params;
  const article = getEnglishArticle(slug);
  if (!article) notFound();
  const pageUrl = `https://matematik-ai.com/en/articles/${article.slug}`;
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: article.title, description: article.description, url: pageUrl, inLanguage: 'en', articleSection: article.category, isAccessibleForFree: true, author: { '@type': 'Organization', name: 'MatAI Content Team' }, publisher: { '@type': 'Organization', name: 'MatAI', url: 'https://matematik-ai.com' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://matematik-ai.com/en' }, { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://matematik-ai.com/en/articles' }, { '@type': 'ListItem', position: 3, name: article.title, item: pageUrl }] },
  ] };
  return <div className="article-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /><PublicHeader locale="en" languageHref={`/makaleler/${article.trSlug}`} />
    <main className="article-main"><article className="article-card"><header className="article-heading"><nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/articles">Articles</Link><span aria-hidden="true">›</span><span>{article.title}</span></nav><span className="article-category">{article.category} · Mathematics</span><h1>{article.title}</h1><p className="article-summary">{article.description}</p><div className="article-meta"><span>{article.readingTime} min read</span><span>Worked examples</span><span>MatAI Content Team</span></div></header>
      <div className="article-content"><nav className="article-toc" aria-label="Table of contents"><span>In this guide</span>{article.sections.map(({ id, title }) => <a href={`#${id}`} key={id}>{title}</a>)}</nav><div className="article-body"><div className="article-answer"><span>In short</span><p>{article.summary}</p></div>{article.sections.map((section) => <section id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.formulas?.length > 0 && <div className="article-math article-math-lines">{section.formulas.map((formula) => <span key={formula}>{formula}</span>)}</div>}</section>)}
      <aside className="article-cta"><div className="article-cta-copy"><h2>Stuck on a math problem?</h2><p>Take a photo or type the question, then review the solution path with MatAI.</p><a href="/en/ai-math-solver">Explore the AI Math Solver</a></div></aside><div className="article-related"><span>Continue learning</span><Link href="/en/articles"><strong>Browse all math guides</strong><small>Formulas, rules, and worked examples →</small></Link></div></div></div>
    </article></main><PublicFooter locale="en" /></div>;
}
