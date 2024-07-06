// E:\CRM\Firebase\sites\moroccoil\src\utils\generate-sitemap.js

const siteSettings = require('../assets/data/siteUtils');
const { SitemapStream, streamToPromise } = require('sitemap');
const { readFileSync } = require('fs');
const path = require('path');
const fs = require('fs-extra');

const publicDir = path.join(process.cwd(), 'public');
const dataDir = path.join(publicDir, 'data');

console.log('Public Directory:', publicDir);
console.log('Data Directory:', dataDir);

// Load metadata.json
const metadataFilePath = path.join(dataDir, 'metadata.json');
console.log('Metadata File Path:', metadataFilePath);
const metadata = JSON.parse(readFileSync(metadataFilePath, 'utf-8'));

// Create a sitemap stream
const sitemap = new SitemapStream({ hostname: siteSettings.siteUrl });

// Add static pages
sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.8 });

// Add dynamic pages from metadata.json
metadata.forEach(article => {
  sitemap.write({
    url: article.url,
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: article.lastModified
  });
});

// End the stream
sitemap.end();

// Convert stream to promise and write to sitemap.xml
streamToPromise(sitemap).then(data => {
  const sitemapDir = path.join(publicDir, 'sitemap');
  console.log('Sitemap Directory:', sitemapDir);
  fs.ensureDirSync(sitemapDir);
  fs.writeFileSync(path.join(sitemapDir, 'sitemap.xml'), data.toString());
  console.log('Sitemap created successfully!');
}).catch(err => {
  console.error('Error creating sitemap:', err);
});
