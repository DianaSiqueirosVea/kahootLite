import { test, expect } from '@playwright/test';

test('spaces are stripped from the PIN input automatically', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const input = page.getByPlaceholder('ABC123');
  // Use keyboard.type() so the React onChange handler fires and strips spaces
  await input.click();
  await page.keyboard.type('AB C 12');

  await expect(input).toHaveValue('ABC12');
});
