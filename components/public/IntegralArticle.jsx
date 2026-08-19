import Link from 'next/link';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import ArticleTrustBox from './ArticleTrustBox';
import ArticleHeroVisual from './ArticleHeroVisual';

const appQrCode = '/assets/matai-ios-qr.png';
const appStoreLink = 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761';

function IntegralArticle() {
  return (
    <div className="article-page">
      <PublicHeader />

      <main className="article-main">
        <article className="article-card">
          <header className="article-heading">
            <nav className="article-breadcrumb" aria-label="Sayfa yolu">
              <Link href="/">Ana Sayfa</Link>
              <span aria-hidden="true">›</span>
              <Link href="/makaleler">Makaleler</Link>
              <span aria-hidden="true">›</span>
              <span>İntegral Sorusu Nasıl Çözülür?</span>
            </nav>
            <span className="article-category">İntegral · AYT Matematik</span>
            <h1>İntegral Sorusu Nasıl Çözülür? Adım Adım Bir Örnekle Anlatıyorum</h1>
            <p className="article-summary">
              Kısmi integrasyon yöntemini ne zaman kullanacağınızı ve doğru sonuca nasıl ulaşacağınızı
              örnek bir soru üzerinden birlikte inceleyelim.
            </p>
            <div className="article-meta" aria-label="Makale bilgileri">
              <time dateTime="2026-08-11">11 Ağustos 2026</time>
              <span>8 dakika okuma</span>
              <span>Adım adım anlatım</span>
              <span>Çözümlü örnek</span>
            </div>
            <ArticleHeroVisual slug="integral-sorusu-nasil-cozulur" title="İntegral Sorusu Nasıl Çözülür?" priority />
          </header>
          <div className="article-content">
            <nav className="article-toc" aria-label="İçindekiler">
              <span>Bu yazıda</span>
              <a href="#soru">Soru</a>
              <a href="#yontem">Yöntemi tanıyalım</a>
              <a href="#uygulama">Formüle yerleştirelim</a>
              <a href="#sonuc">Sonucu yazalım</a>
              <a href="#saglama">Sağlaması</a>
              <a href="#hatalar">Sık yapılan hatalar</a>
            </nav>

            <div className="article-body">
              <div className="article-answer"><span>Kısaca</span><p>İntegral sorusunda önce ifadenin yapısını tanıyın; çarpım hâlindeki polinom ve üstel fonksiyonlarda kısmi integrasyon uygulayın ve sonucu türev alarak kontrol edin.</p></div>
              <div className="article-intro">
                <p>İntegral, çoğu öğrencinin matematikte en çok zorlandığı konuların başında geliyor. Bunu hem kendi öğrencilik yıllarımdan hem de soru çözerken bana ulaşan öğrencilerden biliyorum. İşin ilginç tarafı şu: İntegral aslında zor bir konu değil, ama doğru yöntemi seçemediğinizde saatlerce aynı soruya bakıp kalabiliyorsunuz.</p>
                <p>Bu yazıda AYT&apos;de sıkça karşımıza çıkan bir integral tipini, kısmi integrasyon (parçalı integral) gerektiren bir soruyu adım adım çözeceğim. Sonunda da bu tarz sorulara nasıl daha hızlı yaklaşabileceğinize dair birkaç tavsiyem olacak.</p>
              </div>

            <section id="soru">
              <h2>Soru</h2>
              <div className="article-math article-math-question" aria-label="x çarpı e üzeri x integralinin sonucu nedir">
                ∫ x·e<sup>x</sup> dx integralinin sonucu nedir?
              </div>
              <p>Bu soru ilk bakışta basit görünüyor ama çok öğrencinin takıldığı bir nokta var: İçeride iki farklı fonksiyon çarpım halinde duruyor. Bir tarafta polinom (x), diğer tarafta üstel fonksiyon (e<sup>x</sup>). Böyle bir durumda doğrudan integral alamayız, kısmi integrasyon yöntemine başvurmamız gerekiyor.</p>
            </section>

            <section id="yontem">
              <h2>Adım 1: Yöntemi Tanıyalım</h2>
              <p>Kısmi integrasyon formülü şu:</p>
              <div className="article-math">∫ u dv = u·v − ∫ v du</div>
              <p>Buradaki asıl mesele u ve dv&apos;yi doğru seçmek. Kullanışlı pratik kural şudur: <strong>Türev alınca sadeleşen fonksiyonu u seç.</strong> Polinomlar türev alındıkça derecesi düşer, yani sadeleşir. O yüzden burada:</p>
              <div className="article-math article-math-lines">
                <span>u = x → du = dx</span>
                <span>dv = e<sup>x</sup> dx → v = e<sup>x</sup></span>
              </div>
            </section>

            <section id="uygulama">
              <h2>Adım 2: Formüle Yerleştirelim</h2>
              <div className="article-math">∫ x·e<sup>x</sup> dx = x·e<sup>x</sup> − ∫ e<sup>x</sup> dx</div>
              <p>Bakın ne oldu? Sağ taraftaki integral artık çok basit. ∫ e<sup>x</sup> dx zaten e<sup>x</sup>&apos;in kendisi.</p>
            </section>

            <section id="sonuc">
              <h2>Adım 3: Sonucu Yazalım</h2>
              <div className="article-math article-math-lines">
                <span>∫ x·e<sup>x</sup> dx = x·e<sup>x</sup> − e<sup>x</sup> + C</span>
                <span>∫ x·e<sup>x</sup> dx = e<sup>x</sup>(x − 1) + C</span>
              </div>
              <p><strong>C sabitini unutmayın.</strong> Belirsiz integrallerde bunu yazmadığınızda sınavlarda puan kaybı yaşayabilirsiniz.</p>
            </section>

            <section id="saglama">
              <h2>Sağlaması Nasıl Yapılır?</h2>
              <p>İntegralin en güzel yanı, sonucun doğru olup olmadığını her zaman kontrol edebilmeniz. Bulduğumuz sonucun türevini alalım:</p>
              <p>Bu adımdaki kuralları hatırlamak isterseniz <Link href="/makaleler/turev-alma-kurallari" className="article-inline-link">türev alma kuralları rehberini</Link> inceleyebilirsiniz.</p>
              <div className="article-math">d/dx [e<sup>x</sup>(x − 1) + C] = e<sup>x</sup>(x − 1) + e<sup>x</sup>·1 = e<sup>x</sup>·x</div>
              <p>Evet, başladığımız fonksiyona geri döndük. Demek ki çözümümüz doğru.</p>
            </section>

            <section id="hatalar">
              <h2>Öğrencilerin En Sık Yaptığı Hatalar</h2>
              <p>Bu konuda iki klasik hata öne çıkar. Birincisi, u ve dv seçimini ters yapmaktır. Eğer u = e<sup>x</sup> seçilirse integral basitleşmek yerine daha karmaşık hale gelir. İkincisi ise formüldeki eksi işaretini unutmaktır; küçük görünen bu hata sonucu tamamen değiştirir.</p>
              <p>Bir de şunu ekleyeyim: Kısmi integrasyon bazen bir kez yetmez. Mesela ∫ x²·e<sup>x</sup> dx sorusunda yöntemi iki kez üst üste uygulamanız gerekir. Panik yapmayın, mantık hep aynı.</p>
            </section>

            <section>
              <h2>Takıldığınız Sorularda Ne Yapmalı?</h2>
              <p>İntegral bol pratik isteyen bir konudur. Çözümlü bir kaynağa veya öğretmene hemen ulaşılamadığında MatAI uygulamasıyla sorunun fotoğrafını çekebilir ve yapay zekâ tarafından oluşturulan adım adım çözümü inceleyebilirsiniz. Yalnızca sonucu değil, kullanılan çözüm yolunu görmek “hangi yöntemi seçmeliyim?” sorusunu anlamaya yardımcı olabilir.</p>
              <p>Yapay zekâ desteğini kullanmadan önce soruyu kendiniz çözmeyi deneyin. Çözüme baktıktan sonra benzer bir soruyu yardım almadan yeniden çözmek, yöntemi gerçekten öğrenip öğrenmediğinizi kontrol etmenizi sağlar. Yapay zekâ çıktılarının hata içerebileceğini unutmayın ve kritik işlemleri ayrıca doğrulayın.</p>
              <p>Temel kurallar veya C sabiti konusunda eksiğiniz varsa önce <Link href="/makaleler/belirsiz-integral-nedir" className="article-inline-link">belirsiz integral konu anlatımını</Link> okuyabilirsiniz. Farklı soruların çözüm yöntemini görmek için de <Link href="/yapay-zeka-matematik-cozucu" className="article-inline-link">MatAI yapay zekâ matematik çözücü</Link> sayfasını inceleyin.</p>
            </section>

            <aside className="article-cta">
              <div className="article-cta-copy">
                <h2>Matematik sorularında takıldınız mı?</h2>
                <p>MatAI ile sorunuzun fotoğrafını çekin, adım adım çözümü saniyeler içinde görün. iOS uygulaması şimdi App Store&apos;da; Android sürümü yakında.</p>
                <a href={appStoreLink} target="_blank" rel="noopener noreferrer">App Store&apos;dan indirin</a>
              </div>
              <div className="article-cta-qr">
                <img src={appQrCode} alt="MatAI iOS uygulamasını App Store'da açmak için QR kod" />
                <span>iPhone ile tarayın · Android yakında</span>
              </div>
            </aside>

            <p className="article-next">Sıradaki konu: değişken değiştirme yöntemiyle karmaşık integralleri sadeleştirmek.</p>
            <div className="article-related">
              <span>Sonraki okuma</span>
              <Link href="/makaleler/integralde-degisken-degistirme">
                <strong>İntegralde Değişken Değiştirme</strong>
                <small>u dönüşümünü çözümlü örneklerle öğrenin →</small>
              </Link>
            </div>
            <ArticleTrustBox />
            </div>
          </div>
        </article>
      </main><PublicFooter />
    </div>
  );
}

export default IntegralArticle;
