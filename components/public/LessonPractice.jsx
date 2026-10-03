function LimitApproach() {
  return (
    <figure className="lesson-limit-figure">
      <svg viewBox="0 0 480 240" role="img" aria-labelledby="lesson-limit-title lesson-limit-desc">
        <title id="lesson-limit-title">Limit ile nokta değerinin farkı</title>
        <desc id="lesson-limit-desc">x bir değerine yaklaşırken x artı iki doğrusu üçe yaklaşır. Bir, üç noktasındaki boş halka limit değerini, bir, dokuz noktasındaki dolu nokta f(1) eşittir dokuz değerini gösterir.</desc>
        <path d="M45 210H445 M70 220V15" stroke="#64748b" fill="none" />
        <text x="446" y="227">x</text><text x="51" y="20">y</text>
        <path d="M70 156H230V210 M70 48H230" stroke="#94a3b8" strokeDasharray="5 5" fill="none" />
        <path d="M85 172.3L405 136.3" stroke="#6d28d9" strokeWidth="3" fill="none" />
        <circle cx="230" cy="156" r="7" fill="white" stroke="#6d28d9" strokeWidth="3" />
        <circle cx="230" cy="48" r="6" fill="#c2410c" />
        <text x="52" y="162">3</text><text x="52" y="54">9</text><text x="225" y="229">1</text>
        <text x="250" y="53" fill="#9a3412">f(1) = 9</text>
        <text x="270" y="124" fill="#5b21b6">y = x + 2 (x ≠ 1)</text>
        <text x="249" y="185" fill="#5b21b6">Limit = 3</text>
      </svg>
      <figcaption>İki yandan yaklaşım 3’e gider; tek bir noktadaki f(1) = 9 değeri limiti değiştirmez.</figcaption>
      <div className="lesson-table-scroll" role="region" aria-label="Limit yaklaşım tablosu" tabIndex={0}>
        <table>
          <caption>x ≠ 1 için f(x) = x + 2: yakın değerlerle kontrol</caption>
          <thead><tr><th scope="col">Yaklaşım</th><th scope="col">x</th><th scope="col">f(x)</th></tr></thead>
          <tbody>
            <tr><th scope="row">Soldan</th><td>0,9</td><td>2,9</td></tr>
            <tr><th scope="row">Soldan</th><td>0,99</td><td>2,99</td></tr>
            <tr><th scope="row">Noktada</th><td>1</td><td>9</td></tr>
            <tr><th scope="row">Sağdan</th><td>1,01</td><td>3,01</td></tr>
            <tr><th scope="row">Sağdan</th><td>1,1</td><td>3,1</td></tr>
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default function LessonPractice({ lesson, slug }) {
  return (
    <>
      <section id="lesson-method"><h2>Bu konuda nasıl düşünmelisiniz?</h2><p>{lesson.guide}</p></section>
      <section id="lesson-examples">
        <h2>Üç farklı soru türüyle uygulama</h2>
        <p>Her örnekte soruyu önce kendiniz deneyin; ardından yöntemi, işlem adımlarını ve sonucu karşılaştırın.</p>
        {lesson.examples.map((example, index) => (
          <div className="geometry-example lesson-example" key={example.title}>
            <h3>{index + 1}. {example.title}</h3>
            <p><strong>Soru:</strong> {example.question}</p>
            <ol>{example.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            <p className="geometry-answer"><strong>Sonuç:</strong> {example.answer}</p>
          </div>
        ))}
        {slug === 'limit-nedir' && <LimitApproach />}
      </section>
      <section id="lesson-mistakes"><h2>Bu iki hatayı nasıl fark edersiniz?</h2><ul>{lesson.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></section>
      <section id="lesson-exercises">
        <h2>Kendinizi deneyin</h2>
        <p>Çözümü açmadan önce gerekçenizi yazın. Cevap farklıysa ilk ayrışan işlem adımını bulun.</p>
        {lesson.exercises.map((exercise, index) => (
          <div className="geometry-exercise lesson-exercise" key={exercise.question}>
            <h3>Alıştırma {index + 1}</h3><p>{exercise.question}</p>
            <details><summary>Alıştırma {index + 1}: cevabı ve açıklamayı göster</summary><p><strong>{exercise.answer}</strong></p><p>{exercise.explanation}</p></details>
          </div>
        ))}
      </section>
    </>
  );
}
