import { curriculumSources, getLessonScope } from '../../lib/lessonScope';

export default function LessonScope({ slug }) {
  const scope = getLessonScope(slug);
  if (!scope) return null;
  return <aside className="lesson-scope" aria-label="Ders düzeyi ve kapsamı">
    <strong>{scope.label}</strong><p>{scope.note}</p>
    <details><summary>Müfredat notu ve kaynaklar</summary>
      <p>2026–2027 yılında 12. sınıflarda önceki program sürer; Maarif Modeli hazırlık, 9, 10 ve 11. sınıflarda uygulanır. Bu dersin etiketi bir öğrenme düzeyidir; resmî sınav kapsamı veya tüm müfredatın karşılandığı anlamına gelmez.</p>
      <ul>{curriculumSources.map(({ title, href }) => <li key={href}><a href={href}>{title}</a></li>)}</ul>
      <small>Kapsam kontrolü: 3 Ekim 2026</small>
    </details>
  </aside>;
}
