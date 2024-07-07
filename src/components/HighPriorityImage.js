import React from 'react';
import Image from 'next/image';
import styles from './HighPriorityImage.module.css';

const HighPriorityImage = ({ src, placeholderSrc, alt, title, width, height, style }) => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        src={placeholderSrc}
        alt={alt}
        title={title}
        width={width}
        height={height}
        priority={false} // Always high priority
        className={styles.placeholder}
        style={{ ...style }} // Apply styles from props
      />
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        priority={false} // Always high priority
        className={styles.image}
        style={{ ...style }} // Apply styles from props
      />
    </div>
  );
};

export default HighPriorityImage;
