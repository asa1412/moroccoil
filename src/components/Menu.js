// src/components/Menu.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Menu.module.css';
import menuIcon from '../assets/images/menu.svg';
import closeIcon from '../assets/images/close.svg';
import accessibilityIcon from '../assets/images/Accessibility.svg';
import arrowBackIcon from '../assets/images/arrow_back.svg';

import siteSettings from '../assets/data/siteUtils';

const Menu = ({ toggleAccessibilityPanel }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navclass} aria-label="Main navigation">
        <div className={styles.topBar}>
          <button className={styles.menuButton} onClick={toggleMenu}>
          
            <Image src={menuIcon} alt="Menu" />
          </button>
          
          <div className={styles.wideScreenLinks}>
            <Link href="/" className={styles.wideLink}>ראשי</Link>
            <Link href="/about" className={styles.wideLink}>אודות</Link>
            <button className={styles.accessibilityButton} onClick={toggleAccessibilityPanel}>
              <Image src={accessibilityIcon} alt="Accessibility" /> נגישות
            </button>
          </div>
          <div className={styles.visaButtons}>
            <p className={styles.visaSubtitle}>חובה לקבל ויזה לפני הטיסה!</p>
            <Link href="/about" className={styles.visaButton}>
               ויזה ל{siteSettings.country}<Image src={arrowBackIcon} alt="Arrow Back" />
            </Link>
          </div>
        </div>
        
        <ul className={`${styles.menuList} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.menuHeader}>
            <button className={styles.closeButton} onClick={toggleMenu}>
              <Image src={closeIcon} alt="Close" />
            </button>
          </div>
          <li>
            <Link href="/" onClick={toggleMenu}>
              <Image src={arrowBackIcon} alt="Arrow Back" className={styles.arrowIcon} /> בית
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={toggleMenu}>
              <Image src={arrowBackIcon} alt="Arrow Back" className={styles.arrowIcon} /> אודות
            </Link>
          </li>
          <button className={styles.accessibilityButton} onClick={toggleAccessibilityPanel}>
            <Image src={accessibilityIcon} alt="Accessibility" /> נגישות 
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;