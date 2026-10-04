import { getArticleTopic } from '../../lib/topicHubs';
import { getTopicResource } from '../../lib/studyResources';
import Link from 'next/link';
import { getLessonNextSteps } from '../../lib/lessonNextSteps';

export default function LessonNextSteps({ slug }) {
  const resource = getTopicResource(getArticleTopic(slug)?.slug);
  const links = getLessonNextSteps(slug);
  if (!links.length) return null;
  return <nav className="lesson-next-steps" aria-label="İhtiyacına göre devam et">
    <h2>İhtiyacına göre devam et</h2>
    <div>{links.map(({ href, title, intent, detail, level }) => <Link key={href} href={href}>
      <span>{intent}</span><strong>{title}</strong><p>{detail}</p>{level && <small>{level}</small>}
    </Link>)}</div>
    {resource && <p><Link href={`/kaynaklar/${resource.slug}`}>PDF ile tekrar et: {resource.title} →</Link></p>}
  </nav>;
}
