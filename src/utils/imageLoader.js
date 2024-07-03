export default function customLoader({ src }) {
  if (!src) {
    throw new Error('Image src cannot be empty');
  }
  if (src.startsWith('/')) {
    src = src.slice(1); // Remove leading slash if present
  }
  const imagePath = process.env.IMAGES_PATH || 'public/images'; // Default path if not defined
  return `${imagePath}/${src}`;
}
