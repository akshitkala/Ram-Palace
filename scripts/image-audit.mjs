import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const isCleanup = process.argv.includes('--cleanup');

const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'];

const scanLocations = [
  // LOCAL - intended to be moved
  { folderPath: 'public/images/gallery', category: 'Gallery', status: 'local', isStatic: false },
  { folderPath: 'public/images/Events/Wedding', category: 'Events / Weddings', status: 'local', isStatic: false },
  { folderPath: 'public/images/Events/corporate', category: 'Events / Corporate', status: 'local', isStatic: false },
  { folderPath: 'public/images/Events/privateParties', category: 'Events / Private', status: 'local', isStatic: false },
  
  // LOCAL - static
  { folderPath: 'public/images/hero', category: 'Hero', status: 'local', isStatic: true },
  { folderPath: 'public/images/carousel', category: 'Carousel', status: 'local', isStatic: true },
  { folderPath: 'public/images/spaces', category: 'Spaces', status: 'local', isStatic: true },
  { folderPath: 'public/images', category: 'Root Images', status: 'local', exactOnly: true, isStatic: true },
  
  // MOVED
  { folderPath: 'moved-images/gallery', category: 'Gallery', status: 'moved', isStatic: false },
  { folderPath: 'moved-images/events/weddings', category: 'Events / Weddings', status: 'moved', isStatic: false },
  { folderPath: 'moved-images/events/corporate', category: 'Events / Corporate', status: 'moved', isStatic: false },
  { folderPath: 'moved-images/events/private-parties', category: 'Events / Private', status: 'moved', isStatic: false },
  
  // BRANDING
  { folderPath: 'public/fonts', category: 'Branding', status: 'local', isStatic: true },
  { folderPath: 'public', category: 'Branding', status: 'local', exactOnly: true, isStatic: true }
];

function shouldScanFile(filePath, dirPath, exactOnly) {
  if (exactOnly) return path.dirname(filePath) === dirPath;
  return true;
}

// Read seed-results.json to get Set of seeded filenames
const seededFiles = new Set();
try {
  const seedResultsPath = path.join(rootDir, 'scripts', 'seed-results.json');
  if (fs.existsSync(seedResultsPath)) {
    const data = JSON.parse(fs.readFileSync(seedResultsPath, 'utf-8'));
    if (data.results) {
      data.results.forEach(res => {
        if (res.status === 'uploaded' || res.status === 'skipped') {
          seededFiles.add(res.file);
        }
      });
    }
  }
} catch (e) {}

let allImages = [];
let categoriesMap = {};
let totalImages = 0;
let totalSizeKB = 0;
let movedToCloudinaryCount = 0;
let stillLocalCount = 0;
let warnings = [];
let brokenReferences = [];

// Helper to ensure categories exist
scanLocations.forEach(loc => {
  if (!categoriesMap[loc.category]) {
    categoriesMap[loc.category] = { count: 0, sizeKB: 0, status: loc.status === 'moved' ? 'moved' : 'local' };
  }
});

function runScan() {
  allImages = [];
  categoriesMap = {};
  totalImages = 0;
  totalSizeKB = 0;
  movedToCloudinaryCount = 0;
  stillLocalCount = 0;
  warnings = [];
  brokenReferences = [];

  scanLocations.forEach(loc => {
    const fullDirPath = path.join(rootDir, loc.folderPath);
    if (!fs.existsSync(fullDirPath)) {
      if (loc.status === 'moved') console.log(`⚠ Folder not found: ${loc.folderPath}`);
      return;
    }

    const items = fs.readdirSync(fullDirPath);
    items.forEach(item => {
      const fullPath = path.join(fullDirPath, item);
      const stat = fs.statSync(fullPath);

      if (!stat.isDirectory()) {
        const ext = path.extname(item).toLowerCase();
        if (validExts.includes(ext) && shouldScanFile(fullPath, fullDirPath, loc.exactOnly)) {
          const sizeKB = stat.size / 1024;
          
          let actualStatus = loc.status;
          
          if (loc.folderPath.includes('moved-images')) {
            actualStatus = 'moved';
          } else if (!loc.isStatic && seededFiles.has(item)) {
            actualStatus = 'moved';
          } else if (!loc.isStatic && !loc.folderPath.includes('moved-images')) {
            actualStatus = 'local';
          }

          if (!categoriesMap[loc.category]) {
            categoriesMap[loc.category] = { count: 0, sizeKB: 0, status: actualStatus };
          }
          
          categoriesMap[loc.category].count++;
          categoriesMap[loc.category].sizeKB += sizeKB;

          // Flag unseeded items that should be seeded
          if (actualStatus === 'local' && !loc.isStatic && loc.folderPath.startsWith('public/images')) {
              warnings.push(`Unseeded image found in source folder: ${loc.folderPath}/${item}`);
          }

          allImages.push({
            filename: item,
            extension: ext,
            sizeKB: parseFloat(sizeKB.toFixed(1)),
            folder: loc.folderPath,
            category: loc.category,
            status: actualStatus,
            isStatic: loc.isStatic,
            fullLocalPath: fullPath
          });
        }
      }
    });
  });

  // Calculate moved vs local
  allImages.forEach(img => {
    if (img.status === 'moved') movedToCloudinaryCount++;
    else stillLocalCount++;
  });
}

function scanCodeForReferences() {
  const codeReferences = [];
  let totalCodeRefs = 0;
  let cloudinaryRefs = 0;
  let localRefs = 0;
  const allSrcContents = [];

  function readCodebase(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        readCodebase(fullPath);
      } else if (/\.(js|jsx|ts|tsx|css|json)$/.test(file)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
        
        allSrcContents.push({ path: relativePath, content });

        if (/\.(js|jsx|ts|tsx)$/.test(file)) {
          const imageRegex = /\/images\/([^"'\s]+)\.(jpg|jpeg|png|webp|avif|svg)/gi;
          let match;
          while ((match = imageRegex.exec(content)) !== null) {
            const imgPath = match[0];
            totalCodeRefs++;
            localRefs++;
            codeReferences.push({ referencedIn: relativePath, imagePath: imgPath, type: 'local' });
          }

          const cloudinaryRegex = /res\.cloudinary\.com\/([^"'\s]+)\/image/gi;
          let cMatch;
          while ((cMatch = cloudinaryRegex.exec(content)) !== null) {
            totalCodeRefs++;
            cloudinaryRefs++;
            codeReferences.push({ referencedIn: relativePath, imagePath: cMatch[0], type: 'cloudinary' });
          }
        }
      }
    }
  }

  const srcDir = path.join(rootDir, 'src');
  if (fs.existsSync(srcDir)) readCodebase(srcDir);

  return { codeReferences, allSrcContents, totalCodeRefs, cloudinaryRefs, localRefs };
}

async function performCleanup() {
  console.log('\nScanning for unused images & duplicates...');
  runScan();
  const { codeReferences, allSrcContents } = scanCodeForReferences();

  const deletionManifest = [];
  let freedSizeKB = 0;

  allImages.forEach(img => {
    let isReferenced = false;
    for (const src of allSrcContents) {
      if (src.content.includes(img.filename)) {
        isReferenced = true;
        break;
      }
    }

    if (img.category === 'Spaces') {
      if (!isReferenced) {
        deletionManifest.push({
          file: path.join(img.folder, img.filename),
          fullPath: img.fullLocalPath,
          reason: 'Duplicate of carousel/',
          sizeKB: img.sizeKB
        });
        freedSizeKB += img.sizeKB;
      } else {
        warnings.push(`Spaces image ${img.filename} is referenced in code, cannot delete.`);
      }
    } else if (img.status === 'local' && !img.isStatic) {
      if (!img.folder.includes('moved-images') && !isReferenced) {
        deletionManifest.push({
          file: path.join(img.folder, img.filename),
          fullPath: img.fullLocalPath,
          reason: 'Unreferenced in code',
          sizeKB: img.sizeKB
        });
        freedSizeKB += img.sizeKB;
      }
    }
  });

  if (deletionManifest.length === 0) {
    console.log('No files to delete. Environment is clean!');
    return;
  }

  console.log('\nDELETION MANIFEST:');
  console.log('------------------------------------------------------');
  console.log('File                              | Reason');
  console.log('------------------------------------------------------');
  deletionManifest.forEach(d => {
    console.log(`${d.file.padEnd(33, ' ')} | ${d.reason}`);
  });
  console.log('------------------------------------------------------');
  console.log(`Total: ${deletionManifest.length} files | ${(freedSizeKB / 1024).toFixed(2)} MB will be freed\n`);

  fs.writeFileSync(path.join(rootDir, 'scripts', 'deletion-manifest.json'), JSON.stringify(deletionManifest, null, 2));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Proceed with deletion? (yes/no): ', (answer) => {
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        const trashDir = path.join(rootDir, 'scripts', '.trash');
        if (!fs.existsSync(trashDir)) fs.mkdirSync(trashDir);

        console.log('\nDeleting...');
        let deletedCount = 0;
        deletionManifest.forEach(d => {
          if (fs.existsSync(d.fullPath)) {
            const trashPath = path.join(trashDir, path.basename(d.fullPath));
            fs.renameSync(d.fullPath, trashPath); // move to trash for safety
            d.trashPath = trashPath;
            deletedCount++;
          }
        });

        // Verify no broken refs
        const verification = scanCodeForReferences();
        let restoreCount = 0;
        
        deletionManifest.forEach(d => {
          let wasRefd = false;
          for (const src of verification.allSrcContents) {
            if (src.content.includes(path.basename(d.fullPath))) {
              wasRefd = true; break;
            }
          }
          if (wasRefd) {
            fs.renameSync(d.trashPath, d.fullPath);
            console.log(`⚠ Restored: ${path.basename(d.fullPath)} — was referenced!`);
            restoreCount++;
          } else {
            fs.unlinkSync(d.trashPath);
          }
        });

        if (fs.existsSync(trashDir)) {
          const remaining = fs.readdirSync(trashDir);
          if(remaining.length === 0) fs.rmdirSync(trashDir);
        }

        console.log(`Successfully deleted ${deletedCount - restoreCount} files.\n`);
      } else {
        console.log('\nDeletion aborted.');
      }
      rl.close();
      resolve();
    });
  });
}

async function main() {
  if (isCleanup) {
    await performCleanup();
  }
  
  runScan();
  const { codeReferences, totalCodeRefs, cloudinaryRefs, localRefs } = scanCodeForReferences();

  let unreferencedCount = 0;
  codeReferences.filter(r => r.type === 'local').forEach(ref => {
      const potentialPath = path.join(rootDir, 'public', ref.imagePath);
      if (!fs.existsSync(potentialPath)) {
          warnings.push(`Broken image reference in ${ref.referencedIn} -> ${ref.imagePath}`);
          brokenReferences.push(ref);
      }
  });

  allImages.forEach(img => {
      filenameCounts[img.filename] = (filenameCounts[img.filename] || 0) + 1;
  });
  Object.entries(filenameCounts).forEach(([name, count]) => {
      if (count > 1) {
          warnings.push(`Duplicate filename across categories: ${name} appears ${count} times.`);
      }
  });


  // Format text report
  totalImages = allImages.length;
  totalSizeKB = allImages.reduce((sum, i) => sum + i.sizeKB, 0);

  let textReport = `=====================================================
       RAM PALACE — IMAGE AUDIT REPORT
       Generated: ${new Date().toISOString()}
=====================================================

📁 CATEGORY BREAKDOWN
-----------------------------------------------------
Category              | Count | Total Size | Status
-----------------------------------------------------
`;

  for (const [catName, data] of Object.entries(categoriesMap)) {
      if (data.count === 0 && data.status === 'moved') continue; // omit empty moved folders if missing
      const paddedName = catName.padEnd(21, ' ');
      const paddedCount = data.count.toString().padEnd(5, ' ');
      const sizeMB = (data.sizeKB / 1024).toFixed(1);
      const paddedSize = `${sizeMB} MB`.padEnd(10, ' ');
      const statusText = data.status === 'moved' ? `${data.count} moved` : 'local (static)';
      textReport += `${paddedName} | ${paddedCount} | ${paddedSize} | ${statusText}\n`;
  }

  textReport += `-----------------------------------------------------
TOTAL                 |  ${totalImages.toString().padEnd(3, ' ')}  |  ${(totalSizeKB / 1024).toFixed(1)} MB   |
=====================================================

📦 SEEDING STATUS
-----------------------------------------------------
✓ Moved to Cloudinary  : ${movedToCloudinaryCount} images
⚠ Still local (static) : ${stillLocalCount} images
✗ Failed / Not moved   : 0 images
=====================================================

🔍 USAGE IN CODE
-----------------------------------------------------
Total image references found in src/  : ${totalCodeRefs}
  ├── Cloudinary URLs                 : ${cloudinaryRefs}
  └── Local paths (/images/...)       : ${localRefs}

Unreferenced images (in folder but    : ${unreferencedCount}
not used anywhere in code)
=====================================================

⚠ WARNINGS
-----------------------------------------------------
`;

  if (warnings.length > 0) {
      warnings.forEach(w => {
          textReport += `- ${w}\n`;
      });
  } else {
      textReport += '- No warnings found.\n';
  }

  textReport += `=====================================================

📋 FULL FILE LIST
-----------------------------------------------------
`;

  const sortedCats = Object.keys(categoriesMap).sort();
  sortedCats.forEach(cat => {
      const catImages = allImages.filter(img => img.category === cat);
      if (catImages.length === 0) return;
      const catData = categoriesMap[cat];
      const statusLabel = catData.status === 'moved' ? 'moved to Cloudinary' : 'local/static';
      
      textReport += `\n[${cat.toUpperCase()} — ${catImages.length} images — ${statusLabel}]\n`;
      catImages.forEach(img => {
          const paddedFile = img.filename.padEnd(20, ' ');
          const paddedSize = `${(img.sizeKB / 1024).toFixed(1)} MB`.padEnd(10, ' ');
          const statusMark = img.status === 'moved' ? '✓ moved' : 'local';
          textReport += `  ${paddedFile} ${paddedSize}  ${statusMark}\n`;
      });
  });

  textReport += `=====================================================\n`;

  console.log(textReport);

  const outDir = path.join(rootDir, 'scripts');
  if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outDir, 'image-audit.txt'), textReport);

  const jsonCategories = {};
  for (const [key, val] of Object.entries(categoriesMap)) {
      if (val.count === 0 && val.status === 'moved') continue;
      const slug = key.toLowerCase().replace(/\s*\/\s*/g, '-').replace(/\s+/g, '-');
      if (slug.startsWith('events-')) {
          const subcat = slug.replace('events-', '');
          if (!jsonCategories.events) jsonCategories.events = {};
          jsonCategories.events[subcat] = {
              count: val.count,
              sizeMB: parseFloat((val.sizeKB / 1024).toFixed(1)),
              status: val.status
          };
      } else {
          jsonCategories[slug] = {
              count: val.count,
              sizeMB: parseFloat((val.sizeKB / 1024).toFixed(1)),
              status: val.status
          };
      }
  }

  const jsonReport = {
      generatedAt: new Date().toISOString(),
      summary: {
          totalImages,
          totalSizeMB: parseFloat((totalSizeKB / 1024).toFixed(1)),
          movedToCloudinary: movedToCloudinaryCount,
          stillLocal: stillLocalCount,
          failed: 0,
          unreferenced: unreferencedCount,
          brokenReferences: brokenReferences.length
      },
      categories: jsonCategories,
      warnings,
      files: allImages
  };

  fs.writeFileSync(path.join(outDir, 'image-audit.json'), JSON.stringify(jsonReport, null, 2));

  if (!isCleanup) process.exit(0);
}

const filenameCounts = {};
main().catch(console.error);

