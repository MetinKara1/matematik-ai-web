'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ArticlesGrid({ articles, locale = 'tr', basePath = '/makaleler' }) {
  const isEnglish = locale === 'en';
  const filters = [isEnglish ? 'All' : 'Tümü', ...new Set(articles.map(({ category }) => category))];
  const allFilter = filters[0];
  const [activeFilter, setActiveFilter] = useState(allFilter);
  const [visibleCount, setVisibleCount] = useState(6);
  const filtered = activeFilter === allFilter ? articles : articles.filter(({ category }) => category === activeFilter);
  const visible = filtered.slice(0, visibleCount);

  const selectFilter = (filter) => {
    setActiveFilter(filter);
    setVisibleCount(6);
  };

  return (
    <>
      <div className="articles-filters" aria-label={isEnglish ? 'Article categories' : 'Makale kategorileri'}>
        {filters.map((filter) => (
          <button type="button" className={activeFilter === filter ? 'active' : ''} aria-pressed={activeFilter === filter} onClick={() => selectFilter(filter)} key={filter}>
            {filter}<span>{filter === allFilter ? articles.length : articles.filter(({ category }) => category === filter).length}</span>
          </button>
        ))}
      </div>

      <div className="articles-wide-list">
        {visible.map((article) => <Link href={article.href || `${basePath}/${article.slug}`} className="article-featured-card article-wide-card" key={article.slug}>
          <div className={`article-featured-visual article-visual-${article.category.toLocaleLowerCase(isEnglish ? 'en-US' : 'tr-TR')}`} aria-hidden="true"><span>{article.symbol}</span><small>{article.formula}</small></div>
          <div className="article-featured-copy"><div className="article-list-meta"><span>{article.category}</span><span>{article.readingTime} {isEnglish ? 'min read' : 'dakika'}</span><span>{isEnglish ? 'Mathematics' : 'AYT Matematik'}</span></div><h2>{article.title}</h2><p>{article.description}</p><strong>{isEnglish ? 'Read article' : 'Yazıyı oku'} <span aria-hidden="true">→</span></strong></div>
        </Link>)}
      </div>

      {visibleCount < filtered.length && <div className="articles-more"><button type="button" onClick={() => setVisibleCount((count) => count + 6)}>{isEnglish ? 'Show more' : 'Daha fazla göster'} <span>{filtered.length - visibleCount}</span></button></div>}
      {filtered.length === 0 && <p className="articles-empty">{isEnglish ? 'No articles are available in this category yet.' : 'Bu kategoride henüz makale bulunmuyor.'}</p>}
    </>
  );
}
