import { expect } from '@playwright/test';

export async function acceptDisclaimer(page) {
  // Click the checkbox label (more reliable than getByRole for implicit label association)
  await page.locator('.modal-checkbox').click();
  await page.getByRole('button', { name: /comenzar/i }).click();
}

export async function answerAllQuestions(page, count) {
  for (let i = 1; i <= count; i++) {
    await page.locator('.likert-options label').nth(2).click();
    if (i < count) {
      await expect(page.locator('button:has-text("Siguiente")')).toBeEnabled({ timeout: 5000 });
      await page.locator('button:has-text("Siguiente")').click({ force: true });
      await page.waitForTimeout(200);
    } else {
      await expect(page.locator('button:has-text("Finalizar")')).toBeEnabled({ timeout: 5000 });
      await page.locator('button:has-text("Finalizar")').click({ force: true });
    }
  }
}

export async function clearStorage(page) {
  await page.goto('/');
  await page.evaluate(() => {
    Object.keys(localStorage).filter(k => k.startsWith('evalumind_')).forEach(k => localStorage.removeItem(k));
    sessionStorage.clear();
  });
}
