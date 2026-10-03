import { getLessonScope } from './lessonScope';
import { foundationPractice } from './foundationPractice';
import { calculusPractice } from './calculusPractice';

export const lessonPractice = { ...foundationPractice, ...calculusPractice };
export const lessonPracticeUpdatedAt = '2026-10-03';

export function getLessonUpdatedAt(slug, fallback) {
  if (!lessonPractice[slug] && !getLessonScope(slug)) return fallback;
  return fallback && fallback > lessonPracticeUpdatedAt ? fallback : lessonPracticeUpdatedAt;
}

export const lessonPracticeToc = [
  { id: 'lesson-method', label: 'Çözüm yaklaşımı' },
  { id: 'lesson-examples', label: '3 çözümlü uygulama' },
  { id: 'lesson-mistakes', label: 'Hataları fark edin' },
  { id: 'lesson-exercises', label: 'Kendinizi deneyin' },
];
