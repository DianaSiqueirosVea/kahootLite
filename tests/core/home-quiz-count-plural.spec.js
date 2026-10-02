import { test, expect } from '@playwright/test';
import { SAMPLE_QUIZ } from '../helpers';

test('shows plural "quizzes" label when 2 quizzes are saved', async ({ page }) => {
  const quiz2 = { ...SAMPLE_QUIZ, id: 'quiz-test-2', title: 'Capitals 2' };

  await page.goto('/');
  await page.evaluate((quizzes) => {
    localStorage.setItem('kahootlite:quizzes', JSON.stringify(quizzes));
  }, [SAMPLE_QUIZ, quiz2]);

  await page.reload();
  await page.waitForLoadState('networkidle');

  await expect(page.getByText(/2 quizzes saved on this device/i)).toBeVisible();
});
