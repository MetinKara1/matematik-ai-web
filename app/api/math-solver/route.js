import { sanitizeMathQuery } from '../../../lib/sanitizeMath.mjs';
import { solveMathProblem, solveMathImage } from '../../../lib/mathSolverEngine.mjs';
import {
  APP_STORE_URL,
  POLAR_CHECKOUT_MONTHLY,
  POLAR_CHECKOUT_WEEKLY,
  POLAR_CHECKOUT_ANNUAL,
  POLAR_CHECKOUT_MONTHLY_USD,
  POLAR_CHECKOUT_ANNUAL_USD
} from '../../../lib/pricing.mjs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || searchParams.get('query') || '';
    const locale = (searchParams.get('locale') || searchParams.get('lang') || 'tr').toLowerCase();
    const isEn = locale === 'en';

    if (!query.trim()) {
      return Response.json(
        {
          success: false,
          error: isEn
            ? 'Please enter a math question or formula.'
            : 'Lütfen bir matematik sorusu veya formül yazın.'
        },
        { status: 400 }
      );
    }

    const check = sanitizeMathQuery(query);
    if (!check.valid) {
      return Response.json(
        {
          success: false,
          error: check.error || (isEn ? 'Invalid mathematical input.' : 'Geçersiz matematiksel girdi.')
        },
        { status: 400 }
      );
    }

    const solution = solveMathProblem(check.sanitized, { locale });

    return Response.json(
      {
        success: true,
        solution,
        privacyNotice: {
          gdprCompliant: true,
          ccpaCompliant: true,
          kvkkCompliant: true,
          zeroPii: true,
          disclaimer: isEn
            ? 'MatAI math solutions are for educational and practice purposes. Processed under a Zero Personal Data policy and not retained.'
            : 'MatAI matematik çözümleri eğitim ve pratik destek amaçlıdır. Sıfır kişisel veri ilkesiyle işlenir ve saklanmaz.'
        },
        appStoreUrl: APP_STORE_URL,
        polarCheckoutMonthly: isEn ? POLAR_CHECKOUT_MONTHLY_USD : POLAR_CHECKOUT_MONTHLY,
        polarCheckoutWeekly: POLAR_CHECKOUT_WEEKLY,
        polarCheckoutAnnual: isEn ? POLAR_CHECKOUT_ANNUAL_USD : POLAR_CHECKOUT_ANNUAL
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          'X-Content-Type-Options': 'nosniff'
        }
      }
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: 'Soru analiz edilirken beklenmeyen bir hata oluştu.'
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return Response.json(
        {
          success: false,
          error: 'Content-Type application/json olmalıdır.'
        },
        { status: 415 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const query = body.query || body.q || '';
    const sampleId = body.sampleId || '';
    const locale = (body.locale || body.lang || 'tr').toLowerCase();
    const isEn = locale === 'en';

    // If client is asking for sample problem resolution directly
    if (sampleId) {
      const solution = solveMathImage({ sampleId, locale });
      return Response.json({
        success: true,
        solution,
        sampleId
      });
    }

    // Photo input fallback mock
    if (body.photoBase64 || body.image) {
      const recognized = solveMathImage({
        fileName: body.fileName || (isEn ? 'math-problem.png' : 'soru-gorseli.png'),
        sampleId: body.samplePresetId || 'integral',
        locale
      });

      return Response.json(
        {
          success: true,
          solution: recognized,
          detectionNotice: isEn
            ? 'Problem recognized via OCR simulation. For high accuracy handwritten math scanning, use the MatAI iOS app camera.'
            : 'Soru OCR simülasyonu ile çözüldü. Yüksek doğrulukta el yazısı taraması için MatAI iOS kamera tarayıcısını kullanın.',
          appStoreUrl: APP_STORE_URL
        },
        { status: 200 }
      );
    }

    if (!query.trim()) {
      return Response.json(
        {
          success: false,
          error: isEn
            ? 'Please enter a math question or formula, or upload an image.'
            : 'Lütfen bir matematik sorusu veya formül yazın ya da bir soru fotoğrafı yükleyin.'
        },
        { status: 400 }
      );
    }

    const check = sanitizeMathQuery(query);
    if (!check.valid) {
      return Response.json(
        {
          success: false,
          error: check.error || (isEn ? 'Invalid mathematical input.' : 'Geçersiz matematiksel girdi.')
        },
        { status: 400 }
      );
    }

    const solution = solveMathProblem(check.sanitized, { locale });

    return Response.json(
      {
        success: true,
        solution,
        privacyNotice: {
          gdprCompliant: true,
          ccpaCompliant: true,
          kvkkCompliant: true,
          zeroPii: true,
          disclaimer: isEn
            ? 'MatAI math solutions are for educational and practice purposes. Processed under a Zero Personal Data policy and not retained.'
            : 'MatAI matematik çözümleri eğitim ve pratik destek amaçlıdır. Sıfır kişisel veri ilkesiyle işlenir ve saklanmaz.'
        },
        appStoreUrl: APP_STORE_URL,
        polarCheckoutMonthly: isEn ? POLAR_CHECKOUT_MONTHLY_USD : POLAR_CHECKOUT_MONTHLY,
        polarCheckoutWeekly: POLAR_CHECKOUT_WEEKLY,
        polarCheckoutAnnual: isEn ? POLAR_CHECKOUT_ANNUAL_USD : POLAR_CHECKOUT_ANNUAL
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'X-Content-Type-Options': 'nosniff'
        }
      }
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: 'Soru çözülürken sunucu hatası oluştu.'
      },
      { status: 500 }
    );
  }
}
