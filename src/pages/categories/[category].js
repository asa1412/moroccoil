// src/pages/categories/[category].js
import React from 'react';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import styles from '../../styles/Category.module.css';

export async function getStaticPaths() {
  const metadataFilePath = path.join(process.cwd(), 'public', 'data', 'metadata.json');
  const metadataFileContents = fs.readFileSync(metadataFilePath, 'utf-8');
  const articles = JSON.parse(metadataFileContents);

  const categoriesFilePath = path.join(process.cwd(), 'src', 'assets', 'data', 'categories.json');
  const categoriesFileContents = fs.readFileSync(categoriesFilePath, 'utf-8');
  const categories = JSON.parse(categoriesFileContents);

  const paths = [...new Set(articles.map(article => article.category))]
    .map(categoryName => {
      const categoryObj = categories.find(cat => cat.name === categoryName);
      return {
        params: { category: categoryObj ? categoryObj.url : '' }
      };
    }).filter(path => path.params.category); // Filter out invalid paths

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const categoriesFilePath = path.join(process.cwd(), 'src', 'assets', 'data', 'categories.json');
  const categoriesFileContents = fs.readFileSync(categoriesFilePath, 'utf-8');
  const categories = JSON.parse(categoriesFileContents);

  const metadataFilePath = path.join(process.cwd(), 'public', 'data', 'metadata.json');
  const metadataFileContents = fs.readFileSync(metadataFilePath, 'utf-8');
  const articles = JSON.parse(metadataFileContents);

  const categoryName = categories.find(cat => cat.url === params.category)?.name || '';
  const categoryArticles = articles.filter(article => article.category === categoryName);

  return {
    props: {
      category: categoryName,
      categoryUrl: params.category,
      articles: categoryArticles || []
    }
  };
}

const CategoryPage = ({ category, categoryUrl, articles = [] }) => (
  <div className={styles.container}>
    <Head>
      <title>{`${category} - כל המאמרים בנושא `}</title>
      <meta name="description" content={`כל המאמרים בנושא ${category}`} />
    </Head>
    <Breadcrumbs title={category} category={category} categoryUrl={categoryUrl} isCategoryPage={true} />
    <h1>כל המאמרים בנושא {category}</h1>
    <ul className={styles.articleList}>
      {articles.map(article => (
        <li key={article.id} className={styles.articleItem}>
          <Link href={article.url}>
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default CategoryPage;
