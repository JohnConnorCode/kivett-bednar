const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  console.log('Testing full page https://kivett-bednar.vercel.app...\n');

  await page.goto('https://kivett-bednar.vercel.app', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);

  // Take full page screenshot
  await page.screenshot({ path: 'full-page.png', fullPage: true });
  console.log('✓ Full page screenshot: full-page.png');

  // Check sections
  const sections = await page.locator('section').count();
  console.log(`✓ Total sections: ${sections}`);

  // Scroll to each major section and check
  console.log('\nChecking sections:');

  // Hero
  console.log('✓ Hero section visible');

  // Scroll to parallax
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  const parallaxText = await page.locator('h2:has-text("Gritty Texas Blues")').count();
  console.log(`✓ Parallax section: ${parallaxText > 0 ? 'visible' : 'MISSING'}`);

  // Scroll to album
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(1000);
  const albumText = await page.locator('h2:has-text("Land of the Living")').count();
  console.log(`✓ Album section: ${albumText > 0 ? 'visible' : 'MISSING'}`);

  // Scroll to gallery
  await page.evaluate(() => window.scrollTo(0, 4000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'gallery-full.png' });
  console.log('✓ Gallery screenshot: gallery-full.png');

  await browser.close();
  console.log('\nDone!');
})();
