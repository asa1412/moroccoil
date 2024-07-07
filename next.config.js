const siteSettings = require('./src/assets/data/siteUtils');

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: siteSettings.siteUrl.replace(/^https?:\/\//, ''),
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    loader: 'default',
    path: '/_next/image',
  },
  env: {
    CONTENT_PATH: 'public/data',
    IMAGES_PATH: 'public/images',
    METADATA_PATH: 'public/data/metadata.json',
    METADATA_IMAGE_PATH: 'public/images/metadataimage.json',
    SITE_URL: siteSettings.siteUrl,
    COUNTRY: siteSettings.country,
  },
};
