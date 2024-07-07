import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ContentImage.module.css';

const ContentImage = ({ src, placeholderSrc, alt, title, width, height, priority, style }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.imageWrapper}>
      {!loaded && (
        <Image
          src={placeholderSrc}
          alt={alt}
          title={title}
          width={width}
          height={height}
          priority={priority}
          className={`${styles.image} ${styles.placeholder}`}
          style={{ ...style }} // Apply styles from props
          fetchpriority={priority ? 'high' : 'auto'} // Ensure lowercase attribute
        />
      )}
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`${styles.image} ${loaded ? styles.loaded : styles.hidden}`}
        style={{ ...style }} // Apply styles from props
        fetchpriority={priority ? 'high' : 'auto'} // Ensure lowercase attribute
      />
    </div>
  );
};

export default ContentImage;
