/**
 * Appends Cloudinary transformation parameters to a URL.
 * Defaults to auto-quality and auto-format.
 */
export const cloudinaryUrl = (url, options = {}) => {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('cloudinary.com')) return url;

  const { width, height, quality = 'auto', format = 'auto' } = options;
  
  // Base transformations
  const transformations = [`q_${quality}`, `f_${format}`];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push('c_limit'); // Better aspect ratio handling

  const transformString = transformations.join(',');
  
  // Inject before /upload/v...
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/${transformString}/${parts[1]}`;
  }
  
  return url;
};
