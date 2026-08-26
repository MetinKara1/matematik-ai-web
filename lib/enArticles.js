import { englishFoundationArticles } from './enFoundationArticles.js';

export const englishArticles = [
  ...englishFoundationArticles,
  {
    slug: 'integral-formulas', trSlug: 'integral-formulleri', category: 'Integrals', symbol: '∫', formula: 'xⁿ⁺¹/(n+1)', readingTime: 9,
    title: 'Integral Formulas: Essential Rules and Examples',
    description: 'Review the essential power, exponential, logarithmic, and trigonometric integration formulas with concise worked examples.',
    summary: 'Identify the function family, account for an inner derivative, add the constant of integration, and differentiate your result to check it.',
    sections: [
      { id: 'basic', title: 'Basic integration formulas', paragraphs: ['Integration reverses differentiation. If F′(x) = f(x), then ∫f(x)dx = F(x) + C. The constant C represents all antiderivatives that differ only by a constant.'], formulas: ['∫k dx = kx + C', '∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ −1', '∫1/x dx = ln|x| + C'] },
      { id: 'exponential', title: 'Exponential and logarithmic formulas', paragraphs: ['The function eˣ is unchanged by integration. For any other positive base a ≠ 1, divide by ln(a).'], formulas: ['∫eˣ dx = eˣ + C', '∫aˣ dx = aˣ/ln(a) + C', '∫ln(x) dx = xln(x) − x + C'] },
      { id: 'trigonometric', title: 'Trigonometric integration formulas', paragraphs: ['Sign errors are common in trigonometric integrals. Differentiate the result mentally to verify each sign.'], formulas: ['∫sin(x) dx = −cos(x) + C', '∫cos(x) dx = sin(x) + C', '∫sec²(x) dx = tan(x) + C'] },
      { id: 'linear', title: 'Formulas containing ax+b', paragraphs: ['When the inner function is linear, its derivative contributes a constant factor. Divide by a to balance that factor.'], formulas: ['∫(ax+b)ⁿ dx = (ax+b)ⁿ⁺¹/[a(n+1)] + C', '∫eᵃˣ⁺ᵇ dx = eᵃˣ⁺ᵇ/a + C'] },
      { id: 'check', title: 'How to check an integral', paragraphs: ['Differentiate your antiderivative. If you recover the original integrand, including every coefficient and sign, the result is correct. For example, d/dx[x⁴ − 2ln|x|] = 4x³ − 2/x.'] },
    ],
  },
  {
    slug: 'integration-rules', trSlug: 'integral-alma-kurallari', category: 'Integrals', symbol: '∫', formula: 'F(x) + C', readingTime: 8,
    title: 'Integration Rules: A Step-by-Step Guide',
    description: 'Learn the core integration rules, how to choose a method, and how to verify an antiderivative with worked examples.',
    summary: 'Simplify the integrand, split sums into terms, apply the matching rule to each term, and add C for an indefinite integral.',
    sections: [
      { id: 'meaning', title: 'What integration means', paragraphs: ['An antiderivative of f is any function F whose derivative is f. This makes differentiation the most reliable way to check an indefinite integral.'], formulas: ['d/dx (x³/3) = x²', 'Therefore ∫x² dx = x³/3 + C'] },
      { id: 'linearity', title: 'Constant multiple and sum rules', paragraphs: ['Constants can move outside an integral, and a sum or difference can be integrated term by term.'], formulas: ['∫k·f(x) dx = k∫f(x) dx', '∫[f(x) ± g(x)] dx = ∫f(x)dx ± ∫g(x)dx'] },
      { id: 'power', title: 'The power rule', paragraphs: ['Increase the exponent by one and divide by the new exponent. The case n = −1 is excluded because it would require division by zero.'], formulas: ['∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ −1', '∫1/x dx = ln|x| + C'] },
      { id: 'example', title: 'Worked polynomial example', paragraphs: ['Integrate each term independently and keep its coefficient.'], formulas: ['∫(3x² − 4x + 5)dx', '= x³ − 2x² + 5x + C'] },
      { id: 'method', title: 'How to choose an integration method', paragraphs: ['Try simplification and basic formulas first. Look for substitution when an inner function and its derivative appear together. Use integration by parts for products where differentiating one factor makes it simpler.'] },
    ],
  },
  {
    slug: 'derivative-rules', trSlug: 'turev-alma-kurallari', category: 'Derivatives', symbol: 'f′', formula: 'nxⁿ⁻¹', readingTime: 8,
    title: 'Derivative Rules: Formulas and Worked Examples',
    description: 'Learn the power, product, quotient, and chain rules with clear examples and a practical method-selection checklist.',
    summary: 'Choose the rule from the structure of the function: powers use the power rule, products and quotients use their own rules, and compositions use the chain rule.',
    sections: [
      { id: 'basic', title: 'Constant, sum, and power rules', paragraphs: ['Differentiate sums term by term. A constant has derivative zero, while a power loses one from its exponent and gains the old exponent as a coefficient.'], formulas: ['d/dx[c] = 0', 'd/dx[xⁿ] = nxⁿ⁻¹', 'd/dx[f(x) ± g(x)] = f′(x) ± g′(x)'] },
      { id: 'product', title: 'The product rule', paragraphs: ['For a product, differentiate one factor at a time while leaving the other unchanged.'], formulas: ['(fg)′ = f′g + fg′', 'd/dx[x²eˣ] = 2xeˣ + x²eˣ'] },
      { id: 'quotient', title: 'The quotient rule', paragraphs: ['Keep the denominator squared and preserve the subtraction order in the numerator.'], formulas: ['(f/g)′ = (f′g − fg′)/g²'] },
      { id: 'chain', title: 'The chain rule', paragraphs: ['For a function inside another function, differentiate the outer function and multiply by the derivative of the inner function.'], formulas: ['d/dx[f(g(x))] = f′(g(x))g′(x)', 'd/dx[(3x+1)⁵] = 15(3x+1)⁴'] },
      { id: 'checklist', title: 'A quick rule-selection checklist', paragraphs: ['Simplify first. Identify whether the main operation is a sum, product, quotient, or composition. Apply the corresponding rule, then simplify the derivative and check special points when possible.'] },
    ],
  },
];

export function getEnglishArticle(slug) {
  return englishArticles.find((article) => article.slug === slug);
}
