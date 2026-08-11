import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://matematik-ai.com'),
  title: {
    default: 'MatAI - Matematik Sorularınızı AI ile Çözün',
    template: '%s | MatAI',
  },
  description: 'MatAI ile matematik sorularınızı fotoğraf, metin veya sesle sorun; yapay zekâ destekli adım adım çözümleri saniyeler içinde alın.',
  icons: {
    icon: [
      { url: '/assets/MatAI-logo.png', type: 'image/png' },
    ],
    shortcut: '/assets/MatAI-logo.png',
    apple: '/assets/MatAI-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
