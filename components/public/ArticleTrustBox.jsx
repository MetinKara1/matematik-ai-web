import Link from 'next/link';

export default function ArticleTrustBox() {
  return (
    <aside className="article-trust" aria-label="İçerik bilgisi">
      <div><span>Hazırlayan ve yayımlayan</span><strong>MatAI İçerik Ekibi</strong></div>
      <p>Bu içerik kavram doğruluğu, işlem adımları ve anlatım açıklığı gözetilerek hazırlanır. Eğitim amaçlıdır; bir öğretmenin yönlendirmesinin yerini tutmaz.</p>
      <div className="article-trust-links"><Link href="/hakkimizda">MatAI hakkında</Link><Link href="/icerik-politikasi">Editoryal sürecimiz ve hata bildirimi</Link></div>
    </aside>
  );
}
