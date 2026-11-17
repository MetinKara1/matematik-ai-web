import { sanitizeMathQuery } from '../../../lib/sanitizeMath.mjs';
import { solveMathProblem } from '../../../lib/mathSolverEngine.mjs';
import {
  APP_STORE_URL,
  POLAR_CHECKOUT_WEEKLY,
  POLAR_CHECKOUT_ANNUAL
} from '../../../lib/pricing.mjs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || searchParams.get('query') || '';

    if (!query.trim()) {
      return Response.json(
        {
          success: false,
          error: 'Lütfen bir matematik sorusu veya formül yazın.'
        },
        { status: 400 }
      );
    }

    const check = sanitizeMathQuery(query);
    if (!check.valid) {
      return Response.json(
        {
          success: false,
          error: check.error || 'Geçersiz matematiksel girdi.'
        },
        { status: 400 }
      );
    }

    const solution = solveMathProblem(check.sanitized);

    return Response.json(
      {
        success: true,
        solution,
        privacyNotice: {
          gdprCompliant: true,
          ccpaCompliant: true,
          kvkkCompliant: true,
          zeroPii: true,
          disclaimer:
            'MatAI matematik çözümleri eğitim ve pratik destek amaçlıdır. Sıfır kişisel veri ilkesiyle işlenir ve saklanmaz.'
        },
        appStoreUrl: APP_STORE_URL,
        polarCheckoutWeekly: POLAR_CHECKOUT_WEEKLY,
        polarCheckoutAnnual: POLAR_CHECKOUT_ANNUAL
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
    const body = await request.json().catch(() => ({}));
    const query = body.q || body.query || '';

    if (!query.trim()) {
      return Response.json(
        {
          success: false,
          error: 'Lütfen bir matematik sorusu veya formül yazın.'
        },
        { status: 400 }
      );
    }

    const check = sanitizeMathQuery(query);
    if (!check.valid) {
      return Response.json(
        {
          success: false,
          error: check.error || 'Geçersiz matematiksel girdi.'
        },
        { status: 400 }
      );
    }

    const solution = solveMathProblem(check.sanitized);

    return Response.json(
      {
        success: true,
        solution,
        privacyNotice: {
          gdprCompliant: true,
          ccpaCompliant: true,
          kvkkCompliant: true,
          zeroPii: true,
          disclaimer:
            'MatAI matematik çözümleri eğitim ve pratik destek amaçlıdır. Sıfır kişisel veri ilkesiyle işlenir ve saklanmaz.'
        },
        appStoreUrl: APP_STORE_URL,
        polarCheckoutWeekly: POLAR_CHECKOUT_WEEKLY,
        polarCheckoutAnnual: POLAR_CHECKOUT_ANNUAL
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
