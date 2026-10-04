import { serializeStructuredData } from '../../lib/structuredData';
import Link from 'next/link';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';
import MathToolCards from '../../components/public/MathToolCards';
import { mathTools } from '../../lib/mathTools';

const title = 'Ücretsiz Matematik Araçları – Denklem, Türev ve İntegral';
const description = 'Denklem çözün, polinom türevi ve integrali hesaplayın. Ücretsiz ve üyeliksiz web araçlarında sonucu işlem adımlarıyla öğrenin.';
export const metadata = { title, description, alternates: { canonical: '/araclar' }, openGraph: { title, description, url: '/araclar', locale: 'tr_TR', type: 'website' }, twitter: { card: 'summary', title, description } };
export default function ToolsPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description, url: 'https://matematik-ai.com/araclar', inLanguage: 'tr-TR', mainEntity: { '@type': 'ItemList', itemListElement: mathTools.map((tool, i) => ({ '@type': 'ListItem', position: i + 1, name: tool.title, url: `https://matematik-ai.com/araclar/${tool.slug}` })) } };
  return <div className="math-tools-page"><PublicHeader /><main className="tools-main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(schema) }} />
    <nav className="tool-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana sayfa</Link><span aria-hidden="true">/</span><span>Matematik araçları</span></nav>
    <header className="tools-hero"><span className="tool-tag">Tarayıcıda hesapla · Adım adım öğren</span><h1>Matematik araçları</h1><p>Denklem çöz, türev al, integral hesapla. Ücretsiz araçlarla kendi örneğini dene ve sonuca giden işlemleri incele.</p><div className="tool-benefits"><span>Üyelik gerekmez</span><span>Telefonda ve bilgisayarda</span><span>Girdiler cihazında kalır</span></div></header>
    <MathToolCards />
    <section className="tool-reading"><h2>Hangi aracı kullanmalıyım?</h2><p>Bilinmeyenin değerini arıyorsan denklem çözücüyü, bir polinomun değişim hızını bulmak için türev hesaplayıcıyı kullan. İlkel fonksiyon veya bir aralıktaki işaretli birikim için integral hesaplayıcıyı seç.</p><p>Denklem aracı birinci ve ikinci derece denklemleri, türev ve integral araçları en fazla 10. dereceden polinomları destekler. Her sayfada desteklenen yazım biçimleri ve sınırlar açıklanır.</p><h2>Hesaplamadan konu anlatımına</h2><p>Bir kuralın neden çalıştığını öğrenmek için <Link href="/makaleler">matematik konu anlatımlarına</Link> geçebilirsin. Fotoğraftan veya sesli soruyla yapay zekâ desteği arıyorsan <Link href="/yapay-zeka-matematik-cozucu">MatAI uygulamasını incele</Link>.</p></section>
    </main><PublicFooter /></div>;
}
