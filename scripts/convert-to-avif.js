const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Images to convert
const imagesToConvert = [
  'public/m2.webp',
  'public/ach2.webp', 
  'public/po1.webp',
  'public/po2.webp',
  'public/po3.webp',
  'public/idea3.webp',
  'public/astra3.webp'
];

async function convertToAvif() {
  console.log('🚀 Starting WebP to AVIF conversion...\n');
  
  for (const imagePath of imagesToConvert) {
    try {
      if (!fs.existsSync(imagePath)) {
        console.log(`❌ File not found: ${imagePath}`);
        continue;
      }

      const outputPath = imagePath.replace('.webp', '.avif');
      
      console.log(`🔄 Converting: ${imagePath} → ${outputPath}`);
      
      // Get original file size
      const originalStats = fs.statSync(imagePath);
      const originalSize = (originalStats.size / 1024).toFixed(2);
      
      await sharp(imagePath)
        .avif({ 
          quality: 80,
          effort: 6, // Higher effort = better compression
          chromaSubsampling: '4:2:0'
        })
        .toFile(outputPath);
      
      // Get new file size
      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024).toFixed(2);
      const savings = ((originalStats.size - newStats.size) / originalStats.size * 100).toFixed(1);
      
      console.log(`✅ Success! ${originalSize}KB → ${newSize}KB (${savings}% smaller)\n`);
      
    } catch (error) {
      console.error(`❌ Error converting ${imagePath}:`, error.message);
    }
  }
  
  console.log('🎉 Conversion complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Update image references from .webp to .avif in your code');
  console.log('2. Add preload links for critical images');
  console.log('3. Test the images in your application');
}

convertToAvif().catch(console.error);
