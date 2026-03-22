/**
 * Run ONCE with a visible browser to save your Sanity login session:
 *   npx playwright test tests/studio-auth-setup.spec.ts --headed --timeout 120000
 */
import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth', 'sanity-session.json');

setup('authenticate with Sanity Studio', async ({ page }) => {
  setup.setTimeout(120000);

  await page.goto('/studio', { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log('\n=== LOG IN TO SANITY STUDIO IN THE BROWSER WINDOW ===\n');

  // Wait for Studio toolbar to appear (proves login succeeded)
  // The toolbar shows "Structure" link regardless of which tab loads first
  await page.getByRole('link', { name: 'Structure' }).waitFor({ timeout: 120000 });
  console.log('Login detected! Saving session...');

  await page.context().storageState({ path: authFile });
  console.log(`Session saved to ${authFile}`);
});
