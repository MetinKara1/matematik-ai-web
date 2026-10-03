import Link from 'next/link';
import { topicHubs, getTopicLessons } from '../../lib/topicHubs';

export default function TopicCards() {
  return <div className="topic-cards">{topicHubs.map((topic, i) => <Link key={topic.slug} href={`/konular/${topic.slug}`} className="topic-card"><span className="topic-card-top"><span className="topic-symbol" aria-hidden="true">{topic.symbol}</span><span>{String(i + 1).padStart(2, '0')} / {String(topicHubs.length).padStart(2, '0')}</span></span><h3>{topic.title}</h3><p>{topic.summary}</p><span className="topic-card-bottom">{getTopicLessons(topic).length} ders <span aria-hidden="true">·</span> Öğrenme yolunu aç <span aria-hidden="true">↗</span></span></Link>)}</div>;
}
