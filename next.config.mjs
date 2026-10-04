import { topicalArticles } from './lib/topicalArticles.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // OpenNext leaves an empty wildcard literal in the root destination.
      // Handle the homepage explicitly before the wildcard rules.
      {
        source: '/',
        has: [{ type: 'host', value: '^www\\.matematik-ai\\.com$' }],
        destination: 'https://matematik-ai.com/',
        permanent: true,
      },
      {
        source: '/',
        has: [
          { type: 'host', value: '^matematik-ai\\.com$' },
          { type: 'header', key: 'x-forwarded-proto', value: '^http$' },
        ],
        destination: 'https://matematik-ai.com/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: '^www\\.matematik-ai\\.com$' }],
        destination: 'https://matematik-ai.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        // Cloudflare supplies the visitor's protocol, even behind its TLS proxy.
        // Restrict this rule to production so local HTTP previews keep working.
        has: [
          { type: 'host', value: '^matematik-ai\\.com$' },
          { type: 'header', key: 'x-forwarded-proto', value: '^http$' },
        ],
        destination: 'https://matematik-ai.com/:path*',
        permanent: true,
      },
      // Preserve links to the former article URLs after moving news and guides.
      ...topicalArticles.map(({ slug, section }) => ({
        source: `/makaleler/${slug}`,
        destination: `/${section}/${slug}`,
        permanent: true,
      })),
    ];
  },
  images: { qualities: [75, 82] },
  outputFileTracingRoot: new URL('.', import.meta.url).pathname,
  eslint: {
    // The migrated admin screens preserve the original project's existing lint debt.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
