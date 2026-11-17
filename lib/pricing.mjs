/**
 * MatAI Subscription & Pricing Configuration
 * - Polar integration links for Web Pro access
 * - App Store references for Mobile companion
 * - Fair Solve Guarantee & Privacy declarations
 */

export const APP_STORE_URL =
  'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761';

export const POLAR_CHECKOUT_MONTHLY =
  process.env.NEXT_PUBLIC_POLAR_CHECKOUT_MONTHLY ||
  process.env.NEXT_PUBLIC_POLAR_CHECKOUT_WEEKLY ||
  'https://buy.polar.sh/polar_cl_5hCpNSZS43lawUk46HzKOsbC6Ph7UPvS85EEA4P1z04';

// Backward compatibility alias
export const POLAR_CHECKOUT_WEEKLY = POLAR_CHECKOUT_MONTHLY;

export const POLAR_CHECKOUT_ANNUAL =
  process.env.NEXT_PUBLIC_POLAR_CHECKOUT_ANNUAL ||
  'https://buy.polar.sh/polar_cl_tGmLqhQ3D8uyHdi89HeFyfBhe4Uy5pUMQ2hV74faqIT';

export const POLAR_CHECKOUT_MONTHLY_USD =
  process.env.NEXT_PUBLIC_POLAR_CHECKOUT_MONTHLY_USD ||
  POLAR_CHECKOUT_MONTHLY;

export const POLAR_CHECKOUT_ANNUAL_USD =
  process.env.NEXT_PUBLIC_POLAR_CHECKOUT_ANNUAL_USD ||
  POLAR_CHECKOUT_ANNUAL;

export const PRICING_PLANS_TR = [
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
    id: 'monthly',
    name: 'Aylık Pro',
    badge: 'Esnek Plan',
    price: '₺79',
    period: 'aylık',
    description: 'Her ay yenilenen, dilediğiniz an iptal edebileceğiniz esnek paket.',
    features: [
      'TÜM adım adım çözümler (Adım 1, 2, 3, 4 ve nihai sonuç)',
      'Kalkülüs, İntegral, Türev ve Cebir detaylı çözümleri',
      'Uygulanan teorem ve formül kartları',
      'Reklamsız ve dikkat dağıtmayan arayüz',
      'İstediğiniz an tek tıkla iptal'
    ],
    ctaText: 'Aylık Pro Başlat',
    ctaHref: POLAR_CHECKOUT_MONTHLY,
    highlighted: false
  },
  {
    id: 'annual',
    name: 'Yıllık Pro',
    badge: 'EN POPÜLER • %47 TASARRUF',
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

export const PRICING_PLANS_EN = [
  {
    id: 'free',
    name: 'Free Starter',
    badge: 'For Everyone',
    price: '$0',
    period: 'forever',
    description: 'Essential formula validation and Step 1 preview.',
    features: [
      'Step 1 Solution Preview (Identified theorem & setup)',
      'Basic equation, derivative, and integral tools',
      'Step-by-step curriculum study guides and articles',
      'Instant query on the web'
    ],
    limitations: [
      'Steps 2, 3 and final answer locked',
      'Live camera photo problem scanning excluded'
    ],
    ctaText: 'Use Free',
    ctaHref: '#math-solver-widget',
    highlighted: false
  },
  {
    id: 'monthly',
    name: 'Monthly Pro',
    badge: 'Flexible Plan',
    price: '$2.99',
    period: 'monthly',
    description: 'Billed monthly. Cancel anytime with a single click.',
    features: [
      'ALL step-by-step solutions (Steps 1, 2, 3, 4 & final answer)',
      'Calculus, Integration, Derivatives & Algebra worked solutions',
      'Applied theorems and formula cards',
      'Ad-free, distraction-free learning environment',
      'Cancel anytime with 1 click'
    ],
    ctaText: 'Start Monthly Pro',
    ctaHref: POLAR_CHECKOUT_MONTHLY_USD,
    highlighted: false
  },
  {
    id: 'annual',
    name: 'Annual Pro',
    badge: 'MOST POPULAR • SAVE 45%',
    price: '$19.99',
    period: 'annual ($1.66/mo)',
    description: 'Unlimited AI math assistant throughout the academic year.',
    features: [
      'Unlimited web problem solving & all intermediate steps',
      'iPhone Photo Solver Companion (Scan books & handwritten notes in 1 sec)',
      'High school, College Calculus, AP & Exam preparation ready',
      'Priority AI computation power (< 1 second solution time)',
      'Graphical explanations and practical shortcuts',
      '24/7 Priority email support'
    ],
    ctaText: 'Get Annual Pro',
    ctaHref: POLAR_CHECKOUT_ANNUAL_USD,
    highlighted: true
  }
];

export const PRICING_PLANS = PRICING_PLANS_TR;

export function getPricingPlans(locale = 'tr') {
  return locale === 'en' ? PRICING_PLANS_EN : PRICING_PLANS_TR;
}

export const FAIR_SOLVE_GUARANTEE_TR = {
  title: 'MatAI Adil ve Doğrulanabilir Çözüm Güvencesi',
  description:
    'MatAI yalnızca son cevabı veren bir hesap makinesi değil; sınavda puan kazandıran yöntemi öğreten bir eğitim asistanıdır. Her adımda uygulanan kural (LAPTÜ, Çarpım Kuralı, Diskriminant vb.) adım adım gösterilir.',
  privacyNote:
    'Sıfır Kişisel Veri İlkesi: MatAI sorularınızı kişisel kimliğinizle eşleştirmez; KVKK, GDPR ve CCPA veri mahremiyeti standartlarına tam uyumludur.'
};

export const FAIR_SOLVE_GUARANTEE_EN = {
  title: 'MatAI Fair & Verifiable Solution Guarantee',
  description:
    'MatAI is not merely a calculator that outputs a final number; it is an educational companion that teaches the underlying methodology. Every step clearly displays the applied theorem (Integration by Parts, Product Rule, Discriminant, etc.).',
  privacyNote:
    'Zero Personal Data Policy: MatAI never links your questions to your personal identity; fully compliant with GDPR, CCPA, and global privacy standards.'
};

export const FAIR_SOLVE_GUARANTEE = FAIR_SOLVE_GUARANTEE_TR;

export function getFairSolveGuarantee(locale = 'tr') {
  return locale === 'en' ? FAIR_SOLVE_GUARANTEE_EN : FAIR_SOLVE_GUARANTEE_TR;
}
