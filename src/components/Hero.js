// src/components/Hero.js
import React from 'react';
import styles from './Hero.module.css'; // Correctly use CSS modules
import siteSettings from '../assets/data/siteUtils';
import Link from 'next/link';




const Hero = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.hero}>
      
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{`${siteSettings.country} ${currentYear} - מתל אביב ל${siteSettings.country} עבור המטייל הישראלי`}</h1>
        <h2 className={styles.heroSubtitle}>
          {siteSettings.heroSubtitle}
        </h2>
      </div>
      <div className={styles.heroButtonsFrame}>
        <div className={styles.heroButtonsRow}>
          <Link href="/" className={styles.heroButton}>ביטוח נסיעות ל{siteSettings.country}</Link>
          <Link href="/" className={styles.heroButton}>סוכני נסיעות מומלצים ל{siteSettings.country}</Link>
          <Link href="/" className={styles.heroButton}>הזמנת מלון ב{siteSettings.country}</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
