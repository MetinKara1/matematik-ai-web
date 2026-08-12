import IntegralArticle from '../../../components/public/IntegralArticle';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'İntegral Sorusu Nasıl Çözülür? Adım Adım Örnek',
  description: 'Kısmi integrasyon yöntemiyle ∫x·eˣ dx sorusunun çözümünü, sağlamasını ve öğrencilerin sık yaptığı hataları adım adım öğrenin.',
  alternates: { canonical: '/makaleler/integral-sorusu-nasil-cozulur' },
  openGraph: {
    title: 'İntegral Sorusu Nasıl Çözülür? Adım Adım Bir Örnek',
    description: 'Kısmi integrasyon yöntemini örnek bir AYT sorusuyla adım adım öğrenin.',
    type: 'article',
    locale: 'tr_TR',
    siteName: 'MatAI',
    url: '/makaleler/integral-sorusu-nasil-cozulur',
    images: [{ url: '/assets/og/integral-sorusu-nasil-cozulur.png', width: 1200, height: 630, alt: 'İntegral Sorusu Nasıl Çözülür? Adım Adım Örnek' }],
    publishedTime: '2026-08-11T00:00:00+03:00',
    modifiedTime: '2026-08-11T00:00:00+03:00',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İntegral Sorusu Nasıl Çözülür?',
    description: 'Kısmi integrasyon yöntemini çözümlü bir örnekle adım adım öğrenin.',
    images: ['/assets/og/integral-sorusu-nasil-cozulur.png'],
  },
};

export default function ArticlePage() {
  const articleUrl = 'https://matematik-ai.com/makaleler/integral-sorusu-nasil-cozulur';
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${articleUrl}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
        headline: 'İntegral Sorusu Nasıl Çözülür? Adım Adım Bir Örnekle Anlatıyorum',
        description: 'Kısmi integrasyon yöntemiyle ∫x·eˣ dx sorusunun çözümünü, sağlamasını ve öğrencilerin sık yaptığı hataları adım adım öğrenin.',
        image: ['https://matematik-ai.com/assets/og/integral-sorusu-nasil-cozulur.png'],
        datePublished: '2026-08-11T00:00:00+03:00',
        dateModified: '2026-08-11T00:00:00+03:00',
        inLanguage: 'tr-TR',
        articleSection: 'AYT Matematik',
        keywords: ['integral sorusu nasıl çözülür', 'kısmi integrasyon', 'parçalı integral', 'AYT matematik', 'integral soru çözümü'],
        author: { '@type': 'Organization', name: 'MatAI', url: 'https://matematik-ai.com' },
        publisher: {
          '@type': 'Organization',
          name: 'MatAI',
          url: 'https://matematik-ai.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://matematik-ai.com/assets/MatAI-logo.png',
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Ana Sayfa',
            item: 'https://matematik-ai.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Makaleler',
            item: 'https://matematik-ai.com/makaleler',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'İntegral Sorusu Nasıl Çözülür?',
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <IntegralArticle />
    </>
  );
}
