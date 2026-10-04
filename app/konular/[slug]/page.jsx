import { getTopicResource } from '../../../lib/studyResources';
import { serializeStructuredData } from '../../../lib/structuredData';
import { getLessonScope } from '../../../lib/lessonScope';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicHeader from '../../../components/public/PublicHeader';
import PublicFooter from '../../../components/public/PublicFooter';
import { getTopicHub, getTopicLesson, getTopicLessons, topicHubs } from '../../../lib/topicHubs';

export function generateStaticParams() { return topicHubs.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const topic = getTopicHub((await params).slug); if (!topic) return {};
  const title = `${topic.title} – Konu Anlatımları ve Çalışma Sırası`;
  return { title, description: topic.description, alternates: { canonical: `/konular/${topic.slug}` }, openGraph: { title, description: topic.description, url: `/konular/${topic.slug}`, locale: 'tr_TR', type: 'website' }, twitter: { card: 'summary', title, description: topic.description } };
}
export default async function TopicPage({ params }) {
  const topic = getTopicHub((await params).slug); if (!topic) notFound();
  const lessons = getTopicLessons(topic), previous = getTopicHub(topic.previous), next = getTopicHub(topic.next);
  const resource = getTopicResource(topic.slug);
  const url = `https://matematik-ai.com/konular/${topic.slug}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${url}#page`, url, name: `${topic.title} çalışma rehberi`, description: topic.description, inLanguage: 'tr-TR', mainEntity: { '@id': `${url}#lessons` } },
    { '@type': 'ItemList', '@id': `${url}#lessons`, itemListOrder: 'https://schema.org/ItemListOrderAscending', numberOfItems: lessons.length, itemListElement: lessons.map((lesson, i) => ({ '@type': 'ListItem', position: i + 1, name: lesson.shortTitle || lesson.title, url: `https://matematik-ai.com/makaleler/${lesson.slug}` })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: 'https://matematik-ai.com' }, { '@type': 'ListItem', position: 2, name: 'Konular', item: 'https://matematik-ai.com/konular' }, { '@type': 'ListItem', position: 3, name: topic.title, item: url }] },
  ] };
  return <div className="topic-page"><PublicHeader /><main className="topic-main topic-detail">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(schema) }} />
    <nav className="topic-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana sayfa</Link><span aria-hidden="true">/</span><Link href="/konular">Konular</Link><span aria-hidden="true">/</span><span>{topic.title}</span></nav>
    <header className="topic-hero"><span className="topic-eyebrow">{lessons.length} ders · Konu merkezi</span><h1>{topic.title}</h1><p className="topic-lead">{topic.summary}</p><p>{topic.intro}</p><a className="topic-start" href="#dersler">Çalışma sırasına geç <span aria-hidden="true">↓</span></a></header>
    <div className="topic-preparation"><section><h2>Başlamadan önce</h2><p>{topic.prerequisite}</p>{previous && <Link href={`/konular/${previous.slug}`}>{previous.title} merkezini gözden geçir →</Link>}</section><section><h2>Bu konuda hedefin</h2><ul>{topic.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section></div>
    <section className="topic-section" aria-labelledby="where-heading"><h2 id="where-heading">Nereden başlamalısın?</h2><div className="topic-routes">{topic.routes.map((route) => <Link key={route.href} href={route.href}><h3>{route.title}</h3><p>{route.text}</p><span>Derse geç →</span></Link>)}</div></section>
    <section className="topic-section" id="dersler" aria-labelledby="lessons-heading"><h2 id="lessons-heading">Önerilen çalışma sırası</h2><p className="topic-section-intro">Her aşamada önce anlatımı, ardından çözümlü örnekleri çalış. Varsa alıştırmanın cevabını kendi çözümünden sonra aç.</p><ol className="topic-stages">{topic.stages.map((stage, index) => <li key={stage.title}><div className="topic-stage-heading"><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{stage.title}</h3><p>{stage.why}</p></div></div><ul className="topic-lessons">{stage.slugs.map((slug) => { const lesson = getTopicLesson(slug); return <li key={slug}><Link href={`/makaleler/${slug}`}><strong>{lesson.shortTitle || lesson.title}</strong><span>{lesson.description}</span><small>{getLessonScope(slug)?.label} · Dersi ve örnekleri aç →</small></Link></li>; })}</ul></li>)}</ol></section>
    <section className="topic-checkpoint" aria-labelledby="checkpoint-heading"><span className="topic-eyebrow">Kendini kontrol et</span><h2 id="checkpoint-heading">Bir sonraki aşamaya hazır mısın?</h2><p className="topic-question">{topic.checkpoint.question}</p><details><summary>Cevabı ve açıklamayı göster</summary><p>{topic.checkpoint.answer}</p><Link href={topic.checkpoint.href}>İlgili dersi tekrar et →</Link></details></section>
    <aside className="topic-pitfall"><h2>Bu ayrıntıyı kaçırma</h2><p>{topic.pitfall}</p></aside>
    <aside className="topic-practice"><div><span className="topic-eyebrow">Pratik zamanı</span><h2>{topic.practice.title}</h2><p>{topic.practice.text}</p>{topic.interactive && <p><Link href={topic.interactive.href}>{topic.interactive.title} →</Link></p>}</div><Link href={topic.practice.href}>{topic.practice.label} →</Link></aside>
    {resource && <aside className="topic-practice"><div><h2>Kağıt üzerinde çalış</h2><p>{resource.description}</p></div><Link href={`/kaynaklar/${resource.slug}`}>Cevaplı çalışma kağıdını aç →</Link></aside>}
    <nav className="topic-next" aria-label="Diğer konu merkezleri"><Link href="/konular">← Tüm konu merkezleri</Link>{next && <Link href={`/konular/${next.slug}`}>Sonraki konu: {next.title} →</Link>}</nav>
  </main><PublicFooter /></div>;
}
