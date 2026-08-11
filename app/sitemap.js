export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matematik-ai.com';
  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/yapay-zeka-matematik-cozucu`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/makaleler`, changeFrequency: 'weekly', priority: 0.9 },
    {
      url: `${baseUrl}/makaleler/integral-sorusu-nasil-cozulur`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/makaleler/belirsiz-integral-nedir`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
