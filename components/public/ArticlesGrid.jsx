'use client';

import { useState } from 'react';
import Link from 'next/link';

const filters = ['Tümü', 'Türev', 'İntegral'];

export default function ArticlesGrid({ articles }) {
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [visibleCount, setVisibleCount] = useState(6);
  const filtered = activeFilter === 'Tümü' ? articles : articles.filter(({ category }) => category === activeFilter);
  const [featured, ...remaining] = filtered;
  const visible = remaining.slice(0, visibleCount);

  const selectFilter = (filter) => {
    setActiveFilter(filter);
    setVisibleCount(6);
  };

  return (
    <>
      <div className="articles-filters" aria-label="Makale kategorileri">
        {filters.map((filter) => (
          <button type="button" className={activeFilter === filter ? 'active' : ''} aria-pressed={activeFilter === filter} onClick={() => selectFilter(filter)} key={filter}>
            {filter}<span>{filter === 'Tümü' ? articles.length : articles.filter(({ category }) => category === filter).length}</span>
          </button>
        ))}
      </div>

      {featured && <Link href={`/makaleler/${featured.slug}`} className="article-featured-card">
        <div className={`article-featured-visual article-visual-${featured.category.toLocaleLowerCase('tr-TR')}`} aria-hidden="true"><span>{featured.symbol}</span><small>{featured.formula}</small></div>
        <div className="article-featured-copy"><div className="article-list-meta"><span>{featured.category}</span><span>{featured.readingTime} dakika</span><span>Öne çıkan</span></div><h2>{featured.title}</h2><p>{featured.description}</p><strong>Yazıyı oku <span aria-hidden="true">→</span></strong></div>
      </Link>}

      <div className="articles-wide-list">
        {visible.map((article) => <Link href={`/makaleler/${article.slug}`} className="article-featured-card article-wide-card" key={article.slug}>
          <div className={`article-featured-visual article-visual-${article.category.toLocaleLowerCase('tr-TR')}`} aria-hidden="true"><span>{article.symbol}</span><small>{article.formula}</small></div>
          <div className="article-featured-copy"><div className="article-list-meta"><span>{article.category}</span><span>{article.readingTime} dakika</span><span>AYT Matematik</span></div><h2>{article.title}</h2><p>{article.description}</p><strong>Yazıyı oku <span aria-hidden="true">→</span></strong></div>
        </Link>)}
      </div>

      {visibleCount < remaining.length && <div className="articles-more"><button type="button" onClick={() => setVisibleCount((count) => count + 6)}>Daha fazla göster <span>{remaining.length - visibleCount}</span></button></div>}
      {filtered.length === 0 && <p className="articles-empty">Bu kategoride henüz makale bulunmuyor.</p>}
    </>
  );
}
