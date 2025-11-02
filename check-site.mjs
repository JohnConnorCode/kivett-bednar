import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

console.log('Navigating to site...');
await page.goto('https://kivett-bednar-gdze78ex3-john-connors-projects-d9df1dfe.vercel.app', {waitUntil: 'networkidle', timeout: 30000});

console.log('Taking screenshot...');
await page.screenshot({ path: 'site-screenshot.png', fullPage: false });

// Check for images
const images = await page.$$eval('img', imgs => imgs.map(img => ({
  src: img.src,
  alt: img.alt,
  complete: img.complete,
  naturalWidth: img.naturalWidth,
  naturalHeight: img.naturalHeight
})));

console.log('\n=== IMAGES FOUND:', images.length, '===');
images.forEach((img, i) => {
  console.log(`\nImage ${i + 1}:`);
  console.log('  src:', img.src);
  console.log('  alt:', img.alt);
  console.log('  loaded:', img.complete && img.naturalWidth > 0);
  console.log('  size:', img.naturalWidth, 'x', img.naturalHeight);
});

await browser.close();
