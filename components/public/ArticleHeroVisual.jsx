import Image from 'next/image';
import { getArticleVisual } from '../../lib/articleVisuals';

export default function ArticleHeroVisual({ slug, title, priority = false }) {
  const visual = getArticleVisual(slug);
  return (
    <figure className="article-hero-visual">
      <Image src={visual.src} alt={visual.alt} width={1536} height={1024} sizes="(max-width: 640px) 100vw, (max-width: 1200px) 92vw, 1180px" quality={82} priority={priority} />
      <figcaption>{title} için hazırlanan kavramsal görselleştirme.</figcaption>
    </figure>
  );
}
