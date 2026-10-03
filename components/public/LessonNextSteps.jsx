import Link from 'next/link';
import { getLessonNextSteps } from '../../lib/lessonNextSteps';

export default function LessonNextSteps({ slug }) {
  const links = getLessonNextSteps(slug);
  if (!links.length) return null;
  return <nav className="lesson-next-steps" aria-label="İhtiyacına göre devam et">
    <h2>İhtiyacına göre devam et</h2>
    <div>{links.map(({ href, title, intent, detail, level }) => <Link key={href} href={href}>
      <span>{intent}</span><strong>{title}</strong><p>{detail}</p>{level && <small>{level}</small>}
    </Link>)}</div>
  </nav>;
}
