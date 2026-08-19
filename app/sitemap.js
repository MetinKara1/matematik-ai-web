import { derivativeArticles } from '../lib/derivativeArticles';

export default function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://matematik-ai.com').replace(/\/$/, '');
  const lastModified = new Date('2026-08-12T00:00:00+03:00');
  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/yapay-zeka-matematik-cozucu`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/makaleler`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/hakkimizda`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/icerik-politikasi`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
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
    ...derivativeArticles.map(({ slug, publishedAt }) => ({
      url: `${baseUrl}/makaleler/${slug}`,
      lastModified: new Date(`${publishedAt || '2026-08-14'}T00:00:00+03:00`),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
