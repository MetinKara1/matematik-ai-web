'use client';

import { useState, useEffect } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { solvedQuestionsAPI } from '../../lib/api';

function SolutionPage({ solutionId, initialQuestion = null, initialError = '' }) {
  const id = solutionId;
  const [question, setQuestion] = useState(initialQuestion);
  const [loading, setLoading] = useState(!initialQuestion && !initialError);
  const [error, setError] = useState(initialError);

  useEffect(() => {
    if (id && !initialQuestion && !initialError) {
      loadSolution(id);
    }
  }, [id, initialQuestion, initialError]);

  useEffect(() => {
    // Update meta tags for sharing
    if (question) {
      // Update document title
      document.title = `Matematik Soru Çözümü - ${question.Question ? question.Question.substring(0, 60) : 'Soru'}`;
      
      // Update or create meta tags
      const updateMetaTag = (name, content, isProperty = false) => {
        const attribute = isProperty ? 'property' : 'name';
        let meta = document.querySelector(`meta[${attribute}="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attribute, name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      const siteUrl = window.location.origin;
      const solutionUrl = `${siteUrl}/solution/${id}`;
      const imageUrl = question.ImageUri || `${siteUrl}/og-image-default.jpg`;
      const description = question.Solution 
        ? question.Solution.substring(0, 200) 
        : 'Matematik soru çözümü detayları';

      // Open Graph tags
      updateMetaTag('og:title', question.Question ? question.Question.substring(0, 60) : 'Matematik Soru Çözümü', true);
      updateMetaTag('og:description', description, true);
      updateMetaTag('og:image', imageUrl, true);
      updateMetaTag('og:url', solutionUrl, true);
      updateMetaTag('og:type', 'article', true);

      // Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', question.Question ? question.Question.substring(0, 60) : 'Matematik Soru Çözümü');
      updateMetaTag('twitter:description', description);
      updateMetaTag('twitter:image', imageUrl);

      // Standard meta tags
      updateMetaTag('description', description);
    }
  }, [question, id]);

  const loadSolution = async (solutionId) => {
    setLoading(true);
    setError('');
    try {
      // Public endpoint - no auth required
      const response = await solvedQuestionsAPI.getPublicById(solutionId);
      setQuestion(response);
    } catch (err) {
      const errorMessage = err.message || 'Soru çözümü yüklenirken bir hata oluştu';
      setError(errorMessage);
      console.error('Solution API Error:', err);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Question Image */}
        {question.ImageUri && (
          <div className="solution-image-container">
            <img 
              src={question.ImageUri} 
              alt="Soru görseli" 
              className="solution-image"
              onClick={() => {
                const newWindow = window.open();
                newWindow.document.write(`
                  <html>
                    <head><title>Soru Görseli</title></head>
                    <body style="margin:0; padding:20px; background:#f5f5f5; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                      <img src="${question.ImageUri}" style="max-width:100%; height:auto; box-shadow:0 4px 6px rgba(0,0,0,0.1);" />
                    </body>
                  </html>
                `);
              }}
            />
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
