"use client";
import { useRef, useState } from 'react';
import { derivativeQuiz } from '../../lib/derivativeQuiz';

export default function DerivativeMiniQuiz({ locale = 'tr' }) {
  const en = locale === 'en';
  const language = en ? 1 : 0;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef(null);
  const id = en ? 'derivative-quiz' : 'turev-mini-test';
  const answered = Object.keys(answers).length;
  const score = derivativeQuiz.filter((q, index) => answers[index] === q.correct).length;
  const topics = {
    slope: [en ? 'Slope and derivative values' : 'Eğim ve türev değeri', en ? '#interpretation' : '#yorum'],
    tangent: [en ? 'Tangent equations' : 'Teğet denklemi', en ? '#tangent' : '#teget'],
    normal: [en ? 'Normal lines' : 'Normal doğrusu', '#normal'],
    parallel: [en ? 'Parallel tangents' : 'Paralel teğetler', en ? '#worked-problems' : '#cozumlu-sorular'],
    extremum: [en ? 'Horizontal tangents and extrema' : 'Yatay teğet ve ekstremum', en ? '#common-mistakes' : '#yaygin-hatalar'],
  };
  const review = [...new Set(derivativeQuiz.filter((q, index) => answers[index] !== q.correct).map(q => q.topic))];
  function submit(event) {
    event.preventDefault();
    if (answered !== derivativeQuiz.length) return;
    setSubmitted(true);
    requestAnimationFrame(() => resultRef.current?.focus());
  }
  return <section id={id} className="derivative-quiz">
    <h2>{en ? 'Derivative mini quiz: 8 questions' : 'Türev mini testi: 8 soru'}</h2>
    <p>{en ? 'Choose one answer per question, then check your results. Each wrong choice has its own explanation.' : 'Her soru için bir cevap seçin, ardından sonucu kontrol edin. Yanlış seçimlerin her biri için ayrı açıklama bulacaksınız.'}</p>
    <form onSubmit={submit}>
      <p className="quiz-progress" aria-live="polite">{answered}/8 {en ? 'questions answered' : 'soru cevaplandı'}</p>
      {derivativeQuiz.map((q, index) => <fieldset key={index} className="quiz-question" disabled={submitted}>
        <legend>{index + 1}. {q.question[language]}</legend>
        {q.options.map((rawOption, option) => {
          const label = rawOption.includes(' / ') ? rawOption.split(' / ')[language] : rawOption;
          return <label key={option} className="quiz-option"><input type="radio" name={`${id}-${index}`} value={option} checked={answers[index] === option} onChange={() => setAnswers(previous => ({ ...previous, [index]: option }))} /><span>{label}</span></label>;
        })}
        {submitted && <div className={`quiz-feedback ${answers[index] === q.correct ? 'is-correct' : 'is-wrong'}`}><strong>{answers[index] === q.correct ? (en ? 'Correct' : 'Doğru') : (en ? 'Incorrect' : 'Yanlış')}</strong><p>{q.feedback[language][answers[index]]}</p><p>{q.solution[language]}</p></div>}
      </fieldset>)}
      {!submitted && <><button className="quiz-action" type="submit" disabled={answered !== 8}>{en ? 'Check my answers' : 'Cevaplarımı kontrol et'}</button>{answered !== 8 && <p>{en ? 'Answer all 8 questions to see your score.' : 'Sonucu görmek için 8 sorunun tamamını cevaplayın.'}</p>}</>}
    </form>
    {submitted && <div className="quiz-result" ref={resultRef} tabIndex={-1} role="region" aria-label={en ? 'Quiz result' : 'Test sonucu'}><h3>{en ? 'Your result' : 'Test sonucunuz'}: {score}/8</h3><p>{score === 8 ? (en ? 'All answers are correct. Try solving the worked problems without looking at their solutions.' : 'Tüm cevaplar doğru. Çözümlü soruları bu kez açıklamalara bakmadan çözmeyi deneyin.') : (en ? 'Review the explanations above and revisit these topics:' : 'Yukarıdaki açıklamaları inceleyip şu konuları tekrar edin:')}</p>{score !== 8 && <ul>{review.map(topic => <li key={topic}><a href={topics[topic][1]}>{topics[topic][0]}</a></li>)}</ul>}<button type="button" className="quiz-action" onClick={() => {setAnswers({});setSubmitted(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'});}}>{en ? 'Try again' : 'Yeniden çöz'}</button></div>}
  </section>;
}
