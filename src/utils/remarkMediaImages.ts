/**
 * Remark plugin to transform /media/ image paths to Vite's /@fs/ paths
 * This allows Astro to properly resolve and optimize images from src/media
 */
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { Image } from 'mdast';
import path from 'path';

export function remarkMediaImages() {
  return function transformer(tree: Root) {
    visit(tree, 'image', (node: Image) => {
      // Only transform images that start with /media/
      if (node.url && node.url.startsWith('/media/')) {
        const imagePath = node.url.replace('/media/', '');
        
        // Get the absolute path to src/media directory
        const currentDir = process.cwd();
        const absolutePath = path.join(currentDir, 'src', 'media', imagePath);
        
        // Use Vite's /@fs/ special path for absolute file system access
        // This works in dev and gets properly processed during build
        node.url = `/@fs${absolutePath}`;
      }
    });
  };
}
