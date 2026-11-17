import { validSolutionId } from '../../../../lib/sharedSolutionImage.mjs';
import { decodeSolutionImage } from '../../../../lib/solutionImage.server.mjs';

export const runtime = 'nodejs';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.matematik-ai.com';
const unavailable = status => new Response(null, { status, headers: { 'Cache-Control': 'private, no-store' } });

export async function GET(_request, { params }) {
  const { id } = await params;
  if (!validSolutionId(id)) return unavailable(404);
  try {
    const response = await fetch(`${API_BASE_URL}/api/questions/solved/${encodeURIComponent(id)}`, {
      cache: 'no-store', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return unavailable(response.status === 404 ? 404 : 502);
    const question = await response.json();
    const image = decodeSolutionImage(question.ImageUri ?? question.imageUri);
    if (!image) return unavailable(404);
    return new Response(image.bytes, {
      headers: {
        'Content-Type': image.contentType,
        'Content-Length': String(image.bytes.length),
        'Content-Disposition': `inline; filename="question-${id}.${image.contentType === 'image/jpeg' ? 'jpg' : image.contentType.slice(6)}"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch { return unavailable(502); }
}
