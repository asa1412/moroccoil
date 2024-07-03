// src/components/Breadcrumbs.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import siteSettings from '../assets/data/siteUtils';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ title, category, categoryUrl, isCategoryPage }) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router.isReady]);

  if (!isReady) {
    return null; // Or some loading state
  }

  const pathnames = router.asPath.split('/').filter((x) => x);

  const breadcrumbList = pathnames.map((name, index) => {
    const url = `/${pathnames.slice(0, index + 1).join('/')}`;
    return {
      '@type': 'ListItem',
      position: index + 2, // Adjusted position to account for Home
      name: index === pathnames.length - 1 ? title : decodeURIComponent(name), // Decode URI components for display
      item: `${siteSettings.siteUrl}${url}`
    };
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteSettings.siteUrl}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category,
        item: `${siteSettings.siteUrl}/categories/${categoryUrl}`
      },
      ...breadcrumbList
    ]
  };

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ul className={styles.breadcrumb}>
          <li className={styles['breadcrumb-item']}>
            <Link href="/">ראשי</Link>
          </li>
          <li className={styles['breadcrumb-item']}>
            <Link href={`/categories/${categoryUrl}`}>
              {category}
            </Link>
          </li>
          {!isCategoryPage && pathnames.map((name, index) => {
            const url = `/${pathnames.slice(0, index + 1).join('/')}`;
            return (
              <li key={url} className={styles['breadcrumb-item']}>
                <Link href={url}>
                  {index === pathnames.length - 1 ? title : decodeURIComponent(name)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

export default Breadcrumbs;
