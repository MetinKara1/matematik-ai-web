import PublicHeader from '../../../components/public/PublicHeader';
import PublicFooter from '../../../components/public/PublicFooter';

const appStoreLink = 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761';

export const metadata = {
  title: 'AI Math Solver from Photo with Step-by-Step Help',
  description: 'Upload or photograph a math problem and review an AI-generated step-by-step explanation across algebra, geometry, trigonometry, and calculus.',
  alternates: { canonical: '/en/ai-math-solver', languages: { tr: '/yapay-zeka-matematik-cozucu', en: '/en/ai-math-solver', 'x-default': '/yapay-zeka-matematik-cozucu' } },
  openGraph: { title: 'AI Math Solver from Photo | MatAI', description: 'Ask a math question by photo, text, or voice and review the steps.', type: 'website', url: '/en/ai-math-solver', locale: 'en_US', siteName: 'MatAI', images: ['/assets/og/matai-ai-matematik-cozucu.png'] },
};

export default function EnglishAiMathSolverPage() {
  const topics = ['Algebra', 'Geometry', 'Trigonometry', 'Derivatives', 'Integrals', 'Limits', 'Word Problems', 'Calculus'];
  const faq = [
    ['How do I solve a math problem from a photo?', 'Open the camera in MatAI, capture the complete problem clearly, and review the detected expression before opening the explanation.'],
    ['Which topics does MatAI support?', 'MatAI can help with many questions in algebra, geometry, trigonometry, limits, derivatives, integrals, and calculus.'],
    ['Does MatAI show only the final answer?', 'No. MatAI is designed to present the reasoning in steps so you can study the method as well as the result.'],
    ['Is MatAI available on Android?', 'MatAI is currently available for iPhone and iPad. The Android version has not been released yet.'],
  ];
  const pageUrl = 'https://matematik-ai.com/en/ai-math-solver';
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', url: pageUrl, name: metadata.title, description: metadata.description, inLanguage: 'en' },
    { '@type': 'SoftwareApplication', name: 'MatAI', operatingSystem: 'iOS, iPadOS', applicationCategory: 'EducationalApplication', url: pageUrl, installUrl: appStoreLink },
    { '@type': 'FAQPage', mainEntity: faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
  ] };
  return <div className="solver-landing-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <PublicHeader locale="en" languageHref="/yapay-zeka-matematik-cozucu" /><main>
      <section className="solver-hero"><div className="solver-hero-copy"><span className="solver-kicker">MatAI · iOS app</span><h1>Turn a photo into a step-by-step math explanation.</h1><p>Take a photo, type the problem, or ask by voice. MatAI helps you examine the method and each step—not only the final answer.</p><div className="solver-actions"><a href={appStoreLink} target="_blank" rel="noopener noreferrer" className="solver-primary-action">Download on the App Store</a><a href="#how-it-works" className="solver-secondary-action">See how it works</a></div><small>Available for iPhone and iPad · Android coming soon</small></div>
      <div className="solver-demo" aria-label="Example step-by-step solution"><div className="solver-demo-top"><span>MatAI</span><em>Step-by-step</em></div><div className="solver-demo-question">∫ x·e<sup>x</sup> dx = ?</div><ol><li><span>1</span><p><strong>Choose a method</strong>The integrand is a product, so use integration by parts.</p></li><li><span>2</span><p><strong>Assign terms</strong>Let u = x and dv = e<sup>x</sup>dx.</p></li><li><span>3</span><p><strong>Simplify</strong>e<sup>x</sup>(x − 1) + C</p></li></ol></div></section>
      <section className="solver-section" id="how-it-works"><div className="solver-section-heading"><span>Three simple steps</span><h2>How to use the photo math solver</h2><p>Capture long expressions without retyping every symbol.</p></div><div className="solver-steps"><article><b>01</b><h3>Send the problem</h3><p>Take a clear photo, choose an image, type the question, or ask by voice.</p></article><article><b>02</b><h3>Review the reasoning</h3><p>Follow the AI-generated method and calculations in order.</p></article><article><b>03</b><h3>Practice independently</h3><p>Try a similar problem yourself and verify important calculations.</p></article></div></section>
      <section className="solver-benefits"><div><span className="solver-kicker">More than an answer</span><h2>Study the method behind the result</h2><p>A final number does not teach the process. MatAI separates the solution into readable steps to help you understand which rule is being used.</p><ul><li>Breaks the method into steps.</li><li>Makes the order of operations easier to follow.</li><li>Lets registered users revisit previous solutions.</li><li>Supports sharing solved questions.</li></ul></div><aside><strong>Supported topics</strong><div>{topics.map((topic) => <span key={topic}>{topic}</span>)}</div></aside></section>
      <section className="solver-section solver-faq"><div className="solver-section-heading"><span>Common questions</span><h2>About the MatAI math solver</h2></div><div className="solver-faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      <section className="solver-final-cta"><div><span>Stuck on a problem?</span><h2>Capture it and review the steps with MatAI.</h2></div><a href={appStoreLink} target="_blank" rel="noopener noreferrer">Open MatAI on the App Store</a></section>
    </main><PublicFooter locale="en" /></div>;
}
