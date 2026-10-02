import { test, expect } from '@playwright/test';

test('toggling theme back to dark persists across a reload', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const toggle = page.getByRole('button', { name: /toggle theme/i });

  // dark → light
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  // light → dark
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  // Confirm dark persists after reload
  await page.reload();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
