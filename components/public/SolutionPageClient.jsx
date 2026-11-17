'use client';

import { useState, useEffect } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { normalizeSharedQuestion } from '../../lib/sharedSolutionImage.mjs';
import { solvedQuestionsAPI } from '../../lib/api';

function SolutionPage({ solutionId, initialQuestion = null, initialError = '' }) {
  const id = solutionId;
  const [question, setQuestion] = useState(initialQuestion);
  const [loading, setLoading] = useState(!initialQuestion && !initialError);
  const [error, setError] = useState(initialError);



  const [imageFailed, setImageFailed] = useState(false);

  async function loadSolution(solutionId) {
    setLoading(true);
    setError('');
    try {
      // Public endpoint - no auth required
      const response = await solvedQuestionsAPI.getPublicById(solutionId);
      setQuestion(normalizeSharedQuestion(response, solutionId));
      setImageFailed(false);
    } catch (err) {
      const errorMessage = err.message || 'Soru çözümü yüklenirken bir hata oluştu';
      setError(errorMessage);
      console.error('Solution API Error:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id && !initialQuestion && !initialError) {
      const task = setTimeout(() => { void loadSolution(id); }, 0);
      return () => clearTimeout(task);
    }
  }, [id, initialQuestion, initialError]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Matematik Soru Çözümü',
        text: question?.Question || 'Bu soru çözümünü inceleyin',
        url: url,
      }).catch((err) => {
        console.log('Share failed:', err);
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link kopyalandı!');
    }).catch(() => {
      alert('Link kopyalanamadı');
    });
  };

  // LaTeX render helper - parses text and renders math expressions
  const renderWithMath = (text) => {
    if (!text) return null;

    const elements = [];
    let processedText = text;
    let keyCounter = 0;

    // First, replace block math ($$...$$) with placeholders
    const blockMathPlaceholders = [];
    const blockMathRegex = /\$\$([^$]+?)\$\$/g;
    let blockMatch;
    let blockIndex = 0;

    while ((blockMatch = blockMathRegex.exec(text)) !== null) {
      const placeholder = `__BLOCK_MATH_${blockIndex}__`;
      blockMathPlaceholders.push({
        placeholder,
        content: blockMatch[1].trim(),
      });
      processedText = processedText.replace(blockMatch[0], placeholder);
      blockIndex++;
    }

    // Then, replace inline math ($...$) with placeholders (but not $$)
    const inlineMathPlaceholders = [];
    const inlineMathRegex = /\$([^$\n]+?)\$/g;
    let inlineMatch;
    let inlineIndex = 0;

    while ((inlineMatch = inlineMathRegex.exec(processedText)) !== null) {
      // Skip if it's a block math placeholder
      if (inlineMatch[0].includes('__BLOCK_MATH_')) continue;
      
      const placeholder = `__INLINE_MATH_${inlineIndex}__`;
      inlineMathPlaceholders.push({
        placeholder,
        content: inlineMatch[1].trim(),
      });
      processedText = processedText.replace(inlineMatch[0], placeholder);
      inlineIndex++;
    }

    // Split by placeholders and newlines
    const parts = processedText.split(/(__BLOCK_MATH_\d+__|__INLINE_MATH_\d+__|\n)/);

    parts.forEach((part) => {
      if (!part) return;

      // Check if it's a block math placeholder
      const blockPlaceholder = blockMathPlaceholders.find((p) => p.placeholder === part);
      if (blockPlaceholder) {
        try {
          elements.push(
            <div key={`math-block-${keyCounter++}`} className="math-block">
              <BlockMath math={blockPlaceholder.content} />
            </div>
          );
        } catch (error) {
          console.warn('LaTeX block math parse error:', error);
          elements.push(
            <span key={`math-error-${keyCounter++}`} style={{ color: '#dc2626' }}>
              $${blockPlaceholder.content}$$
            </span>
          );
        }
        return;
      }

      // Check if it's an inline math placeholder
      const inlinePlaceholder = inlineMathPlaceholders.find((p) => p.placeholder === part);
      if (inlinePlaceholder) {
        try {
          elements.push(
            <InlineMath key={`math-inline-${keyCounter++}`} math={inlinePlaceholder.content} />
          );
        } catch (error) {
          console.warn('LaTeX inline math parse error:', error);
          elements.push(
            <span key={`math-error-${keyCounter++}`} style={{ color: '#dc2626' }}>
              ${inlinePlaceholder.content}$
            </span>
          );
        }
        return;
      }

      // Handle newlines
      if (part === '\n') {
        elements.push(<br key={`br-${keyCounter++}`} />);
        return;
      }

      // Regular text
      elements.push(<span key={`text-${keyCounter++}`}>{part}</span>);
    });

    return elements.length > 0 ? elements : <span>{text}</span>;
  };

  if (loading) {
    return (
      <div className="solution-page">
        <div className="solution-loading">
          <div className="loading-spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="solution-page">
        <div className="solution-error">
          <h2>Hata</h2>
          <p>{error}</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary">
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="solution-page">
        <div className="solution-error">
          <h2>Soru Bulunamadı</h2>
          <p>Belirtilen soru çözümü bulunamadı.</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary">
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="solution-page">
      <div className="solution-container">
        {/* Header */}
        <div className="solution-header">
          <h1>Matematik Soru Çözümü</h1>
          <button onClick={handleShare} className="btn-share">
            📤 Paylaş
          </button>
        </div>

        {/* The stable HTTP image URL works for browsers and WhatsApp crawlers. */}
        {(question.HasImage || question.ImageUri) && (
          <div className="solution-image-container">
            {question.ImageUri && !imageFailed ? (
              <a href={question.ImageUri} target="_blank" rel="noopener noreferrer" aria-label="Soru görselini tam boyutta aç">
                <img src={question.ImageUri} alt="Soru görseli" className="solution-image" onError={() => setImageFailed(true)} />
              </a>
            ) : (
              <p className="solution-image-unavailable" role="status">Bu kayıtta soru görseline ulaşılamıyor. Soru metni ve çözüm aşağıda yer alıyor.</p>
            )}
          </div>
        )}

        {/* Question Text */}
        {question.Question && (
          <div className="solution-question-text">
            <h2>Soru</h2>
            <div className="question-content">
              {renderWithMath(question.Question)}
            </div>
          </div>
        )}

        {/* Solution */}
        {question.Solution && (
          <div className="solution-answer">
            <h2>Çözüm</h2>
            <div className="solution-content">
              {renderWithMath(question.Solution)}
            </div>
          </div>
        )}

        {/* Solution Steps */}
        {question.Steps && Array.isArray(question.Steps) && question.Steps.length > 0 && (
          <div className="solution-steps">
            <h2>Çözüm Adımları</h2>
            <div className="steps-container">
              {question.Steps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    {renderWithMath(step)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="solution-footer">
          <p>Bu çözümü beğendiyseniz paylaşabilirsiniz!</p>
          <button onClick={handleShare} className="btn-share-large">
            📤 Çözümü Paylaş
          </button>
        </div>
      </div>
    </div>
  );
}

export default SolutionPage;
