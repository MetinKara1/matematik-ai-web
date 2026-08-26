import { notFound } from 'next/navigation';
import IntegralTopicArticle from '../../../components/public/IntegralTopicArticle';
import { derivativeArticleMap, derivativeArticles } from '../../../lib/derivativeArticles';
import { foundationArticleMap, foundationArticles } from '../../../lib/foundationArticles';
import { englishArticles } from '../../../lib/enArticles';
import { getArticleVisual } from '../../../lib/articleVisuals';

const dynamicArticles = [...foundationArticles, ...derivativeArticles];
const dynamicArticleMap = { ...foundationArticleMap, ...derivativeArticleMap };

export function generateStaticParams() {
  return dynamicArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = dynamicArticleMap[slug];
  if (!article) return {};
  const image = getArticleVisual(article.slug).src;
  const publishedTime = `${article.publishedAt || '2026-08-14'}T00:00:00+03:00`;
  const englishVersion = englishArticles.find((item) => item.trSlug === article.slug);
  return {
    title: article.title, description: article.description, keywords: article.keywords,
    alternates: englishVersion
      ? { canonical: `/makaleler/${article.slug}`, languages: { tr: `/makaleler/${article.slug}`, en: `/en/articles/${englishVersion.slug}`, 'x-default': `/makaleler/${article.slug}` } }
      : { canonical: `/makaleler/${article.slug}` },
    openGraph: { title: article.title, description: article.description, type: 'article', locale: 'tr_TR', siteName: 'MatAI', url: `/makaleler/${article.slug}`, images: [{ url: image, width: 1536, height: 1024, alt: getArticleVisual(article.slug).alt }], publishedTime, modifiedTime: publishedTime, authors: ['MatAI'] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.description, images: [image] },
  };
}

export default async function DerivativeArticlePage({ params }) {
  const { slug } = await params;
  const source = dynamicArticleMap[slug];
  if (!source) notFound();
  const publishedAt = source.publishedAt || '2026-08-14';
  const displayDate = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Istanbul' }).format(new Date(`${publishedAt}T12:00:00+03:00`));
  const categoryArticles = dynamicArticles.filter((item) => (item.category || 'Türev') === (source.category || 'Türev'));
  const currentIndex = categoryArticles.findIndex((item) => item.slug === slug);
  const seriesLinks = [
    categoryArticles[currentIndex - 1],
    categoryArticles[currentIndex + 1],
    categoryArticles[0],
  ].filter(Boolean).filter((item, index, items) => items.findIndex(({ slug: itemSlug }) => itemSlug === item.slug) === index);
  const article = {
    ...source, category: source.category || 'Türev', image: '/assets/og/turev-konu-anlatimi.jpg', date: publishedAt, displayDate,
    datePublished: `${publishedAt}T00:00:00+03:00`,
    seriesLinks,
    toc: source.sections.map(([id, heading]) => ({ id, label: heading })),
  };
  return <IntegralTopicArticle article={article}>{source.sections.map(([id, heading, paragraphs, formulas]) => (
    <section id={id} key={id}><h2>{heading}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{formulas.length > 0 && <div className={`article-math${formulas.length > 1 ? ' article-math-lines' : ''}`}>{formulas.map((formula) => <span key={formula} dangerouslySetInnerHTML={{ __html: formula }} />)}</div>}</section>
  ))}</IntegralTopicArticle>;
}
