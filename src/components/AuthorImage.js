import React from 'react';
import Image from 'next/image';
import styles from './AuthorImage.module.css';

const AuthorImage = ({ src, alt, width, height }) => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 50px) 100vw, 50px"
        className={styles.image}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default AuthorImage;
