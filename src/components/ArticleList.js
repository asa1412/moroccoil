// src/components/ArticleList.js

import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import styles from './ArticleList.module.css'; // Correctly import as CSS module

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This will run only on the client side
    setIsMobile(window.innerWidth <= 600);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('/data/metadata.json')
      .then(response => response.json())
      .then(data => setArticles(data.slice(0, 9))); // Only take the first 9 articles
  }, []);

  const renderRow = (start, count) => (
    <div className={styles.articleRow}>
      {articles.slice(start, start + count).map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );

  return (
    <>
      {!isMobile ? (
        <div className={styles.articleList}>
          {renderRow(0, 3)}  {/* First row with 3 cards */}
          {renderRow(3, 2)}  {/* Second row with 2 cards */}
          {renderRow(5, 3)}  {/* Third row with 3 cards */}
          {renderRow(8, 1)}  {/* Fourth row with 1 card */}
        </div>
      ) : (
        <div className={styles.articleListMobile}>
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </>
  );
};

export default ArticleList;
