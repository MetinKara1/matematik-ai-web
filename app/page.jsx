import { serializeStructuredData, applicationIdentity, publisherIdentity } from '../lib/structuredData';
import LandingPage from '../components/public/LandingPage';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: '/', languages: { tr: '/', en: '/en', 'x-default': '/' } },
  openGraph: {
    title: 'MatAI - Yapay Zekâ Matematik Çözücü',
    description: 'Matematik sorularınızı fotoğraf, metin veya sesle sorun; çözüm yolunu adım adım inceleyin.',
    type: 'website',
    url: '/',
    locale: 'tr_TR',
    siteName: 'MatAI',
    images: [{ url: '/assets/og/matai-ai-matematik-cozucu.png', width: 1200, height: 630, alt: 'MatAI Yapay Zekâ Matematik Çözücü' }],
  },
};

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      publisherIdentity,
      {
        '@type': 'WebSite', '@id': 'https://matematik-ai.com/#website', url: 'https://matematik-ai.com', name: 'MatAI', inLanguage: 'tr-TR',
        publisher: { '@id': 'https://matematik-ai.com/#organization' },
      },
      { ...applicationIdentity, alternateName: 'MatAI - Yapay Zeka Matematik', applicationSubCategory: 'Mathematics', description: 'Matematik sorularını fotoğraf, metin veya sesle sorarak yapay zekâ destekli adım adım çözümler almanızı sağlayan eğitim uygulaması.' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
      <LandingPage />
    </>
  );
}
