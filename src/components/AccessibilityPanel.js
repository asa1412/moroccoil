// src/components/AccessibilityPanel.js
import React from 'react';
import Link from 'next/link';
import styles from './AccessibilityPanel.module.css';

const AccessibilityPanel = ({ isOpen, togglePanel }) => {
  const adjustFontSize = (increment) => {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = `${currentSize + increment}px`;
  };

  const toggleGrayscale = (event) => {
    document.body.style.filter = event.target.checked ? 'grayscale(100%)' : 'none';
  };

  const toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
  };

  const toggleInvertColors = () => {
    document.body.classList.toggle('invert-colors');
  };

  const toggleLightBackground = () => {
    document.body.classList.toggle('light-background');
  };

  const toggleHighlightLinks = () => {
    document.body.classList.toggle('highlight-links');
  };

  const toggleReadableFont = () => {
    document.body.classList.toggle('readable-font');
  };

  const resetAccessibility = () => {
    document.body.style.fontSize = '';
    document.body.style.filter = 'none';
    document.body.classList.remove('high-contrast', 'invert-colors', 'light-background', 'highlight-links', 'readable-font');
  };

  return (
    <div className={`${styles.accessibilityPanel} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeBtn} onClick={togglePanel}>X</button>
      <div className={styles.accessibilityOption}>
        <span>הגדלת / הקטנת טקסט</span>
        <button onClick={() => adjustFontSize(1)}>+</button>
        <button onClick={() => adjustFontSize(-1)}>-</button>
      </div>
      <div className={styles.accessibilityOption}>
        <span>שחור לבן</span>
        <label className={styles.switch}>
          <input type="checkbox" onChange={toggleGrayscale} />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.accessibilityOption}>
        <span>ניגודיות גבוה</span>
        <label className={styles.switch}>
          <input type="checkbox" onChange={toggleHighContrast} />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.accessibilityOption}>
        <span>ניגודיות הפוכה</span>
        <label className={styles.switch}>
          <input type="checkbox" onChange={toggleInvertColors} />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.accessibilityOption}>
        <span>רקע בהיר</span>
        <label className={styles.switch}>
          <input type="checkbox" onChange={toggleLightBackground} />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.accessibilityOption}>
        <span>הדגשת קישורים</span>
        <label className={styles.switch}>
          <input type="checkbox" onChange={toggleHighlightLinks} />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.accessibilityOption}>
        <span>גופן קריא</span>
        <label className={styles.switch}>
          <input type="checkbox" onChange={toggleReadableFont} />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.accessibilityOption}>
        <span>איפוס</span>
        <button onClick={resetAccessibility}>Reset</button>
      </div>
      <Link href="/accessibility-statement" className={styles.accessibilityLink}>הצהרת נגישות
      </Link>
    </div>
  );
};

export default AccessibilityPanel;
