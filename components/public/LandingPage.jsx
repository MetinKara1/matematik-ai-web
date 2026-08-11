import PublicHeader from "./PublicHeader";

const logo = "/assets/MatAI-logo.png";
const appQrCode = "/assets/matai-ios-qr.png";

function LandingPage() {
  // Mağaza linklerini buraya ekleyebilirsiniz
  const appStoreLink =
    "https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761"; // App Store linki

  const features = [
    {
      icon: "🧮",
      title: "Akıllı Soru Çözümü",
      description:
        "Matematik sorularınızı fotoğraf çekerek veya yazarak çözün. AI teknolojisi ile anında sonuç alın.",
    },
    {
      icon: "📚",
      title: "Adım Adım Çözüm",
      description:
        "Sadece cevabı değil, her adımı detaylı şekilde öğrenin. Matematik becerilerinizi geliştirin.",
    },
    {
      icon: "⚡",
      title: "Hızlı ve Doğru",
      description:
        "Saniyeler içinde sorunuzun çözümünü alın. Yapay zekâ destekli açıklamalarla çözüm yolunu adım adım inceleyin.",
    },
    {
      icon: "📱",
      title: "Her Yerde Kullanın",
      description: "MatAI'ı iPhone ve iPad cihazlarınızda kullanın. Android sürümü yakında.",
    },
    {
      icon: "🎯",
      title: "Tüm Konular",
      description:
        "Cebir, geometri, kalkülüs, trigonometri ve daha fazlası. Tüm matematik konularını kapsar.",
    },
    {
      icon: "💡",
      title: "Öğrenmeye Odaklı",
      description:
        "Sadece cevap değil, kavramları da öğrenin. Matematik bilginizi derinleştirin.",
    },
    {
      icon: "📋",
      title: "Geçmiş Sorular",
      description:
        "Uygulamaya kayıt olduğunuz takdirde çözdüğünüz tüm sorular Profilinizde veya Geçmiş Sorular ekranında kayıtlı kalır ve böylece çözümünü unuttuğunuz soruyu tekrar bulabilirsiniz.",
    },
    {
      icon: "📤",
      title: "Kolay Paylaşım",
      description:
        "Çözdüğünüz soruları WhatsApp gibi platformlardan arkadaşlarınız ile paylaşabilirsiniz.",
    },
  ];

  return (
    <div className="landing-page">
      <PublicHeader />

      <a
        href={appStoreLink}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-app-qr"
        aria-label="MatAI iOS uygulamasını App Store'da aç"
      >
        <img src={appQrCode} alt="MatAI iOS uygulaması için QR kod" />
        <span>
          <strong>iOS için indir</strong>
          <small>QR kodu tarayın</small>
          <em>Android yakında</em>
        </span>
      </a>

      {/* Hero Section */}
      <section className="hero-section" id="how-it-works">
        <div className="hero-content">
          <div className="logo-container">
            <img src={logo} alt="MatAI Logo" className="logo-image" />
            <div className="logo-text-container">
              <div className="logo">MatAI</div>
              <p className="tagline">Matematik Sorularınızı AI ile Çözün</p>
            </div>
          </div>

          <h1 className="hero-title">
            Matematik Sorularınızı
            <br />
            <span className="gradient-text">Saniyeler İçinde</span> Çözün
          </h1>

          <p className="hero-description">
            Fotoğraf çekin, sorunuzu yazın veya sesli sorun. Yapay zeka
            teknolojisi ile matematik sorularınızın detaylı çözümlerini anında
            alın.
          </p>

          {/* Store Buttons */}
          <div className="store-buttons">
            <a
              href={appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="store-button app-store"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="store-button-text">
                <span className="store-button-label">App Store'dan İndir</span>
                <span className="store-button-subtitle">iOS için</span>
              </div>
            </a>

            <span
              className="store-button play-store store-button-disabled"
              aria-label="Android uygulaması yakında"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.12L14.54,12.85L17.19,10.81L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="store-button-text">
                <span className="store-button-label">Google Play</span>
                <span className="store-button-subtitle">
                  Android için yakında
                </span>
              </div>
            </span>
          </div>
          <div className="app-qr app-qr-hero">
            <img
              src={appQrCode}
              alt="MatAI iOS uygulamasını App Store'dan indirmek için QR kod"
            />
            <div>
              <strong>iPhone ile tarayın</strong>
              <span>MatAI&apos;ı App Store&apos;da açın. Android yakında.</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="app-preview">
                <div className="preview-header">MatAI</div>
                <div className="preview-content">
                  <div className="preview-math">∫ x² dx = ?</div>
                  <div className="preview-solution">= x³/3 + C</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <h2 className="section-title">Neden MatAI?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="download">
        <div className="container">
          <h2 className="cta-title">Hemen İndirin ve Başlayın</h2>
          <p className="cta-description">
            Matematik sorularınızı çözmek artık çok kolay. MatAI ile öğrenmeye
            bugün başlayın!
          </p>
          <div className="app-qr app-qr-centered">
            <img
              src={appQrCode}
              alt="MatAI iOS uygulamasını App Store'dan indirmek için QR kod"
            />
            <div>
              <strong>iPhone ile QR kodu tarayın</strong>
              <span>iOS&apos;ta hemen indirin. Android sürümü yakında.</span>
            </div>
          </div>
          <div className="store-buttons">
            <a
              href={appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="store-button app-store"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="store-button-text">
                <span className="store-button-label">App Store'dan İndir</span>
                <span className="store-button-subtitle">iOS için</span>
              </div>
            </a>

            <span
              className="store-button play-store store-button-disabled"
              aria-label="Android uygulaması yakında"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.12L14.54,12.85L17.19,10.81L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="store-button-text">
                <span className="store-button-label">Google Play</span>
                <span className="store-button-subtitle">
                  Android için yakında
                </span>
              </div>
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2026 MatAI. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
