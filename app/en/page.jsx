import Link from 'next/link';
import Image from 'next/image';
import { serializeStructuredData, applicationIdentity, publisherIdentity } from '../../lib/structuredData';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';
import MathSolverViewer from '../../components/public/MathSolverViewer';
import PricingSection from '../../components/public/PricingSection';

const logo = '/assets/MatAI-logo.png';
const appQrCode = '/assets/matai-ios-qr.png';
const appStoreLink = 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761';

export const metadata = {
  title: 'AI Math Solver with Step-by-Step Explanations | MatAI',
  description: 'Solve algebra, geometry, calculus, and more from a photo, text, or voice with the MatAI AI math solver. See every intermediate step clearly.',
  alternates: { canonical: '/en', languages: { tr: '/', en: '/en', 'x-default': '/' } },
  openGraph: {
    title: 'MatAI – AI Math Solver with Step-by-Step Explanations',
    description: 'Solve math problems and study each calculation step with MatAI.',
    type: 'website',
    url: '/en',
    locale: 'en_US',
    alternateLocale: ['tr_TR'],
    siteName: 'MatAI',
    images: ['/assets/og/matai-ai-matematik-cozucu.png']
  }
};

export default function EnglishHomePage() {
  const features = [
    {
      icon: '🧮',
      title: 'Smart Problem Solving',
      description: 'Solve math problems by taking a photo, typing LaTeX formulas, or asking by voice with instant results.'
    },
    {
      icon: '📚',
      title: 'Step-by-Step Explanations',
      description: 'Study intermediate calculations, factoring, substitutions, and applied theorems instead of only seeing the final number.'
    },
    {
      icon: '⚡',
      title: 'Fast & Verified Guidance',
      description: 'Get verified step-by-step mathematical reasoning in seconds to prepare thoroughly for exams and homework.'
    },
    {
      icon: '🎯',
      title: 'Wide Curriculum Coverage',
      description: 'Comprehensive help across arithmetic, quadratic equations, trigonometry, limits, derivatives, and integrals.'
    },
    {
      icon: '🎙️',
      title: 'Voice & Math Keyboard',
      description: 'Type formulas effortlessly with visual math symbols or dictate questions using smart voice recognition.'
    },
    {
      icon: '📋',
      title: 'Saved Question History',
      description: 'Review your previously solved problems, bookmarked methods, and review notes anytime from your profile.'
    },
    {
      icon: '📖',
      title: 'Curriculum Study Guides',
      description: 'Access worked examples, step-by-step derivations, and exam practice sheets directly in your browser.'
    },
    {
      icon: '📤',
      title: 'Easy Sharing',
      description: 'Export solutions and share detailed math proofs with your teachers, classmates, and study groups.'
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://matematik-ai.com/en#website',
        url: 'https://matematik-ai.com/en',
        name: 'MatAI',
        inLanguage: 'en',
        publisher: publisherIdentity
      },
      { ...applicationIdentity }
    ]
  };

  return (
    <div className="landing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
      <PublicHeader locale="en" languageHref="/" />

      <main>
        {/* Top Interactive AI Math Solver & Mobile Scanner Widget */}
        <MathSolverViewer locale="en" />

        {/* Hero Section */}
        <section className="hero-section" id="how-it-works">
          <div className="hero-content">
            <div className="logo-container">
              <Image
                src={logo}
                alt="MatAI Logo"
                width={160}
                height={160}
                sizes="(max-width: 768px) 100px, 160px"
                className="logo-image"
              />
              <div className="logo-text-container">
                <div className="logo">MatAI</div>
                <p className="tagline">Solve Math with AI</p>
              </div>
            </div>

            <h1 className="hero-title">
              Solve Math Problems
              <br />
              <span className="gradient-text">Step by Step</span>
            </h1>

            <p className="hero-description">
              Take a photo, type your formula, or speak your question. MatAI helps
              you master the exact logic and method behind every math solution.
            </p>

            {/* Store Buttons */}
            <div className="store-buttons">
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button app-store"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="store-button-text">
                  <span className="store-button-label">Download on the App Store</span>
                  <span className="store-button-subtitle">For iPhone and iPad</span>
                </div>
              </a>

              <span
                className="store-button play-store store-button-disabled"
                aria-label="Android app coming soon"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.12L14.54,12.85L17.19,10.81L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="store-button-text">
                  <span className="store-button-label">Google Play</span>
                  <span className="store-button-subtitle">Coming Soon</span>
                </div>
              </span>
            </div>

            {/* QR Code */}
            <div className="app-qr app-qr-hero">
              <Image
                src={appQrCode}
                width={256}
                height={256}
                alt="Scan QR code to open MatAI on App Store"
              />
              <div>
                <strong>Scan with your iPhone</strong>
                <span>Open MatAI in the App Store. Android coming soon.</span>
              </div>
            </div>

            {/* Social Badges */}
            <div className="hero-social-channels" aria-label="MatAI social media channels">
              <a
                href="https://www.instagram.com/matai.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-badge hero-social-instagram"
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram <strong>@matai.app</strong></span>
              </a>
              <a
                href="https://www.youtube.com/@mataiapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-badge hero-social-youtube"
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.56 31.56 0 0 0 0 12a31.56 31.56 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.56 31.56 0 0 0 24 12a31.56 31.56 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
                </svg>
                <span>YouTube <strong>@mataiapp</strong></span>
              </a>
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

        {/* Free Web Calculators Section */}
        <section className="home-tools" aria-labelledby="home-tools-heading">
          <span className="tool-tag">Free Web Tools</span>
          <h2 id="home-tools-heading">Try an Instant Calculation</h2>
          <p>Solve equations, compute derivatives, and calculate polynomial integrals. Explore every step without registration.</p>
          <div className="tool-cards">
            <Link className="tool-card" href="/araclar/ikinci-dereceden-denklem-cozucu">
              <span className="tool-card-symbol" aria-hidden="true">ax²+bx+c=0</span>
              <h3>Quadratic Equation Solver</h3>
              <p>Compute discriminant (Δ), find real or complex roots, and review step-by-step factoring.</p>
              <span className="tool-card-action">Start calculation <span aria-hidden="true">↗</span></span>
            </Link>
            <Link className="tool-card" href="/araclar/polinom-turevi-hesaplayici">
              <span className="tool-card-symbol" aria-hidden="true">d/dx P(x)</span>
              <h3>Polynomial Derivative Calculator</h3>
              <p>Calculate derivatives term-by-term using the power rule, constant factor rule, and sum rule.</p>
              <span className="tool-card-action">Start calculation <span aria-hidden="true">↗</span></span>
            </Link>
            <Link className="tool-card" href="/araclar/polinom-integrali-hesaplayici">
              <span className="tool-card-symbol" aria-hidden="true">∫ P(x) dx</span>
              <h3>Polynomial Integral Calculator</h3>
              <p>Evaluate definite and indefinite integrals with reverse power rule and constant of integration +C.</p>
              <span className="tool-card-action">Start calculation <span aria-hidden="true">↗</span></span>
            </Link>
          </div>
          <Link href="/araclar">Browse all math calculators &amp; tools →</Link>
        </section>

        {/* Features Section */}
        <section className="features-section" id="features">
          <div className="container">
            <h2 className="section-title">Why MatAI?</h2>
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

        {/* Topic Hubs & Study Resources Section */}
        <section className="features-section" aria-labelledby="home-topics-heading">
          <div className="container">
            <h2 className="section-title" id="home-topics-heading">Curriculum Hubs &amp; Worked Math Guides</h2>
            <div className="topic-cards">
              <Link href="/en/articles/functions" className="topic-card">
                <span className="topic-card-top"><span className="topic-symbol" aria-hidden="true">f(x)</span><span>01 / 05</span></span>
                <h3>Functions</h3>
                <p>Master inputs, outputs, domain, range, transformations, composite and inverse functions.</p>
                <span className="topic-card-bottom">5 lessons <span aria-hidden="true">·</span> Open learning path <span aria-hidden="true">↗</span></span>
              </Link>
              <Link href="/en/articles/trigonometric-functions" className="topic-card">
                <span className="topic-card-top"><span className="topic-symbol" aria-hidden="true">sin θ</span><span>02 / 05</span></span>
                <h3>Trigonometry</h3>
                <p>Connect angles, radians, the unit circle, and trigonometric identities intuitively.</p>
                <span className="topic-card-bottom">5 lessons <span aria-hidden="true">·</span> Open learning path <span aria-hidden="true">↗</span></span>
              </Link>
              <Link href="/en/articles/limit-and-continuity" className="topic-card">
                <span className="topic-card-top"><span className="topic-symbol" aria-hidden="true">lim</span><span>03 / 05</span></span>
                <h3>Limits &amp; Continuity</h3>
                <p>Explore approaching values, one-sided limits, continuity tests, and indeterminate forms.</p>
                <span className="topic-card-bottom">7 lessons <span aria-hidden="true">·</span> Open learning path <span aria-hidden="true">↗</span></span>
              </Link>
              <Link href="/en/articles/derivative-rules" className="topic-card">
                <span className="topic-card-top"><span className="topic-symbol" aria-hidden="true">d/dx</span><span>04 / 05</span></span>
                <h3>Derivatives</h3>
                <p>Understand instantaneous rate of change, power, product, quotient, and chain rules.</p>
                <span className="topic-card-bottom">12 lessons <span aria-hidden="true">·</span> Open learning path <span aria-hidden="true">↗</span></span>
              </Link>
              <Link href="/en/articles/integral-formulas" className="topic-card">
                <span className="topic-card-top"><span className="topic-symbol" aria-hidden="true">∫</span><span>05 / 05</span></span>
                <h3>Integrals</h3>
                <p>Relate antiderivatives, Riemann sums, substitution method, and area under curves.</p>
                <span className="topic-card-bottom">8 lessons <span aria-hidden="true">·</span> Open learning path <span aria-hidden="true">↗</span></span>
              </Link>
            </div>
            <p className="landing-content-links">
              <Link href="/en/articles">Browse all math articles &amp; guides</Link>
              <span aria-hidden="true">·</span>
              <Link href="/en/ai-math-solver">Interactive AI Math Solver</Link>
              <span aria-hidden="true">·</span>
              <Link href="/en/articles/derivative-rules">Derivative rules cheat sheet</Link>
              <span aria-hidden="true">·</span>
              <Link href="/en/articles/integral-formulas">Integral formulas guide</Link>
            </p>
          </div>
        </section>

        {/* Pricing & Polar Pro Plans in USD */}
        <PricingSection locale="en" />

        {/* CTA Section */}
        <section className="cta-section" id="download">
          <div className="container">
            <h2 className="cta-title">Start Solving and Learning Today</h2>
            <p className="cta-description">
              Solving math problems has never been easier. Learn the logic behind
              every calculation with MatAI!
            </p>
            <p className="landing-content-links">
              <Link href="/en/ai-math-solver">Explore the AI Math Solver</Link>
              <span aria-hidden="true">·</span>
              <Link href="/en/articles">Read math articles &amp; study guides</Link>
            </p>
            <div className="app-qr app-qr-centered">
              <Image
                src={appQrCode}
                loading="lazy"
                width={256}
                height={256}
                alt="QR code to download MatAI iOS app from the App Store"
              />
              <div>
                <strong>Scan with your iPhone</strong>
                <span>Download now on iOS. Android version coming soon.</span>
              </div>
            </div>
            <div className="store-buttons">
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button app-store"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="store-button-text">
                  <span className="store-button-label">Download on the App Store</span>
                  <span className="store-button-subtitle">For iPhone and iPad</span>
                </div>
              </a>

              <span
                className="store-button play-store store-button-disabled"
                aria-label="Android app coming soon"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.12L14.54,12.85L17.19,10.81L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="store-button-text">
                  <span className="store-button-label">Google Play</span>
                  <span className="store-button-subtitle">Coming Soon</span>
                </div>
              </span>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter locale="en" />
    </div>
  );
}
