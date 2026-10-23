import { topicalArticles } from './lib/topicalArticles.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers(){return [{source:'/:file(llms\\.txt|llms-full\\.txt)',headers:[{key:'Content-Type',value:'text/plain; charset=utf-8'},{key:'Cache-Control',value:'public, max-age=3600'}]},{source:'/ai-markdown/:path*',headers:[{key:'Content-Type',value:'text/markdown; charset=utf-8'},{key:'Cache-Control',value:'public, max-age=0, s-maxage=3600'}]},{source:'/malcolmX/:path*',headers:[{key:'Cache-Control',value:'private, no-store'},{key:'X-Robots-Tag',value:'noindex, nofollow'}]},{source:'/api/:path*',headers:[{key:'Cache-Control',value:'private, no-store'}]},{source:'/solution/:path*',headers:[{key:'Cache-Control',value:'private, no-store'}]}];},

  reactStrictMode: true,
  async redirects() {
    return [
      // Recover visitors whose browser cached the former wildcard redirect.
      // Match only the leaked placeholder; real missing pages must stay 404s.
      ...['/\\:path\\*', '/%3Apath\\*', '/%3Apath%2A'].map((source) => ({
        source,
        destination: 'https://matematik-ai.com/',
        permanent: true,
      })),
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
};

export default nextConfig;
