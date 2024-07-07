import React, { useState } from 'react';
import Image from 'next/image';
import styles from './HighPriorityImage.module.css';

const HighPriorityImage = ({ src, placeholderSrc, alt, title, width, height, style }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.imageWrapper} style={{ position: 'relative', width: '100%', paddingTop: `${(height / width) * 100}%` }}>
      {!loaded && (
        <Image
          src={placeholderSrc}
          alt={alt}
          title={title}
          fill
          style={{ objectFit: 'cover', ...style, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} // Using the new style property
          className={styles.placeholder}
        />
      )}
      <Image
        src={src}
        alt={alt}
        title={title}
        fill
        style={{ objectFit: 'cover', ...style, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} // Using the new style property
        priority={true}
        onLoad={() => setLoaded(true)}
        className={`${styles.mainImage} ${loaded ? styles.loaded : ''}`}
      />
    </div>
  );
};

export default HighPriorityImage;
