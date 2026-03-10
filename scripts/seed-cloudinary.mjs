import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageMap = [
  {
    localFolder: "public/images/gallery",
    cloudinaryFolder: "ram-palace/gallery",
    tags: ["gallery"],
    movedFolder: "moved-images/gallery"
  },
  {
    localFolder: "public/images/Events/Wedding",
    cloudinaryFolder: "ram-palace/events/weddings",
    tags: ["events", "weddings"],
    movedFolder: "moved-images/events/weddings"
  },
  {
    localFolder: "public/images/Events/corporate",
    cloudinaryFolder: "ram-palace/events/corporate",
    tags: ["events", "corporate"],
    movedFolder: "moved-images/events/corporate"
  },
  {
    localFolder: "public/images/Events/privateParties",
    cloudinaryFolder: "ram-palace/events/private-parties",
    tags: ["events", "private-parties"],
    movedFolder: "moved-images/events/private-parties"
  }
];

const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

async function runSeeder() {
  const summary = { uploaded: 0, skipped: 0, failed: 0, moved: 0 };
  const resultsList = [];
  
  console.log('Starting Cloudinary Seed...\n');

  for (const entry of imageMap) {
    if (!fs.existsSync(entry.localFolder)) {
      console.log(`Directory not found, skipping: ${entry.localFolder}`);
      continue;
    }

    const files = fs.readdirSync(entry.localFolder);
    const images = files.filter(file => validExtensions.includes(path.extname(file).toLowerCase()));

    for (const file of images) {
      const fullLocalPath = path.join(entry.localFolder, file);
      const destPath = path.join(entry.movedFolder, file);
      
      let status = '';
      let resultData = {
        file,
        localPath: fullLocalPath,
        movedTo: destPath,
        cloudinaryFolder: entry.cloudinaryFolder,
      };

      try {
        const result = await cloudinary.uploader.upload(fullLocalPath, {
          folder: entry.cloudinaryFolder,
          use_filename: true,
          unique_filename: false,
          overwrite: false,
          resource_type: "image",
          tags: entry.tags,
        });

        console.log(`✓ Uploaded: ${file} → ${entry.cloudinaryFolder}`);
        status = "uploaded";
        summary.uploaded++;
        
        resultData.public_id = result.public_id;
        resultData.secure_url = result.secure_url;
        resultData.status = status;

      } catch (error) {
        if (error.message && error.message.toLowerCase().includes("already exists")) {
          console.log(`→ Skipped: ${file} (already exists)`);
          status = "skipped";
          summary.skipped++;
          resultData.status = status;
        } else {
          console.log(`✗ Failed: ${file} — ${error.message || error}`);
          status = "failed";
          summary.failed++;
          resultData.status = status;
          resultData.error = error.message || error;
        }
      }

      if (status === "uploaded" || status === "skipped") {
        if (!fs.existsSync(entry.movedFolder)) {
          fs.mkdirSync(entry.movedFolder, { recursive: true });
        }
        fs.renameSync(fullLocalPath, destPath);
        console.log(`📦 Moved: ${file} → ${entry.movedFolder}`);
        summary.moved++;
      }

      resultsList.push(resultData);
    }
  }

  const finalOutput = {
    seededAt: new Date().toISOString(),
    summary,
    results: resultsList
  };

  if (!fs.existsSync('scripts')) {
    fs.mkdirSync('scripts', { recursive: true });
  }
  
  fs.writeFileSync('scripts/seed-results.json', JSON.stringify(finalOutput, null, 2));

  console.log('\n=====================================');
  console.log('   Cloudinary Seeding Complete');
  console.log('=====================================');
  console.log(`✓ Uploaded : ${summary.uploaded} images`);
  console.log(`→ Skipped  : ${summary.skipped} images`);
  console.log(`✗ Failed   : ${summary.failed} images`);
  console.log(`📦 Moved   : ${summary.moved} images to moved-images/`);
  console.log('=====================================');
  console.log('Failed files (if any) remain in public/images/');
  console.log('Run again to retry failed uploads.');
  console.log('=====================================');
}

runSeeder().catch(console.error);

// Seed carousel
const carouselFiles = [
  'public/images/carousel/carousel1.webp',
  'public/images/carousel/carousel2.webp',
  'public/images/carousel/carousel3.webp',
  'public/images/carousel/carousel4.webp',
];

console.log('\n🎠 Seeding carousel...');
for (const filePath of carouselFiles) {
  try {
    const fsModule = await import('fs');
    const fsLocal = fsModule.default ?? fsModule;

    if (!fsLocal.existsSync(filePath)) {
      console.log('⚠ Skipped (not found):', filePath);
      continue;
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'ram-palace/carousel',
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    });

    console.log('✓ Uploaded:', result.public_id);
  } catch (err) {
    console.log('✗ Failed:', filePath, err.message);
  }
}


