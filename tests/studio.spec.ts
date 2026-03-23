/**
 * Sanity Studio tests — require authenticated session.
 *
 * Setup:  npx playwright test tests/studio-auth-setup.spec.ts --headed
 * Run:    npx playwright test tests/studio.spec.ts
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const authFile = path.join(__dirname, '.auth', 'sanity-session.json');
const hasAuth = fs.existsSync(authFile);

async function openStructure(page: import('@playwright/test').Page) {
  await page.goto('/studio/structure', { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('text=Content Management', { timeout: 30000 });

  // Dismiss announcements banner if present (may auto-dismiss, so catch errors)
  try {
    const dismiss = page.getByRole('button', { name: /dismiss/i });
    if (await dismiss.isVisible({ timeout: 2000 })) {
      await dismiss.click({ force: true, timeout: 2000 });
    }
  } catch { /* banner may have auto-dismissed */ }
  await page.waitForTimeout(500);
}

async function clickSidebarItem(page: import('@playwright/test').Page, text: string) {
  // Sanity has overlay divs that intercept pointer events — use force click
  await page.getByText(text).first().click({ force: true });
  await page.waitForTimeout(2000);
}

test.describe('Sanity Studio', () => {
  if (!hasAuth) {
    test('SETUP REQUIRED — run: npx playwright test tests/studio-auth-setup.spec.ts --headed', () => {
      test.skip();
    });
    return;
  }

  test.use({ storageState: authFile });

  test('studio sidebar has all expected sections', async ({ page }) => {
    await openStructure(page);

    for (const section of ['Site Pages', 'Store Management', 'Orders', 'Events & Content', 'Settings']) {
      await expect(page.getByText(section).first()).toBeVisible({ timeout: 15000 });
    }
  });

  test('can navigate to products list', async ({ page }) => {
    await openStructure(page);

    await clickSidebarItem(page, 'Store Management');
    await clickSidebarItem(page, 'All Products');

    await expect(page.getByText('Blues Legend T-Shirt').first()).toBeVisible({ timeout: 15000 });
  });

  test('can navigate to events', async ({ page }) => {
    await openStructure(page);

    await clickSidebarItem(page, 'Events & Content');

    await expect(page.getByText('Events').first()).toBeVisible({ timeout: 10000 });
  });

  test('can navigate to settings and see store settings', async ({ page }) => {
    await openStructure(page);

    await clickSidebarItem(page, 'Settings');

    await expect(page.getByText('Store Settings').first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Site Settings').first()).toBeVisible({ timeout: 10000 });
  });

  test('product document shows key fields', async ({ page }) => {
    await openStructure(page);

    await clickSidebarItem(page, 'Store Management');
    await clickSidebarItem(page, 'All Products');
    await page.waitForTimeout(3000);
    await page.getByText('Blues Legend T-Shirt').first().click({ force: true });
    await page.waitForTimeout(5000);

    const body = await page.textContent('body');
    expect(body).toMatch(/Title/);
    expect(body).toMatch(/Price/i);
    expect(body).toMatch(/Category/i);
  });
});
