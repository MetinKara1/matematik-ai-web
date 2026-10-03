import Link from 'next/link';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';
import TopicCards from '../../components/public/TopicCards';
import { topicHubs } from '../../lib/topicHubs';

const title = 'Matematik Konuları – Fonksiyonlardan İntegrale Çalışma Rehberi';
const description = 'Fonksiyonlar, trigonometri, limit, türev ve integral konularını doğru sırayla çalışın. Konu merkezlerinde dersler, kontrol soruları ve pratik araçlarını bulun.';
export const metadata = { title, description, alternates: { canonical: '/konular' }, openGraph: { title, description, url: '/konular', locale: 'tr_TR', type: 'website' }, twitter: { card: 'summary', title, description } };
export default function TopicsPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description, url: 'https://matematik-ai.com/konular', inLanguage: 'tr-TR', mainEntity: { '@type': 'ItemList', itemListOrder: 'https://schema.org/ItemListOrderAscending', itemListElement: topicHubs.map((topic, i) => ({ '@type': 'ListItem', position: i + 1, name: topic.title, url: `https://matematik-ai.com/konular/${topic.slug}` })) } };
  return <div className="topic-page"><PublicHeader /><main className="topic-main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <nav className="topic-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana sayfa</Link><span aria-hidden="true">/</span><span>Konular</span></nav>
    <header className="topic-hero"><span className="topic-eyebrow">MatAI öğrenme yolları</span><h1>Matematikte sıradaki adımını bul.</h1><p>Fonksiyonlardan integrale beş konu merkezi. Ön bilgini kontrol et, dersleri sırayla çalış ve öğrendiğini bir soruyla sına.</p></header>
    <section aria-labelledby="topic-list-heading"><h2 id="topic-list-heading">Konuya göre öğren</h2><p className="topic-section-intro">İlk kez çalışıyorsan aşağıdaki sıra iyi bir başlangıçtır. Bildiğin konuları geçip ihtiyacın olan merkezden de başlayabilirsin.</p><TopicCards /></section>
    <section className="topic-study"><h2>Bu yolu nasıl kullanmalısın?</h2><ol><li><strong>Ön bilgini kontrol et.</strong> Seçtiğin konunun girişindeki hazırlık notunu oku; eksik gördüğün temeli tamamla.</li><li><strong>Anlatımdan örneğe geç.</strong> Dersin çözümlü örneğini incele, sonra cevabı açmadan alıştırmayı dene.</li><li><strong>Sonucu açıklamaya çalış.</strong> Kontrol sorusunun yanıtından önce gerekçesini söyle. Takılırsan ilgili derse dön.</li></ol><p>Bu rehber kalkülüse hazırlık ve temel kalkülüs konularını kapsar. Sınav kapsamı ve yıllık konu listesi yerine geçmez.</p></section>
    <aside className="topic-practice"><div><span className="topic-eyebrow">Öğrendiğini uygula</span><h2>Bir hesaplamayı adım adım incele</h2><p>Denklem, polinom türevi ve integral araçlarında kendi örneğini deneyebilirsin.</p></div><Link href="/araclar">Matematik araçlarını aç →</Link></aside>
    <p className="topic-library-link">Belirli bir yazı veya güncel matematik içeriği mi arıyorsun? <Link href="/makaleler">Tüm makalelere göz at.</Link></p>
  </main><PublicFooter /></div>;
}
