import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicHeader from '../../../components/public/PublicHeader';
import PublicFooter from '../../../components/public/PublicFooter';
import ResourceShare from '../../../components/public/ResourceShare';
import { getStudyResource, studyResources } from '../../../lib/studyResources';
import { editorialIdentity } from '../../../lib/editorialIdentity';
import { publisherIdentity, serializeStructuredData } from '../../../lib/structuredData';
export function generateStaticParams() { return studyResources.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const r = getStudyResource((await params).slug); if (!r) return {};
  return { title: `${r.title}: 6 Soru ve Cevaplı PDF`, description: r.description, alternates: { canonical: `/kaynaklar/${r.slug}` }, openGraph: { title: r.title, description: r.description, url: `/kaynaklar/${r.slug}`, type: 'website', locale: 'tr_TR' } };
}
export default async function ResourcePage({ params }) {
  const r = getStudyResource((await params).slug); if (!r) notFound();
  const url = `https://matematik-ai.com/kaynaklar/${r.slug}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'LearningResource', '@id': `${url}#resource`, url, name: r.title, description: r.description, inLanguage: 'tr-TR', learningResourceType: 'Çalışma kağıdı', educationalLevel: r.level, isAccessibleForFree: true, dateModified: r.updatedAt, author: editorialIdentity, publisher: publisherIdentity, encoding: { '@type': 'MediaObject', encodingFormat: 'application/pdf', contentUrl: `${url}.pdf` } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: 'https://matematik-ai.com' }, { '@type': 'ListItem', position: 2, name: 'Kaynaklar', item: 'https://matematik-ai.com/kaynaklar' }, { '@type': 'ListItem', position: 3, name: r.title, item: url }] },
  ] };
  return <div className="topic-page"><PublicHeader /><main className="topic-main resource-detail">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(schema) }} />
    <nav className="topic-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana sayfa</Link><span>/</span><Link href="/kaynaklar">Kaynaklar</Link><span>/</span><span>{r.title}</span></nav>
    <header className="topic-hero"><span className="topic-eyebrow">{r.level} · 6 alıştırma · 2 sayfa PDF</span><h1>{r.title}</h1><p>{r.intro}</p><p>Güncelleme: <time dateTime={r.updatedAt}>4 Ekim 2026</time> · <Link href="/hakkimizda#icerik-ekibi">MatAI İçerik Ekibi</Link></p><a className="resource-download" href={`/kaynaklar/${r.slug}.pdf`} download>Çalışma kağıdını PDF indir</a><ResourceShare url={url} /></header>
    <section className="topic-study"><h2>Kısa tekrar</h2><ul>{r.summary.map((s) => <li key={s}>{s}</li>)}</ul></section>
    <section className="resource-questions"><h2>Önce kendin çöz</h2><ol>{r.questions.map((q, i) => <li key={q.prompt}><h3>{q.prompt}</h3><details><summary>{i + 1}. sorunun cevabı ve çözüm yolu</summary><p><strong>{q.answer}</strong></p><p>{q.explanation}</p></details></li>)}</ol></section>
    <section className="topic-study"><h2>Takıldığın konuyu tekrar et</h2><ul>{r.lessons.map((l) => <li key={l.slug}><Link href={`/makaleler/${l.slug}`}>{l.title}</Link></li>)}</ul><Link href={`/konular/${r.topic}`}>Konu merkezindeki çalışma sırasına dön →</Link></section>
    <p>Kaynak bağlantısını koruyarak kişisel çalışmanda ve dersinde ücretsiz kullanabilir ve paylaşabilirsin. Bu kağıt tüm müfredatı veya sınav kapsamını temsil etmez.</p>
  </main><PublicFooter /></div>;
}
