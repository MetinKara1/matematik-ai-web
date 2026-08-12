export default function manifest() {
  return {
    name: 'MatAI - Yapay Zekâ Matematik Çözücü',
    short_name: 'MatAI',
    description: 'Matematik sorularını fotoğraf, metin veya sesle sorun; adım adım çözümler alın.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f6fb',
    theme_color: '#5b48b8',
    lang: 'tr',
    categories: ['education', 'utilities'],
    icons: [{ src: '/assets/MatAI-logo.png', sizes: 'any', type: 'image/png', purpose: 'any' }],
  };
}
