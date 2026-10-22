'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getLessonScope } from '../../lib/lessonScope';

export default function ArticlesGrid({ articles, locale = 'tr', basePath = '/makaleler', contentLabel, headingLevel = 2, categoryLabel }) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const isEnglish = locale === 'en';
  const filters = [isEnglish ? 'All' : 'Tümü', ...new Set(articles.map(({ category }) => category))];
  const allFilter = filters[0];
  const [activeFilter, setActiveFilter] = useState(allFilter);
  const filtered = activeFilter === allFilter ? articles : articles.filter(({ category }) => category === activeFilter);
  const visible = filtered.slice(0, 6);
  const remaining = filtered.slice(6);

  const selectFilter = (filter) => {
    setActiveFilter(filter);
  };

  const renderCard = (article) => <Link href={article.href || `${basePath}/${article.slug}`} className="article-featured-card article-wide-card" key={article.slug}>
          <div className={`article-featured-visual article-visual-${article.category.toLocaleLowerCase(isEnglish ? 'en-US' : 'tr-TR')}`} aria-hidden="true"><span>{article.symbol}</span><small>{article.formula}</small></div>
          <div className="article-featured-copy"><div className="article-list-meta"><span>{article.category}</span><span>{!isEnglish && getLessonScope(article.slug) ? '≈ ' : ''}{article.readingTime} {isEnglish ? 'min read' : 'dakika'}</span><span>{(!isEnglish && getLessonScope(article.slug)?.label) || contentLabel || (isEnglish ? 'Mathematics' : 'Konu anlatımı')}</span></div><Heading>{article.title}</Heading><p>{article.description}</p><strong>{isEnglish ? 'Read article' : 'Yazıyı oku'} <span aria-hidden="true">→</span></strong></div>
        </Link>;

  return (
    <>
      <div className="articles-filters" aria-label={categoryLabel || (isEnglish ? 'Article categories' : 'Makale kategorileri')}>
        {filters.map((filter) => (
          <button type="button" className={activeFilter === filter ? 'active' : ''} aria-pressed={activeFilter === filter} onClick={() => selectFilter(filter)} key={filter}>
            {filter}<span>{filter === allFilter ? articles.length : articles.filter(({ category }) => category === filter).length}</span>
          </button>
        ))}
      </div>

      <div className="articles-wide-list">
        {visible.map(renderCard)}
      </div>

      {remaining.length > 0 && <details className="articles-more" key={activeFilter}>
        <summary>{isEnglish ? 'More articles' : 'Diğer makaleler'} <span>{remaining.length}</span></summary>
        <div className="articles-wide-list">{remaining.map(renderCard)}</div>
      </details>}
      {filtered.length === 0 && <p className="articles-empty">{isEnglish ? 'No articles are available in this category yet.' : 'Bu kategoride henüz makale bulunmuyor.'}</p>}
    </>
  );
}
