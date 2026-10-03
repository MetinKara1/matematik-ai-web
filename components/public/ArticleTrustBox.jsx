import Link from 'next/link';

export default function ArticleTrustBox() {
  return (
    <aside className="article-trust" aria-label="İçerik bilgisi">
      <div><span>Hazırlayan ve yayımlayan</span><strong><Link href="/hakkimizda#icerik-ekibi">MatAI İçerik Ekibi</Link></strong></div>
      <p>Bu yayının sorumlusu MatAI İçerik Ekibi’dir. Adı ve uzmanlığı belirtilmiş bir bağımsız inceleyici kaydı bu sayfada sunulmuyor. Güncelleme tarihi, uzman onayı anlamına gelmez.</p>
      <div className="article-trust-links"><Link href="/hakkimizda">MatAI hakkında</Link><Link href="/icerik-politikasi#inceleme">İnceleme ölçütleri</Link><Link href="/icerik-politikasi#duzeltme">Hata bildirimi ve düzeltmeler</Link></div>
    </aside>
  );
}
