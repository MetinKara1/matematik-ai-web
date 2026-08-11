import SolutionPageClient from '../../../components/public/SolutionPageClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.matematik-ai.com';

async function getQuestion(id) {
  const response = await fetch(`${API_BASE_URL}/api/questions/solved/${encodeURIComponent(id)}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error('Soru çözümü bulunamadı.');
  return response.json();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const question = await getQuestion(id);
    const title = question.Question?.slice(0, 60) || 'Matematik Soru Çözümü';
    const description = question.Solution?.slice(0, 160) || 'Matematik sorusunun adım adım çözümünü inceleyin.';
    return {
      title,
      description,
      alternates: { canonical: `/solution/${id}` },
      openGraph: { title, description, type: 'article', images: question.ImageUri ? [question.ImageUri] : [] },
      robots: { index: false, follow: true },
    };
  } catch {
    return { title: 'Matematik Soru Çözümü', robots: { index: false, follow: true } };
  }
}

export default async function SolutionPage({ params }) {
  const { id } = await params;
  try {
    const question = await getQuestion(id);
    return <SolutionPageClient solutionId={id} initialQuestion={question} />;
  } catch (error) {
    return <SolutionPageClient solutionId={id} initialError={error.message} />;
  }
}
