import Link from 'next/link';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';
import { studyResources } from '../../lib/studyResources';
import { serializeStructuredData } from '../../lib/structuredData';
const title = 'Matematik Çalışma Kağıtları: Limit, Türev ve İntegral';
const description = 'Ücretsiz limit, türev ve integral çalışma kağıtları. Kısa özet, 6 alıştırma ve açıklamalı cevap anahtarını okuyun veya PDF indirin.';
export const metadata = { title, description, alternates: { canonical: '/kaynaklar' }, openGraph: { title, description, url: '/kaynaklar', type: 'website', locale: 'tr_TR' } };
export default function ResourcesPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, url: 'https://matematik-ai.com/kaynaklar', inLanguage: 'tr-TR', mainEntity: { '@type': 'ItemList', itemListElement: studyResources.map((r, i) => ({ '@type': 'ListItem', position: i + 1, name: r.title, url: `https://matematik-ai.com/kaynaklar/${r.slug}` })) } };
  return <div className="topic-page"><PublicHeader /><main className="topic-main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(schema) }} />
    <nav className="topic-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana sayfa</Link><span>/</span><span>Kaynaklar</span></nav>
    <header className="topic-hero"><span className="topic-eyebrow">Ücretsiz çalışma kaynakları</span><h1>Çöz, kontrol et, paylaş.</h1><p>Limit, türev ve integral için kısa tekrar notları ve altışar alıştırma. PDF’lerde ilk sayfa sorulara, ikinci sayfa açıklamalı cevaplara ayrılır.</p></header>
    <section className="resource-grid" aria-label="Çalışma kağıtları">{studyResources.map((r) => <article className="resource-card" key={r.slug}><span>{r.level} · 2 sayfa PDF</span><h2><Link href={`/kaynaklar/${r.slug}`}>{r.title}</Link></h2><p>{r.description}</p><Link href={`/kaynaklar/${r.slug}`}>Soruları ve cevapları incele →</Link><a href={`/kaynaklar/${r.slug}.pdf`} download>PDF indir</a></article>)}</section>
    <section className="topic-study"><h2>Nasıl kullanılır?</h2><p>Önce cevaplara bakmadan çöz. Ardından çözüm yolunu karşılaştır; takıldığın noktada bağlantılı derse dön. Bu seçki tüm müfredatı veya bir sınavın kapsamını temsil etmez.</p><p>Bu özgün MatAI çalışma kağıtlarını kaynak bağlantısını koruyarak kişisel çalışmanda ve dersinde ücretsiz kullanabilir, öğrenci ve öğretmenlerle paylaşabilirsin.</p></section>
  </main><PublicFooter /></div>;
}
