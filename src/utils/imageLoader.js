export default function customLoader({ src }) {
    if (src.startsWith('/')) {
      src = src.slice(1); // Remove leading slash if present
    }
    return `${process.env.IMAGES_PATH}/${src}`;
  }
  