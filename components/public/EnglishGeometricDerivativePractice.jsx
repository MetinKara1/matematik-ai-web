import Link from 'next/link';
import DerivativeMiniQuiz from './DerivativeMiniQuiz';
import TangentExplorer from './TangentExplorer';

const examples = [
  ['1. Slope at a point', 'For f(x) = x², find the tangent slope at x = 3.', ['The slope is f′(3), not the height f(3).', 'The power rule gives f′(x) = 2x.', 'Substitute x = 3: f′(3) = 6.'], 'The slope is 6. The height f(3) = 9 is a different quantity.'],
  ['2. Tangent equation', 'Find the tangent to f(x) = x² at x = −1.', ['Calculate the point: f(−1) = 1, so the point is (−1, 1).', 'Calculate the slope: f′(−1) = −2.', 'Use point-slope form: y − 1 = −2(x + 1).'], 'y = −2x − 1. Check: x = −1 gives y = 1, so the line passes through the tangent point.'],
  ['3. A parallel tangent', 'Where is the tangent to f(x) = x² parallel to y = 4x + 7?', ['Parallel lines have the same slope. The required slope is 4.', 'Solve f′(a) = 4: 2a = 4 gives a = 2.', 'The point is (2, 4), because f(2) = 4.'], 'The tangent is y = 4x − 4. Parallel lines need not have the same constant term.'],
  ['4. The normal line', 'Find the normal to f(x) = x² at (1, 1).', ['The normal is perpendicular to the tangent. The tangent slope is f′(1) = 2.', 'The normal slope is the negative reciprocal: −1/2.', 'Use the same point: y − 1 = −(1/2)(x − 1).'], 'y = −x/2 + 3/2. The product of the slopes is 2 · (−1/2) = −1.'],
  ['5. Horizontal tangent versus extremum', 'For f(x) = x³, is x = 0 a local maximum or minimum?', ['f′(x) = 3x², so f′(0) = 0 and the tangent is horizontal.', 'The derivative is positive on both sides of zero; the function keeps increasing.', 'There is no derivative sign change and no local extremum at zero.'], 'The tangent is y = 0. A horizontal tangent alone does not prove a maximum or minimum.'],
  ['6. Tangents through an external point', 'Find the tangents to f(x) = x² that pass through (0, −1).', ['Write the unknown tangent point as (a, a²); its slope is 2a.', 'The tangent equation is y − a² = 2a(x − a), or y = 2ax − a².', 'Substitute (0, −1): −1 = −a², giving a = 1 or a = −1.', 'Substitute each value into the tangent equation.'], 'The two tangents are y = 2x − 1 and y = −2x − 1, touching at (1, 1) and (−1, 1).'],
];
const exercises = [
  ['Find the normal slope for f(x) = x² at x = 2.', 'f′(2) = 4, so the normal slope is −1/4.'],
  ['Find the tangent to f(x) = x² + 1 at x = 1.', 'The point is (1, 2) and the slope is 2. Thus y − 2 = 2(x − 1), or y = 2x.'],
  ['Find the x coordinates of horizontal tangents to f(x) = x³ − 3x.', 'Solve f′(x) = 3x² − 3 = 0: x = −1 or x = 1. The corresponding tangents are y = 2 and y = −2.'],
];
export const englishGeometricToc = [{ id: 'derivative-quiz', label: '8-question mini quiz' }, { id: 'interactive-tangent', label: 'Interactive tangent graph' }, { id: 'worked-problems', label: '6 worked problems' }, { id: 'common-mistakes', label: '3 common mistakes' }, { id: 'practice', label: 'Try it yourself' }];
export default function EnglishGeometricDerivativePractice() {
  return <>
    <section id="interactive-tangent"><h2>Explore the tangent slope on a graph</h2><TangentExplorer locale="en" /></section>
    <section id="worked-problems"><h2>Geometric meaning of the derivative: 6 worked problems</h2><p>Separate the tangent point from the slope in each problem. Review the <Link href="/en/articles/derivative-rules">derivative rules</Link> if needed.</p>{examples.map(([title, question, steps, answer]) => <div className="geometry-example" key={title}><h3>{title}</h3><p><strong>Problem:</strong> {question}</p><ol>{steps.map(step => <li key={step}>{step}</li>)}</ol><p className="geometry-answer"><strong>Result and check:</strong> {answer}</p></div>)}</section>
    <section id="common-mistakes"><h2>3 common mistakes</h2><h3>1. Confusing f(a) with f′(a)</h3><p>f(a) is the height of the point; f′(a) is the tangent slope. For f(x) = x² at a = 2 both happen to be 4. At a = 3 the height is 9 and the slope is 6.</p><h3>2. Always using −1/m for the normal slope</h3><p>The formula applies only when the tangent slope is nonzero. A horizontal tangent has a vertical normal, x = a. A vertical line has undefined slope; do not divide by zero.</p><h3>3. Assuming f′(a) = 0 proves an extremum</h3><p>A zero derivative indicates a horizontal tangent. Check the derivative sign on both sides. A change from positive to negative gives a local maximum; negative to positive gives a local minimum. For f(x) = x³ at zero there is no sign change.</p></section>
    <section id="practice"><h2>Try it yourself: 3 short exercises</h2><p>Solve each problem before revealing the answer.</p>{exercises.map(([question, answer], index) => <div className="geometry-exercise" key={question}><h3>Exercise {index + 1}</h3><p>{question}</p><details><summary>Show the answer and solution</summary><p>{answer}</p></details></div>)}</section>
    <DerivativeMiniQuiz locale="en" />
  </>;
}
