import Link from 'next/link';
import { getTopicHub } from '../../../lib/topicHubs';
import { notFound } from 'next/navigation';
import PublicHeader from '../../../components/public/PublicHeader';
import PublicFooter from '../../../components/public/PublicFooter';
import MathCalculator from '../../../components/public/MathCalculator';
import MathToolCards from '../../../components/public/MathToolCards';
import { getMathTool, mathTools } from '../../../lib/mathTools';

export const dynamicParams = false;
export function generateStaticParams() { return mathTools.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const tool = getMathTool((await params).slug);
  if (!tool) return {};
  const url = `/araclar/${tool.slug}`;
  return { title: tool.seoTitle, description: tool.description, alternates: { canonical: url }, openGraph: { title: tool.seoTitle, description: tool.description, url, locale: 'tr_TR', type: 'website' }, twitter: { card: 'summary', title: tool.seoTitle, description: tool.description } };
}
export default async function ToolPage({ params }) {
  const tool = getMathTool((await params).slug);
  if (!tool) notFound();
  const topic = getTopicHub(tool.kind === 'derivative' ? 'turev' : tool.kind === 'integral' ? 'integral' : 'fonksiyonlar');
  const url = `https://matematik-ai.com/araclar/${tool.slug}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebApplication', '@id': `${url}#tool`, name: tool.title, description: `${tool.description} ${tool.scope}`, url, inLanguage: 'tr-TR', applicationCategory: 'EducationalApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: 'https://matematik-ai.com' }, { '@type': 'ListItem', position: 2, name: 'Matematik araçları', item: 'https://matematik-ai.com/araclar' }, { '@type': 'ListItem', position: 3, name: tool.title, item: url }] },
  ] };
  return <div className="math-tools-page"><PublicHeader /><main className="tools-main tool-detail">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <nav className="tool-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana sayfa</Link><span aria-hidden="true">/</span><Link href="/araclar">Araçlar</Link><span aria-hidden="true">/</span><span>{tool.title}</span></nav>
    <header className="tools-hero"><span className="tool-tag">MatAI matematik araçları</span><h1>{tool.title}</h1><p>{tool.intro}</p></header>
    <MathCalculator tool={tool} />
    <aside className="tool-scope"><h2>Bu araç neleri hesaplar?</h2><p>{tool.scope}</p><p>Parantez kullanabilirsiniz: (x + 1)^2. Bölme yalnız sabit sayılarla yapılır: x/2. Değişken olarak x kullanın.</p></aside>
    <section className="tool-reading"><h2>{tool.kind === 'equation' ? 'Denklem nasıl çözülür?' : `${tool.title} nasıl yapılır?`}</h2>{tool.guide.map(([heading, text]) => <div key={heading}><h3>{heading}</h3><p>{text}</p></div>)}</section>
    <section className="tool-faq"><h2>Sık sorulan sorular</h2>{tool.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    <section className="tool-reading"><h2>Konuyu daha iyi anla</h2><p><Link href={`/konular/${topic.slug}`}>{topic.title} çalışma rehberi ve ders sırası →</Link></p><ul>{tool.related.map((link) => <li key={link.href}><Link href={link.href}>{link.title}</Link></li>)}</ul></section>
    <section className="tools-related"><h2>Diğer matematik araçları</h2><MathToolCards exclude={tool.slug} /></section>
  </main><PublicFooter /></div>;
}
