/**
 * Utility to load images from src/media folder
 */

// Import all images eagerly at build time
const imageModules = import.meta.glob<{ default: ImageMetadata }>('/src/media/**/*.{jpeg,jpg,png,gif,webp,svg,avif}', { 
  eager: true 
});

/**
 * Load an image from the media folder
 * @param path - Path like "/media/image.jpg"
 * @returns ImageMetadata or null if not found
 */
export function loadImage(path: string): ImageMetadata | null {
  if (!path.startsWith('/media/')) {
    return null;
  }
  
  // Convert /media/image.jpg to /src/media/image.jpg
  const imagePath = path.replace('/media/', '');
  const imageKey = `/src/media/${imagePath}`;
  
  if (imageModules[imageKey]) {
    return imageModules[imageKey].default;
  }
  
  // Try case-insensitive search as fallback
  const lowerPath = imageKey.toLowerCase();
  const foundKey = Object.keys(imageModules).find(key => key.toLowerCase() === lowerPath);
  
  if (foundKey && imageModules[foundKey]) {
    console.warn(`Image path case mismatch: expected "${imageKey}" but found "${foundKey}"`);
    return imageModules[foundKey].default;
  }
  
  console.error(`Image not found: ${path}`);
  console.error(`Available images:`, Object.keys(imageModules));
  return null;
}

/**
 * Get all available image paths
 */
export function getAvailableImages(): string[] {
  return Object.keys(imageModules);
}
