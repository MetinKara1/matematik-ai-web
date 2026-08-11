export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matematik-ai.com';
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/malcolmX/' },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
