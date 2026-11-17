import { normalizeSharedQuestion, validSolutionId } from '../../../lib/sharedSolutionImage.mjs';
import SolutionPageClient from '../../../components/public/SolutionPageClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.matematik-ai.com';

async function getQuestion(id) {
  if (!validSolutionId(id)) throw new Error('Soru çözümü bulunamadı.');
  const response = await fetch(`${API_BASE_URL}/api/questions/solved/${encodeURIComponent(id)}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error('Soru çözümü bulunamadı.');
  return normalizeSharedQuestion(await response.json(), id, API_BASE_URL);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const question = await getQuestion(id);
    const title = question.Question?.slice(0, 60) || 'Matematik Soru Çözümü';
    const description = question.Solution?.slice(0, 160) || 'Matematik sorusunun adım adım çözümünü inceleyin.';
    const image = new URL(question.ImageUri || '/assets/og/matai-ai-matematik-cozucu.png', process.env.NEXT_PUBLIC_SITE_URL || 'https://matematik-ai.com').href;
    return {
      title,
      description,
      alternates: { canonical: `/solution/${id}` },
      openGraph: { title, description, type: 'article', locale: 'tr_TR', siteName: 'MatAI', url: `/solution/${id}`, images: [{ url: image, alt: title }] },
      twitter: { card: 'summary_large_image', title, description, images: [image] },
      robots: { index: false, follow: true, nocache: true, googleBot: { index: false, follow: true, noimageindex: true } },
    };
  } catch {
    return { title: 'Matematik Soru Çözümü', description: 'Matematik sorusunun adım adım çözümünü inceleyin.', robots: { index: false, follow: true, nocache: true } };
  }
}

export default async function SolutionPage({ params }) {
  const { id } = await params;
  let question = null;
  let initialError = '';
  try { question = await getQuestion(id); }
  catch (error) { initialError = error.message; }
  return <SolutionPageClient solutionId={id} initialQuestion={question} initialError={initialError} />;
}
