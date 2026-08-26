import DocumentLanguage from '../../components/public/DocumentLanguage';

export const metadata = {
  title: { default: 'MatAI – AI Math Solver', template: '%s | MatAI' },
  description: 'Solve math problems from a photo, text, or voice and study clear, step-by-step explanations with MatAI.',
  keywords: ['AI math solver', 'photo math solver', 'step-by-step math solver', 'calculus help', 'MatAI'],
  twitter: { card: 'summary_large_image', title: 'MatAI – AI Math Solver', description: 'Solve math problems and study clear, step-by-step explanations.', images: ['/assets/og/matai-ai-matematik-cozucu.png'] },
};

export default function EnglishLayout({ children }) {
  return <div lang="en"><DocumentLanguage lang="en" />{children}</div>;
}
