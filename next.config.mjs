/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: new URL('.', import.meta.url).pathname,
  eslint: {
    // The migrated admin screens preserve the original project's existing lint debt.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
