import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function test() {
  try {
    const result = await cloudinary.api.resources({
      prefix: 'ram-palace/gallery',
      max_results: 10,
    });
    console.log('Gallery resources:', result.resources.length);
    console.log('First resource:', result.resources[0]);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
