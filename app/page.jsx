import LandingPage from '../components/public/LandingPage';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MatAI',
    alternateName: 'MatAI - Yapay Zeka Matematik',
    description: 'Matematik sorularını fotoğraf, metin veya sesle sorarak yapay zekâ destekli adım adım çözümler almanızı sağlayan eğitim uygulaması.',
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: 'Mathematics',
    operatingSystem: 'iOS, iPadOS',
    url: 'https://matematik-ai.com',
    installUrl: 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761',
    image: 'https://matematik-ai.com/assets/MatAI-logo.png',
    publisher: {
      '@type': 'Organization',
      name: 'MatAI',
      url: 'https://matematik-ai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://matematik-ai.com/assets/MatAI-logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema).replace(/</g, '\\u003c') }}
      />
      <LandingPage />
    </>
  );
}
