export default function robots() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://matematik-ai.com').replace(/\/$/, '');
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/malcolmX', '/malcolmX/', '/api/'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
