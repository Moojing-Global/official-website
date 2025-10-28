/**
 * Script to copy media files from src/media to public/media
 * This allows markdown images to work while keeping source files in src/
 */
import { copyFile, mkdir, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcMedia = join(__dirname, '..', 'src', 'media');
const publicMedia = join(__dirname, '..', 'public', 'media');

async function copyMediaFiles() {
  try {
    // Create public/media directory if it doesn't exist
    if (!existsSync(publicMedia)) {
      await mkdir(publicMedia, { recursive: true });
      console.log('✓ Created public/media directory');
    }

    // Read all files from src/media
    const files = await readdir(srcMedia);
    
    let copiedCount = 0;
    for (const file of files) {
      if (file === '.gitkeep') continue;
      
      const srcPath = join(srcMedia, file);
      const destPath = join(publicMedia, file);
      
      await copyFile(srcPath, destPath);
      copiedCount++;
    }
    
    console.log(`✓ Copied ${copiedCount} media file(s) to public/media`);
  } catch (error) {
    console.error('Error copying media files:', error);
    process.exit(1);
  }
}

copyMediaFiles();
