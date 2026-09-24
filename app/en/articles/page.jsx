import PublicHeader from '../../../components/public/PublicHeader';
import PublicFooter from '../../../components/public/PublicFooter';
import ArticlesGrid from '../../../components/public/ArticlesGrid';
import { englishArticles } from '../../../lib/enArticles';
import { englishTopicalArticles } from '../../../lib/topicalArticles';

export const metadata = {
  title: 'Math Articles, Formulas, and Worked Examples',
  description: 'Learn calculus and other math topics through clear explanations, essential formulas, and worked examples.',
  alternates: { canonical: '/en/articles', languages: { tr: '/makaleler', en: '/en/articles', 'x-default': '/makaleler' } },
  openGraph: { title: 'Math Articles and Worked Examples | MatAI', description: 'Clear math explanations, formulas, and worked examples.', type: 'website', url: '/en/articles', locale: 'en_US', siteName: 'MatAI' },
};

export default function EnglishArticlesPage() {
  const articles = [...englishTopicalArticles.map((item) => ({ ...item, href: `/en/${item.section}/${item.slug}` })), ...englishArticles].sort((a, b) => {
    const order = ['AI and mathematics', 'YKS guide', 'AI guide', 'Functions', 'Trigonometry', 'Limits & Continuity', 'Derivatives', 'Integrals'];
    return order.indexOf(a.category) - order.indexOf(b.category);
  });
  return <div className="articles-page"><PublicHeader locale="en" languageHref="/makaleler" /><main className="articles-main">
    <header className="articles-hero"><span className="articles-eyebrow">MatAI Library</span><h1>Learn calculus in the right order, from functions to integrals.</h1><p>University-preparation guides with clear explanations, core formulas, and worked examples.</p></header>
    <section className="articles-list" aria-labelledby="articles-title"><div className="articles-list-heading"><div><span>English guides</span><h2 id="articles-title">Articles</h2></div><p>Functions, trigonometry, limits, continuity, derivatives, and integrals in one learning path.</p></div><ArticlesGrid articles={articles} locale="en" basePath="/en/articles" /></section>
  </main><PublicFooter locale="en" /></div>;
}
