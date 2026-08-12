import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://matematik-ai.com'),
  applicationName: 'MatAI',
  title: {
    default: 'MatAI - Matematik Sorularınızı AI ile Çözün',
    template: '%s | MatAI',
  },
  description: 'MatAI ile matematik sorularınızı fotoğraf, metin veya sesle sorun; yapay zekâ destekli adım adım çözümleri saniyeler içinde alın.',
  keywords: ['yapay zekâ matematik çözücü', 'matematik soru çözme', 'fotoğrafla matematik çözme', 'adım adım matematik çözümü', 'MatAI'],
  authors: [{ name: 'MatAI', url: 'https://matematik-ai.com' }],
  creator: 'MatAI',
  publisher: 'MatAI',
  alternates: { canonical: '/' },
  category: 'education',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    title: 'MatAI - Yapay Zekâ Matematik Çözücü',
    description: 'Matematik sorularınızı fotoğraf, metin veya sesle sorun; çözüm yolunu adım adım inceleyin.',
    type: 'website',
    url: '/',
    locale: 'tr_TR',
    siteName: 'MatAI',
    images: [{ url: '/assets/og/matai-ai-matematik-cozucu.png', width: 1200, height: 630, alt: 'MatAI Yapay Zekâ Matematik Çözücü' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MatAI - Yapay Zekâ Matematik Çözücü',
    description: 'Matematik sorularınızı yapay zekâ desteğiyle adım adım çözün.',
    images: ['/assets/og/matai-ai-matematik-cozucu.png'],
  },
  icons: {
    icon: [
      { url: '/assets/MatAI-logo.png', type: 'image/png' },
    ],
    shortcut: '/assets/MatAI-logo.png',
    apple: '/assets/MatAI-logo.png',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
