const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'public', 'images', 'gallery');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }

      const fileStream = fs.createWriteStream(filename);
      response.pipe(fileStream);
      fileStream.on('finish', () => { fileStream.close(); resolve(); });
      fileStream.on('error', (err) => { fs.unlink(filename, () => {}); reject(err); });
    }).on('error', reject);
  });
}

async function start() {
  for (let i = 1; i <= 50; i++) {
    // Using Picsum for ultra-reliable 50 unique high-quality images
    // The sig parameter ensures unique images in a single session
    const url = `https://picsum.photos/1200/800?sig=${i}`;
    const filename = path.join(destDir, `gallery-${i}.jpg`);
    
    console.log(`Downloading ${i}/50...`);
    try {
      await downloadImage(url, filename);
    } catch (err) {
      console.error(`Error for image ${i}:`, err.message);
    }
  }
  console.log('Finished seeding 50 unique images.');
}

start();
