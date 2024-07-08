// src/components/Footer.js
import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import siteSettings from '../assets/data/siteUtils';
import logoIcon from '../../public/staticImages/logo.svg';
import facebookIcon from '../assets/images/facebook.svg';
import instagramIcon from '../assets/images/instagram.svg';
import twitterIcon from '../assets/images/twitter.svg';
import youtubeIcon from '../assets/images/youtube.svg';
import linkedinIcon from '../assets/images/linkedin.svg';

const Footer = ({ sites }) => (
  <footer>
    <div className={styles.footerTop}>
      <div className={styles.footerColumn}>
        <h3>{siteSettings.country} למטייל</h3>
        <p>{siteSettings.about}</p>
        <a href="/about">עוד עלינו</a>
      </div>
      <div className={styles.footerColumn}>
        <Image src={logoIcon} className={styles.logo} alt="Menu" />
        <div className={styles.socialIcons}>
          <a href="https://www.facebook.com/AidAirClaim" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Image src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Image src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Image src={twitterIcon} alt="Twitter" />
          </a>
          <a href="https://www.youtube.com/channel/UCf3wHOjfX8fDrkpa6tTSD4Q" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Image src={youtubeIcon} alt="YouTube" />
          </a>
          <a href="https://www.linkedin.com/company/aid-air/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Image src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
    <div className={styles.footerBottom}>
      <p><a href="/privacy-policy">הצהרת נגישות</a></p>
    </div>
  </footer>
);

export default Footer;
