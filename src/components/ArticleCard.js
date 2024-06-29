// src/components/ArticleCard.js

import React from 'react';
import Link from 'next/link';
import styles from './ArticleCard.module.css';

const ArticleCard = ({ article }) => {
  const { title, image } = article;

  return (
    <div className={styles.articleCard} style={{ backgroundImage: `url(${image})` }}>
      <Link href={article.url} className={styles.overlay}>
        <h2 className={styles.blogTitle}>{title}</h2>
        <p className={styles.blogTime}>זמן קריאה: 5 דקות</p>
      </Link>
    </div>
  );
};

export default ArticleCard;
