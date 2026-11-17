import Link from 'next/link';
import { serializeStructuredData, applicationIdentity, publisherIdentity } from '../../lib/structuredData';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';

const appStoreLink = 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761';

export const metadata = {
  title: 'AI Math Solver with Step-by-Step Explanations',
  description: 'Solve algebra, geometry, calculus, and more from a photo, text, or voice with the MatAI AI math solver.',
  alternates: { canonical: '/en', languages: { tr: '/', en: '/en', 'x-default': '/' } },
  openGraph: { title: 'MatAI – AI Math Solver', description: 'Solve math problems and study each step with MatAI.', type: 'website', url: '/en', locale: 'en_US', alternateLocale: ['tr_TR'], siteName: 'MatAI', images: ['/assets/og/matai-ai-matematik-cozucu.png'] },
};

export default function EnglishHomePage() {
  const features = [
    ['🧮', 'Solve from a photo', 'Capture a problem with your camera or enter it as text.'],
    ['📚', 'Step-by-step explanations', 'Study the method behind the answer instead of seeing only the result.'],
    ['⚡', 'Fast guidance', 'Get a structured explanation in seconds and continue practicing.'],
    ['🎯', 'Multiple topics', 'Work through algebra, geometry, trigonometry, calculus, and more.'],
    ['📋', 'Saved questions', 'Return to previous solutions from your profile and review them later.'],
    ['📤', 'Easy sharing', 'Share solved questions with classmates and friends.'],
  ];
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': 'https://matematik-ai.com/en#website', url: 'https://matematik-ai.com/en', name: 'MatAI', inLanguage: 'en', publisher: publisherIdentity },
    { ...applicationIdentity },
  ] };
  return <div className="landing-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} />
    <PublicHeader locale="en" languageHref="/" />
    <main>
      <section className="hero-section" id="how-it-works"><div className="hero-content">
        <div className="logo-container"><img src="/assets/MatAI-logo.png" alt="MatAI" className="logo-image" /><div className="logo-text-container"><div className="logo">MatAI</div><p className="tagline">Solve Math with AI</p></div></div>
        <h1 className="hero-title">Solve Math Problems<br /><span className="gradient-text">Step by Step</span></h1>
        <p className="hero-description">Take a photo, type your question, or ask by voice. MatAI helps you follow the reasoning behind the solution.</p>
        <div className="store-buttons"><a href={appStoreLink} target="_blank" rel="noopener noreferrer" className="store-button app-store"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg><span className="store-button-text"><span className="store-button-label">Download on the App Store</span><span className="store-button-subtitle">For iPhone and iPad</span></span></a></div>
        <div className="hero-social-channels" aria-label="MatAI social media channels">
          <a href="https://www.instagram.com/matai.app" target="_blank" rel="noopener noreferrer" className="hero-social-badge hero-social-instagram">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            <span>Instagram <strong>@matai.app</strong></span>
          </a>
          <a href="https://www.youtube.com/@mataiapp" target="_blank" rel="noopener noreferrer" className="hero-social-badge hero-social-youtube">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.56 31.56 0 0 0 0 12a31.56 31.56 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.56 31.56 0 0 0 24 12a31.56 31.56 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
            <span>YouTube <strong>@mataiapp</strong></span>
          </a>
        </div>
      </div><div className="hero-image"><div className="phone-mockup"><div className="phone-screen"><div className="app-preview"><div className="preview-header">MatAI</div><div className="preview-content"><div className="preview-math">∫ x² dx = ?</div><div className="preview-solution">= x³/3 + C</div></div></div></div></div></div></section>
      <section className="features-section" id="features"><div className="container"><h2 className="section-title">Why MatAI?</h2><div className="features-grid">{features.map(([icon,title,description]) => <article className="feature-card" key={title}><div className="feature-icon">{icon}</div><h3 className="feature-title">{title}</h3><p className="feature-description">{description}</p></article>)}</div></div></section>
      <section className="features-section" aria-labelledby="study-guides-title"><div className="container">
        <h2 className="section-title" id="study-guides-title">Start with a worked math guide</h2>
        <p className="section-description">Review a rule, follow an example, then use it in your own problem.</p>
        <div className="features-grid">
          <Link className="feature-card" href="/en/articles/derivative-rules"><h3>Derivative rules</h3><p>Learn the power, product, quotient, and chain rules.</p></Link>
          <Link className="feature-card" href="/en/articles/differentiability-and-continuity"><h3>Differentiability and continuity</h3><p>Understand why a continuous function may still have no derivative.</p></Link>
          <Link className="feature-card" href="/en/articles/integration-rules"><h3>Integration rules</h3><p>Work from basic antiderivatives to choosing an integration method.</p></Link>
          <Link className="feature-card" href="/en/articles/integral-formulas"><h3>Integral formulas</h3><p>Essential indefinite and definite integral formulas with examples.</p></Link>
          <Link className="feature-card" href="/en/guides/ayt-parameter-quadratic-problems"><h3>Quadratic parameter problems</h3><p>Discriminant, vertex, and root relationships in exam questions.</p></Link>
          <Link className="feature-card" href="/en/news/2026-fields-medal-winners"><h3>2026 Fields Medal winners</h3><p>Meet the four mathematicians recognized at ICM 2026.</p></Link>
        </div>
        <p className="landing-content-links"><Link href="/en/articles">Browse all math articles &amp; guides →</Link></p>
      </div></section>
      <section className="cta-section" id="download"><div className="container"><h2 className="cta-title">Start solving and learning</h2><p className="cta-description">Use MatAI on iPhone or iPad. The Android version is coming soon.</p><p className="landing-content-links"><Link href="/en/ai-math-solver">Explore the AI Math Solver</Link><span aria-hidden="true">·</span><Link href="/en/articles">Read math guides</Link></p></div></section>
    </main><PublicFooter locale="en" />
  </div>;
}
