/**
 * Rehype plugin to optimize images from /media/ in the HTML output
 * This works on the HTML tree after markdown has been converted
 */
import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import path from 'path';

export function rehypeOptimizeImages() {
  return function transformer(tree: Root) {
    visit(tree, 'element', (node: Element) => {
      // Find all img tags
      if (node.tagName === 'img' && node.properties && typeof node.properties.src === 'string') {
        const src = node.properties.src as string;
        
        // Transform /media/ paths to use Astro's image optimization
        if (src.startsWith('/media/')) {
          const imagePath = src.replace('/media/', '');
          const currentDir = process.cwd();
          const absolutePath = path.join(currentDir, 'src', 'media', imagePath);
          
          // Use /@fs prefix for Vite/Astro to handle
          node.properties.src = `/@fs${absolutePath}`;
          
          // Add attributes for better loading
          if (!node.properties.loading) {
            node.properties.loading = 'lazy';
          }
          if (!node.properties.decoding) {
            node.properties.decoding = 'async';
          }
        }
      }
    });
  };
}
