export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matematik-ai.com';
  const lastModified = new Date('2026-08-12T00:00:00+03:00');
  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/yapay-zeka-matematik-cozucu`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/makaleler`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    {
      url: `${baseUrl}/makaleler/integral-sorusu-nasil-cozulur`,
      lastModified: new Date('2026-08-11T00:00:00+03:00'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/makaleler/belirsiz-integral-nedir`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...['integralde-degisken-degistirme', 'belirli-integral-nedir', 'integral-ile-alan-hesabi'].map((slug) => ({
      url: `${baseUrl}/makaleler/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
