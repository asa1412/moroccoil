// src/components/Breadcrumbs.js
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import siteSettings from '../assets/data/siteUtils';
import styles from './Breadcrumbs.module.css'; // Import the CSS module

const Breadcrumbs = ({ title }) => {
  const router = useRouter();
  const pathnames = router.asPath.split('/').filter((x) => x);

  const breadcrumbList = pathnames.map((name, index) => {
    const url = `/${pathnames.slice(0, index + 1).join('/')}`;
    return {
      '@type': 'ListItem',
      position: index + 2, // Adjusted position to account for Home
      name: index === pathnames.length - 1 ? title : name, // Use title for the last item
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
          {pathnames.map((name, index) => {
            const url = `/${pathnames.slice(0, index + 1).join('/')}`;
            return (
              <li key={url} className={styles['breadcrumb-item']}>
                <Link href={url}>
                  {index === pathnames.length - 1 ? title : name}
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
