import sharp from "sharp";
import { glob } from "glob";
import fs from "fs";
import path from "path";

async function convert() {
  const files = await glob("public/**/*.{jpg,jpeg,png}");
  console.log(`Found ${files.length} images to convert.`);

  for (const file of files) {
    const outPath = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    
    // Don't overwrite if it already exists and is newer (basic check)
    if (fs.existsSync(outPath)) {
      console.log(`- Skipping ${file} (webp exists)`);
      continue;
    }

    try {
      await sharp(file)
        .webp({ quality: 85 })
        .toFile(outPath);
      console.log(`✓ ${file} → ${outPath}`);
    } catch (err) {
      console.error(`✗ Failed to convert ${file}:`, err);
    }
  }
}

convert();
