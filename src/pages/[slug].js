import React from 'react';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { useRouter } from 'next/router';
import OptimizedImage from '../components/OptimizedImage';
import { articleImageSettings } from '../utils/imageSettings';
import styles from '../components/Article.module.css';
import Breadcrumbs from '../components/Breadcrumbs';
import siteSettings from '../assets/data/siteUtils';

const loadJSON = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const contentDir = process.env.EXTERNAL_CONTENT_DIR || path.join(process.cwd(), 'public');

export async function getStaticPaths() {
  const metadata = loadJSON(path.join(contentDir, 'data', 'metadata.json'));
  const paths = metadata.map(article => ({
    params: { slug: article.url.replace('/', '') }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const metadata = loadJSON(path.join(contentDir, 'data', 'metadata.json')).find(article => article.url.replace('/', '') === params.slug);
  const content = loadJSON(path.join(contentDir, 'data', `${metadata.id}.json`));
  const imageMetadata = loadJSON(path.join(contentDir, 'images', 'metadataimage.json'));

  // Find the subject image
  let subjectImageSrc = `/images/${metadata.id}_2.webp`;
  if (!fs.existsSync(path.join(contentDir, subjectImageSrc))) {
    subjectImageSrc = `/images/${metadata.id}_1.webp`;
  }

  const subjectImageMetadata = imageMetadata.find(img => img.src === subjectImageSrc) || {};

  // Map image metadata to content
  content.content.forEach(section => {
    if (section.type === 'image') {
      const imgMetadata = imageMetadata.find(img => img.src === section.src);
      if (imgMetadata) {
        section.alt = imgMetadata.alt;
        section.title = imgMetadata.title;
        section.caption = imgMetadata.caption;
        section.keywords = imgMetadata.keywords;
        section.creator = imgMetadata.creator;
        section.link_to_page = imgMetadata.link_to_page;
      }
    } else if (section.type === 'html') {
      // Wrap tables in the HTML content
      section.content = section.content.replace(/<table/g, '<div class="table-container"><table').replace(/<\/table>/g, '</table></div>');
    }
  });

  return {
    props: { content, metadata, subjectImageSrc, subjectImageMetadata },
    revalidate: 60 * 60 * 24 // Revalidate once per day
  };
}

const generateJsonLd = (metadata) => {
  const seo = metadata.seo || {};
  const og = seo.og || {};
  
  const articleBody = (metadata.content || [])
    .filter(section => section.type === 'html')
    .map(section => section.content)
    .join(' ');

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteSettings.siteUrl}${seo.canonicalUrl || ''}`
    },
    "headline": metadata.title,
    "image": og.image || '',
    "author": {
      "@type": "Person",
      "name": metadata.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Blog Name",
      "logo": {
        "@type": "ImageObject",
        "url": "Your Logo URL"
      }
    },
    "datePublished": metadata.datePublished,
    "description": seo.description || '',
    "articleBody": articleBody
  };
};

const Article = ({ content, metadata, subjectImageSrc, subjectImageMetadata }) => {
  const router = useRouter();
  const jsonLd = generateJsonLd(metadata);

  return (
    <article className={styles.article}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.seoDescription} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={`${siteSettings.siteUrl}${metadata.url}`} />
        <link rel="preload" href={subjectImageSrc} as="image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className={styles.topSection}>
        <Breadcrumbs title={metadata.title} />
        <h1 className={styles.title}>{metadata.title}</h1>
        <div className={styles.authorRow}>
          <div className={styles.authorImage}>
            <img 
              src="/staticImages/author.webp" 
              alt={`Photo of ${metadata.author}`} 
              width="50" 
              height="50" 
              loading="lazy" 
              decoding="async" 
            />
          </div>
          <div className={styles.authorInfo}>
            <div className={styles.author}>דניס רום</div>
            <div>{metadata.datePublished} • 5 דקות קריאה</div>
          </div>
        </div>
        {subjectImageSrc && (
          <figure className={styles.subjectImage}>
            <OptimizedImage
              src={subjectImageSrc}
              placeholderSrc="/staticImages/low-quality-placeholder.webp"
              alt={subjectImageMetadata.alt}
              title={subjectImageMetadata.title}
              width={articleImageSettings.width}
              height={720}
              priority={true} // Ensure priority is true for the subject image
              style={{ width: '100%', height: 'auto', maxHeight: '720px', color: 'transparent' }} // Maintain aspect ratio and max height
            />
            <figcaption>{subjectImageMetadata.caption}</figcaption>
          </figure>
        )}
      </div>

      <div className={styles.middleSection}>
        <div className={styles.mainColumn}>
          {content.content.map((section, index) => {
            if (section.type === 'html') {
              return <div key={index} className={styles.htmlSection} dangerouslySetInnerHTML={{ __html: section.content }} />;
            }
            if (section.type === 'image') {
              return (
                <figure key={index} className={styles.imageSection}>
                  <OptimizedImage
                    src={section.src}
                    placeholderSrc="/staticImages/low-quality-placeholder.webp" // Low-quality placeholder
                    alt={section.alt}
                    title={section.title}
                    width={articleImageSettings.width}
                    height={articleImageSettings.height}
                    priority={index === 0} // Prioritize the first image in the content
                    style={{ width: '100%', height: 'auto' }} // Maintain aspect ratio
                  />
                  <figcaption>{section.caption}</figcaption>
                </figure>
              );
            }
            return null;
          })}
        </div>
        <div className={styles.emptyColumn}></div>
      </div>
    </article>
  );
};

export default Article;