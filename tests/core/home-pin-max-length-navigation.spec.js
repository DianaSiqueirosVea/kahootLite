import { test, expect } from '@playwright/test';

test('navigates to join screen when PIN is exactly 8 characters', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await page.getByPlaceholder('ABC123').fill('ABCDEFGH');
  await page.getByRole('button', { name: /Join game →/ }).click();

  await expect(page).toHaveURL(/#\/join\/ABCDEFGH$/);
});
