import { notFound } from 'next/navigation';
import TopicalArticle from '../../../components/public/TopicalArticle';
import { topicalArticles, topicalArticleMap, topicalByKey } from '../../../lib/topicalArticles';

const articles = topicalArticles.filter((item) => item.section === 'gundem');
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) { const article = topicalArticleMap[(await params).slug]; if (!article || article.section !== 'gundem') return {}; const canonical = `/gundem/${article.slug}`; const en = `/en/${article.enSection}/${article.enSlug}`; return { title: article.title, description: article.description, keywords: article.keywords, alternates: { canonical, languages: { tr: canonical, en, 'x-default': canonical } }, openGraph: { title: article.title, description: article.description, type: 'article', url: canonical, locale: 'tr_TR', siteName: 'MatAI' } }; }
export default async function Page({ params }) { const article = topicalArticleMap[(await params).slug]; if (!article || article.section !== 'gundem') notFound(); return <TopicalArticle article={article} relatedArticles={article.related.map((key) => topicalByKey[key]).filter(Boolean)} />; }
