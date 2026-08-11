import Link from 'next/link';
import PublicHeader from '../../components/public/PublicHeader';

export const metadata = {
  title: 'Matematik Makaleleri ve Çözümlü Örnekler',
  description: 'Matematik konularını anlaşılır anlatımlar, pratik yöntemler ve adım adım çözümlü örneklerle öğrenin.',
  alternates: { canonical: '/makaleler' },
};

export default function ArticlesPage() {
  return (
    <div className="articles-page">
      <PublicHeader />

      <main className="articles-main">
        <header className="articles-hero">
          <span className="articles-eyebrow">MatAI Kütüphane</span>
          <h1>Matematiği ezberlemeden, mantığıyla öğrenin.</h1>
          <p>Kısa anlatımlar, çözümlü örnekler ve sınavda işinize yarayacak pratik yöntemler.</p>
        </header>

        <section className="articles-list" aria-labelledby="articles-title">
          <div className="articles-list-heading">
            <div>
              <span>Güncel içerikler</span>
              <h2 id="articles-title">Makaleler</h2>
            </div>
            <p>Yeni anlatımlar düzenli olarak eklenecek.</p>
          </div>

          <Link href="/makaleler/integral-sorusu-nasil-cozulur" className="article-list-card">
            <div className="article-list-visual" aria-hidden="true">
              <span>∫</span>
              <small>u · dv</small>
            </div>
            <div className="article-list-copy">
              <div className="article-list-meta">
                <span>İntegral</span>
                <span>8 dakika</span>
                <span>AYT Matematik</span>
              </div>
              <h3>İntegral Sorusu Nasıl Çözülür?</h3>
              <p>Kısmi integrasyon yöntemini ne zaman kullanacağınızı, doğru seçimi nasıl yapacağınızı ve sonucu nasıl kontrol edeceğinizi adım adım öğrenin.</p>
              <strong>Yazıyı oku <span aria-hidden="true">→</span></strong>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}
