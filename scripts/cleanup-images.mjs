import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = 'e:/vs code/projects/significo/hall';
const publicImagesDir = path.join(rootDir, 'public/images');
const srcDir = path.join(rootDir, 'src');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.avif'];

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

function checkReferences(filePath, contents) {
    const filename = path.basename(filePath);
    // Check for filename in any of the contents
    return contents.some(content => content.includes(filename));
}

async function main() {
  console.log('Scanning for images...');
  const allImages = getAllFiles(publicImagesDir).filter(file => 
    imageExtensions.includes(path.extname(file).toLowerCase())
  );
  
  console.log(`Found ${allImages.length} images.`);
  
  console.log('Reading source files...');
  const allSrcFiles = getAllFiles(srcDir);
  const srcContents = allSrcFiles
    .filter(file => /\.(js|jsx|ts|tsx|css|html|json)$/.test(file))
    .map(file => fs.readFileSync(file, 'utf-8'));

  const unusedImages = [];
  
  for (const imgPath of allImages) {
    if (!checkReferences(imgPath, srcContents)) {
      unusedImages.push(imgPath);
    }
  }

  console.log(`Found ${unusedImages.length} unused images.`);
  
  if (unusedImages.length > 0) {
    console.log('Deleting unused images...');
    unusedImages.forEach(img => {
      console.log(`Deleting: ${img}`);
      fs.unlinkSync(img);
    });
    console.log('Done.');
  } else {
    console.log('No unused images found.');
  }
}

main().catch(err => {
  console.error(err);
});
