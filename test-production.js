const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Testing https://kivett-bednar.vercel.app...\n');

  // Go to production site
  await page.goto('https://kivett-bednar.vercel.app', { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Wait for images to load
  await page.waitForTimeout(3000);

  // Take screenshot
  await page.screenshot({ path: 'production-homepage.png', fullPage: true });
  console.log('✓ Screenshot saved: production-homepage.png');

  // Check for header
  const header = await page.locator('header').count();
  console.log(`✓ Header elements: ${header}`);

  // Check for navigation
  const nav = await page.locator('nav').count();
  console.log(`✓ Navigation elements: ${nav}`);

  // Check for footer
  const footer = await page.locator('footer').count();
  console.log(`✓ Footer elements: ${footer}`);

  // Check for gallery images
  const galleryImages = await page.locator('img').count();
  console.log(`✓ Total images on page: ${galleryImages}`);

  // Check hero slider
  const heroSlider = await page.locator('section').first();
  await heroSlider.screenshot({ path: 'hero-slider.png' });
  console.log('✓ Hero slider screenshot: hero-slider.png');

  // Scroll to gallery section
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'gallery-section.png' });
  console.log('✓ Gallery section screenshot: gallery-section.png');

  await browser.close();
  console.log('\nDone!');
})();
