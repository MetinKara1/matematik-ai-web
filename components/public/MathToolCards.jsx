import Link from 'next/link';
import { mathTools } from '../../lib/mathTools';

export default function MathToolCards({ exclude }) {
  return <div className="tool-cards">{mathTools.filter((tool) => tool.slug !== exclude).map((tool) => <Link className="tool-card" key={tool.slug} href={`/araclar/${tool.slug}`}><span className="tool-card-symbol" aria-hidden="true">{tool.symbol}</span><h3>{tool.title}</h3><p>{tool.intro}</p><span className="tool-card-action">Hesaplamaya başla <span aria-hidden="true">↗</span></span></Link>)}</div>;
}
