import { test, expect } from '@playwright/test';

test('PIN input caps at 8 characters (maxLength)', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const input = page.getByPlaceholder('ABC123');
  await input.fill('ABCDEFGHIJ'); // 10 chars — should clamp to 8

  await expect(input).toHaveValue('ABCDEFGH');
});
