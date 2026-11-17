/**
 * MatAI Subscription & Pricing Configuration
 * - Polar integration links for Web Pro access
 * - App Store references for Mobile companion
 * - Fair Solve Guarantee & Privacy declarations
 */

export const APP_STORE_URL =
  'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761';

export const POLAR_CHECKOUT_WEEKLY =
  process.env.NEXT_PUBLIC_POLAR_CHECKOUT_WEEKLY ||
  'https://buy.polar.sh/polar_cl_5hCpNSZS43lawUk46HzKOsbC6Ph7UPvS85EEA4P1z04';

export const POLAR_CHECKOUT_ANNUAL =
  process.env.NEXT_PUBLIC_POLAR_CHECKOUT_ANNUAL ||
  'https://buy.polar.sh/polar_cl_tGmLqhQ3D8uyHdi89HeFyfBhe4Uy5pUMQ2hV74faqIT';

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Ücretsiz Başlangıç',
    badge: 'Herkes İçin',
    price: '₺0',
    period: 'süresiz',
    description: 'Temel formül kontrolü ve 1. adım önizleme.',
    features: [
      'Adım 1 Çözüm Önizlemesi (Uygulanan kural & kurulum)',
      'Temel denklem ve polinom hesaplama araçları',
      'Müfredat konu rehberleri ve makaleler',
      'Web üzerinde anlık sorgulama'
    ],
    limitations: [
      'Adım 2, 3 ve nihai çözüm kilitli',
      'Kamera ile fotoğraflı soru tarama hariç'
    ],
    ctaText: 'Ücretsiz Kullan',
    ctaHref: '#math-solver-widget',
    highlighted: false
  },
  {
    id: 'weekly',
    name: 'Haftalık Pro',
    badge: 'Esnek Plan',
    price: '₺79',
    period: 'haftalık',
    description: 'Sınav haftaları veya acil ödevler için esnek paket.',
    features: [
      'TÜM adım adım çözümler (Adım 1, 2, 3, 4 ve nihai sonuç)',
      'Kalkülüs, İntegral, Türev ve Cebir detaylı çözümleri',
      'Uygulanan teorem ve formül kartları',
      'Reklamsız ve dikkat dağıtmayan arayüz',
      'İstediğiniz an tek tıkla iptal'
    ],
    ctaText: 'Haftalık Pro Başlat',
    ctaHref: POLAR_CHECKOUT_WEEKLY,
    highlighted: false
  },
  {
    id: 'annual',
    name: 'Yıllık Pro',
    badge: 'EN POPÜLER • %65 TASARRUF',
    price: '₺499',
    period: 'yıllık (aylık ₺41)',
    description: 'Tüm eğitim dönemi boyunca sınırsız matematik asistanı.',
    features: [
      'Sınırsız web soru çözümü & tüm ara işlem adımları',
      'iPhone Fotoğraflı Soru Çözücü Eşlikçisi (Kitap/Defterden 1 saniyede tara)',
      'TYT, AYT, LGS & Üniversite Kalkülüs soru tipleriyle tam uyum',
      'Öncelikli AI işlem gücü (< 1 saniye çözüm süresi)',
      'Grafiksel anlatım ve pratik çözüm yolları',
      '7/24 Öncelikli e-posta desteği'
    ],
    ctaText: 'Yıllık Pro Satın Al',
    ctaHref: POLAR_CHECKOUT_ANNUAL,
    highlighted: true
  }
];

export const FAIR_SOLVE_GUARANTEE = {
  title: 'MatAI Adil ve Doğrulanabilir Çözüm Güvencesi',
  description:
    'MatAI yalnızca son cevabı veren bir hesap makinesi değil; sınavda puan kazandıran yöntemi öğreten bir eğitim asistanıdır. Her adımda uygulanan kural (LAPTÜ, Çarpım Kuralı, Diskriminant vb.) adım adım gösterilir.',
  privacyNote:
    'Sıfır Kişisel Veri İlkesi: MatAI sorularınızı kişisel kimliğinizle eşleştirmez; KVKK, GDPR ve CCPA veri mahremiyeti standartlarına tam uyumludur.'
};
