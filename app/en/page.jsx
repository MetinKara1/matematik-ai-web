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
    { '@type': 'WebSite', '@id': 'https://matematik-ai.com/en#website', url: 'https://matematik-ai.com/en', name: 'MatAI', inLanguage: 'en' },
    { '@type': 'SoftwareApplication', name: 'MatAI', applicationCategory: 'EducationalApplication', operatingSystem: 'iOS, iPadOS', url: 'https://matematik-ai.com/en', installUrl: appStoreLink, inLanguage: 'en' },
  ] };
  return <div className="landing-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <PublicHeader locale="en" languageHref="/" />
    <main>
      <section className="hero-section" id="how-it-works"><div className="hero-content">
        <div className="logo-container"><img src="/assets/MatAI-logo.png" alt="MatAI" className="logo-image" /><div className="logo-text-container"><div className="logo">MatAI</div><p className="tagline">Solve Math with AI</p></div></div>
        <h1 className="hero-title">Solve Math Problems<br /><span className="gradient-text">Step by Step</span></h1>
        <p className="hero-description">Take a photo, type your question, or ask by voice. MatAI helps you follow the reasoning behind the solution.</p>
        <div className="store-buttons"><a href={appStoreLink} target="_blank" rel="noopener noreferrer" className="store-button app-store"><span className="store-button-text"><strong>Download on the App Store</strong><small>For iPhone and iPad</small></span></a></div>
      </div><div className="hero-image"><div className="phone-mockup"><div className="phone-screen"><div className="app-preview"><div className="preview-header">MatAI</div><div className="preview-content"><div className="preview-math">∫ x² dx = ?</div><div className="preview-solution">= x³/3 + C</div></div></div></div></div></div></section>
      <section className="features-section" id="features"><div className="container"><h2 className="section-title">Why MatAI?</h2><div className="features-grid">{features.map(([icon,title,description]) => <article className="feature-card" key={title}><div className="feature-icon">{icon}</div><h3 className="feature-title">{title}</h3><p className="feature-description">{description}</p></article>)}</div></div></section>
      <section className="cta-section" id="download"><div className="container"><h2 className="cta-title">Start solving and learning</h2><p className="cta-description">Use MatAI on iPhone or iPad. The Android version is coming soon.</p><p className="landing-content-links"><a href="/en/ai-math-solver">Explore the AI Math Solver</a><span aria-hidden="true">·</span><a href="/en/articles">Read math guides</a></p></div></section>
    </main><PublicFooter locale="en" />
  </div>;
}
