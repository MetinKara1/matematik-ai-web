import LandingPage from '../components/public/LandingPage';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': 'https://matematik-ai.com/#organization', name: 'MatAI', url: 'https://matematik-ai.com',
        logo: { '@type': 'ImageObject', url: 'https://matematik-ai.com/assets/MatAI-logo.png' },
      },
      {
        '@type': 'WebSite', '@id': 'https://matematik-ai.com/#website', url: 'https://matematik-ai.com', name: 'MatAI', inLanguage: 'tr-TR',
        publisher: { '@id': 'https://matematik-ai.com/#organization' },
      },
      {
        '@type': 'SoftwareApplication', '@id': 'https://matematik-ai.com/#app', name: 'MatAI', alternateName: 'MatAI - Yapay Zeka Matematik',
        description: 'Matematik sorularını fotoğraf, metin veya sesle sorarak yapay zekâ destekli adım adım çözümler almanızı sağlayan eğitim uygulaması.',
        applicationCategory: 'EducationalApplication', applicationSubCategory: 'Mathematics', operatingSystem: 'iOS, iPadOS',
        url: 'https://matematik-ai.com', installUrl: 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761',
        image: 'https://matematik-ai.com/assets/MatAI-logo.png', publisher: { '@id': 'https://matematik-ai.com/#organization' },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <LandingPage />
    </>
  );
}
