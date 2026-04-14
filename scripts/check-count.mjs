import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkCount() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'ram-palace/gallery',
      max_results: 500
    });
    console.log(`Current images in ram-palace/gallery: ${result.resources.length}`);
    if (result.next_cursor) {
      console.log('More than 500 images exist.');
    }
  } catch (error) {
    console.error('Error checking Cloudinary count:', error);
  }
}

checkCount();
