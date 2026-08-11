import PublicHeader from '../../components/public/PublicHeader';

const appStoreLink = 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761';

export const metadata = {
  title: 'Yapay Zekâ Matematik Çözücü – Fotoğrafla Soru Çözme',
  description: 'MatAI yapay zekâ matematik çözücü ile sorunuzun fotoğrafını çekin veya metin olarak sorun; çözüm yolunu adım adım inceleyin.',
  alternates: { canonical: '/yapay-zeka-matematik-cozucu' },
  openGraph: {
    title: 'Yapay Zekâ Matematik Çözücü | MatAI',
    description: 'Matematik sorularını fotoğraf, metin veya sesle sorun; yapay zekâ destekli adım adım çözümleri inceleyin.',
    type: 'website', locale: 'tr_TR', url: '/yapay-zeka-matematik-cozucu',
  },
};

const topics = ['Cebir', 'Geometri', 'Trigonometri', 'Türev', 'İntegral', 'Limit', 'Problemler', 'Kalkülüs'];

export default function AiMathSolverPage() {
  return (
    <div className="solver-landing-page">
      <PublicHeader />
      <main>
        <section className="solver-hero">
          <div className="solver-hero-copy">
            <span className="solver-kicker">MatAI · iOS uygulaması</span>
            <h1>Yapay zekâ matematik çözücü ile çözüm yolunu anlayın.</h1>
            <p>Matematik sorusunun fotoğrafını çekin, metin olarak yazın veya sesli sorun. MatAI yalnızca sonucu değil, çözüme götüren adımları da anlaşılır biçimde gösterir.</p>
            <div className="solver-actions">
              <a href={appStoreLink} target="_blank" rel="noopener noreferrer" className="solver-primary-action">App Store&apos;dan indirin</a>
              <a href="#nasil-calisir" className="solver-secondary-action">Nasıl çalıştığını görün</a>
            </div>
            <small>iPhone ve iPad için kullanılabilir · Android sürümü yakında</small>
          </div>
          <div className="solver-demo" aria-label="MatAI örnek matematik çözümü">
            <div className="solver-demo-top"><span>MatAI</span><em>Adım adım çözüm</em></div>
            <div className="solver-demo-question">∫ x·e<sup>x</sup> dx = ?</div>
            <ol>
              <li><span>1</span><p><strong>Yöntemi seç</strong>İki farklı fonksiyon çarpım halinde olduğu için kısmi integrasyon kullanılır.</p></li>
              <li><span>2</span><p><strong>Değişkenleri belirle</strong>u = x ve dv = e<sup>x</sup> dx seçilir.</p></li>
              <li><span>3</span><p><strong>Sonucu bul</strong>e<sup>x</sup>(x − 1) + C</p></li>
            </ol>
          </div>
        </section>

        <section className="solver-section" id="nasil-calisir">
          <div className="solver-section-heading">
            <span>Üç kolay adım</span><h2>Fotoğrafla matematik sorusu nasıl çözülür?</h2>
            <p>Uzun ifadeleri elle yazmak zorunda kalmadan sorunuzu MatAI&apos;a aktarabilirsiniz.</p>
          </div>
          <div className="solver-steps">
            <article><b>01</b><h3>Sorunuzu gönderin</h3><p>Kamerayla fotoğraf çekin, galeriden seçin, metin yazın veya sesli sorun.</p></article>
            <article><b>02</b><h3>Çözümü inceleyin</h3><p>Yapay zekâ destekli matematik çözümünü ve kullanılan yöntemi adım adım takip edin.</p></article>
            <article><b>03</b><h3>Öğrendiklerinizi uygulayın</h3><p>Benzer bir soruyu kendiniz çözerek yöntemi pekiştirin ve eski çözümlerinize yeniden ulaşın.</p></article>
          </div>
        </section>

        <section className="solver-benefits">
          <div>
            <span className="solver-kicker">Cevaptan daha fazlası</span>
            <h2>Matematik soru çözme uygulaması neden adımları göstermeli?</h2>
            <p>Bir sonuca ulaşmak, yöntemi öğrendiğiniz anlamına gelmez. MatAI çözümün hangi kurala dayandığını ve işlemlerin nasıl ilerlediğini göstererek konuyu anlamanıza yardımcı olur.</p>
            <ul><li>Çözüm yöntemini adımlara ayırır.</li><li>İşlem sırasını takip etmeyi kolaylaştırır.</li><li>Eski çözümlerinize yeniden bakmanızı sağlar.</li><li>Çözümleri paylaşmanıza yardımcı olur.</li></ul>
          </div>
          <aside><strong>Desteklenen konular</strong><div>{topics.map((topic) => <span key={topic}>{topic}</span>)}</div></aside>
        </section>

        <section className="solver-section solver-faq">
          <div className="solver-section-heading"><span>Merak edilenler</span><h2>Yapay zekâ matematik çözücü hakkında</h2></div>
          <div className="solver-faq-list">
            <details><summary>MatAI yalnızca fotoğraftan mı soru çözer?</summary><p>Hayır. Matematik sorunuzu fotoğrafla gönderebilir, metin olarak yazabilir veya sesli biçimde aktarabilirsiniz.</p></details>
            <details><summary>MatAI hangi matematik konularını destekler?</summary><p>Cebir, geometri, trigonometri, limit, türev, integral ve kalkülüs dahil birçok matematik konusunda çözüm desteği sunar.</p></details>
            <details><summary>Uygulama yalnızca cevabı mı gösterir?</summary><p>MatAI yalnızca nihai cevabı değil, sorunun çözüm yolunu adım adım inceleyebilmenizi amaçlar.</p></details>
            <details><summary>Android sürümü var mı?</summary><p>MatAI şu anda iPhone ve iPad için App Store&apos;da bulunuyor. Android sürümü henüz yayınlanmadı.</p></details>
          </div>
        </section>

        <section className="solver-final-cta">
          <div><span>Bir soruya mı takıldınız?</span><h2>Fotoğrafını çekin, çözüm adımlarını MatAI ile inceleyin.</h2></div>
          <a href={appStoreLink} target="_blank" rel="noopener noreferrer">MatAI&apos;ı App Store&apos;da açın</a>
        </section>
      </main>
    </div>
  );
}
