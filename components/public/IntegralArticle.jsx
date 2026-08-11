import Link from 'next/link';

const logo = '/assets/MatAI-logo.png';
const appQrCode = '/assets/matai-ios-qr.png';

function IntegralArticle() {
  return (
    <div className="article-page">
      <header className="article-site-header">
        <div className="article-site-header-inner">
          <Link href="/" className="article-brand" aria-label="MatAI ana sayfa">
            <img src={logo} alt="" />
            <span>MatAI</span>
          </Link>
          <Link href="/" className="article-home-link">Ana Sayfa</Link>
        </div>
      </header>

      <main className="article-main">
        <article className="article-card">
          <header className="article-heading">
            <span className="article-category">İntegral · AYT Matematik</span>
            <h1>İntegral Sorusu Nasıl Çözülür? Adım Adım Bir Örnekle Anlatıyorum</h1>
            <p className="article-summary">
              Kısmi integrasyon yöntemini ne zaman kullanacağınızı ve doğru sonuca nasıl ulaşacağınızı
              örnek bir soru üzerinden birlikte inceleyelim.
            </p>
          </header>

          <div className="article-content">
            <p>İntegral, çoğu öğrencinin matematikte en çok zorlandığı konuların başında geliyor. Bunu hem kendi öğrencilik yıllarımdan hem de soru çözerken bana ulaşan öğrencilerden biliyorum. İşin ilginç tarafı şu: İntegral aslında zor bir konu değil, ama doğru yöntemi seçemediğinizde saatlerce aynı soruya bakıp kalabiliyorsunuz.</p>
            <p>Bu yazıda AYT&apos;de sıkça karşımıza çıkan bir integral tipini, kısmi integrasyon (parçalı integral) gerektiren bir soruyu adım adım çözeceğim. Sonunda da bu tarz sorulara nasıl daha hızlı yaklaşabileceğinize dair birkaç tavsiyem olacak.</p>

            <section>
              <h2>Soru</h2>
              <div className="article-math article-math-question" aria-label="x çarpı e üzeri x integralinin sonucu nedir">
                ∫ x·e<sup>x</sup> dx integralinin sonucu nedir?
              </div>
              <p>Bu soru ilk bakışta basit görünüyor ama çok öğrencinin takıldığı bir nokta var: İçeride iki farklı fonksiyon çarpım halinde duruyor. Bir tarafta polinom (x), diğer tarafta üstel fonksiyon (e<sup>x</sup>). Böyle bir durumda doğrudan integral alamayız, kısmi integrasyon yöntemine başvurmamız gerekiyor.</p>
            </section>

            <section>
              <h2>Adım 1: Yöntemi Tanıyalım</h2>
              <p>Kısmi integrasyon formülü şu:</p>
              <div className="article-math">∫ u dv = u·v − ∫ v du</div>
              <p>Buradaki asıl mesele u ve dv&apos;yi doğru seçmek. Benim öğrencilere hep söylediğim pratik kural şu: <strong>Türev alınca sadeleşen fonksiyonu u seç.</strong> Polinomlar türev alındıkça derecesi düşer, yani sadeleşir. O yüzden burada:</p>
              <div className="article-math article-math-lines">
                <span>u = x → du = dx</span>
                <span>dv = e<sup>x</sup> dx → v = e<sup>x</sup></span>
              </div>
            </section>

            <section>
              <h2>Adım 2: Formüle Yerleştirelim</h2>
              <div className="article-math">∫ x·e<sup>x</sup> dx = x·e<sup>x</sup> − ∫ e<sup>x</sup> dx</div>
              <p>Bakın ne oldu? Sağ taraftaki integral artık çok basit. ∫ e<sup>x</sup> dx zaten e<sup>x</sup>&apos;in kendisi.</p>
            </section>

            <section>
              <h2>Adım 3: Sonucu Yazalım</h2>
              <div className="article-math article-math-lines">
                <span>∫ x·e<sup>x</sup> dx = x·e<sup>x</sup> − e<sup>x</sup> + C</span>
                <span>∫ x·e<sup>x</sup> dx = e<sup>x</sup>(x − 1) + C</span>
              </div>
              <p><strong>C sabitini unutmayın.</strong> Belirsiz integrallerde bunu yazmadığınızda sınavlarda puan kaybı yaşayabilirsiniz.</p>
            </section>

            <section>
              <h2>Sağlaması Nasıl Yapılır?</h2>
              <p>İntegralin en güzel yanı, sonucun doğru olup olmadığını her zaman kontrol edebilmeniz. Bulduğumuz sonucun türevini alalım:</p>
              <div className="article-math">d/dx [e<sup>x</sup>(x − 1) + C] = e<sup>x</sup>(x − 1) + e<sup>x</sup>·1 = e<sup>x</sup>·x</div>
              <p>Evet, başladığımız fonksiyona geri döndük. Demek ki çözümümüz doğru.</p>
            </section>

            <section>
              <h2>Öğrencilerin En Sık Yaptığı Hatalar</h2>
              <p>Yıllardır gördüğüm iki klasik hata var. Birincisi, u ve dv seçimini ters yapmak. Eğer u = e<sup>x</sup> seçseydiniz, integral basitleşmek yerine daha karmaşık hale gelirdi ve soru içinden çıkılmaz bir hal alırdı. İkincisi, formüldeki eksi işaretini unutmak. Küçük gibi görünen bu hata, sınavda dört yanlış bir doğru götürürken gerçekten can yakıyor.</p>
              <p>Bir de şunu ekleyeyim: Kısmi integrasyon bazen bir kez yetmez. Mesela ∫ x²·e<sup>x</sup> dx sorusunda yöntemi iki kez üst üste uygulamanız gerekir. Panik yapmayın, mantık hep aynı.</p>
            </section>

            <section>
              <h2>Takıldığınız Sorularda Ne Yapmalı?</h2>
              <p>Açıkçası integral, bol pratik isteyen bir konu. Ama hepimizin başına geliyor: Gece geç saatte ders çalışırken bir soruya takılıyorsunuz, çözümlü kaynak yok, hocaya soracak durum yok. Ben bu tarz anlar için öğrencilerime MatAI uygulamasını öneriyorum. Sorunun fotoğrafını çekiyorsunuz, yapay zeka saniyeler içinde adım adım çözümü karşınıza getiriyor. Sadece cevabı değil, çözüm yolunu da gösterdiği için yukarıda anlattığım gibi “hangi yöntemi seçmeliyim” kısmını da öğrenmiş oluyorsunuz.</p>
              <p>Tabii şunu da söylemeden geçmeyeyim: Uygulama ne kadar iyi olursa olsun, önce kendiniz uğraşın. On dakika düşünüp çözemediğiniz soruyu MatAI&apos;a sorun, çözümü inceleyin, sonra benzer bir soruyu kendiniz çözmeyi deneyin. Matematik böyle öğreniliyor.</p>
            </section>

            <aside className="article-cta">
              <div className="article-cta-copy">
                <h2>Matematik sorularında takıldınız mı?</h2>
                <p>MatAI ile sorunuzun fotoğrafını çekin, adım adım çözümü saniyeler içinde görün. iOS uygulaması şimdi App Store&apos;da; Android sürümü yakında.</p>
                <Link href="/#download">MatAI&apos;ı keşfedin</Link>
              </div>
              <div className="article-cta-qr">
                <img src={appQrCode} alt="MatAI iOS uygulamasını App Store'da açmak için QR kod" />
                <span>iPhone ile tarayın · Android yakında</span>
              </div>
            </aside>

            <p className="article-next">Bir sonraki yazıda değişken değiştirme yöntemini örneklerle anlatacağım.</p>
          </div>
        </article>
      </main>
    </div>
  );
}

export default IntegralArticle;
