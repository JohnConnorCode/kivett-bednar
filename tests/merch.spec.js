const { test, expect } = require('@playwright/test');

test('merch page functionality', async ({ page }) => {
  console.log('Testing merch page functionality...');

  // Navigate to the merch page
  await page.goto('https://kivett-bednar.vercel.app/merch', { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log('✓ Navigated to merch page');

  // Click on the first product
  await page.locator('.product-card').first().click();
  console.log('✓ Clicked on the first product');

  // Click the "Add to Cart" button
  await page.locator('button:has-text("Add to Cart")').click();
  console.log('✓ Clicked "Add to Cart"');

  // Check if the cart drawer is visible
  await page.waitForSelector('.cart-drawer', { state: 'visible' });
  console.log('✓ Cart drawer is visible');

  // Check if the item is in the cart
  const cartItemCount = await page.locator('.cart-item').count();
  expect(cartItemCount).toBe(1);
  console.log('✓ Item added to cart successfully');
});
