import { test, expect } from '@playwright/test';
import { acceptDisclaimer, clearStorage } from './helpers';

test.describe('FAS flow', () => {
  test.beforeEach(async ({ page }) => clearStorage(page));

  test('shows intro with 3 letters and start button', async ({ page }) => {
    await page.goto('/test/fas');
    await acceptDisclaimer(page);
    await expect(page.locator('.fas-intro')).toBeVisible();
    await expect(page.getByRole('button', { name: /comenzar.*3 rondas/i })).toBeVisible();
  });

  test('starts task and shows first round (F)', async ({ page }) => {
    await page.goto('/test/fas');
    await acceptDisclaimer(page);
    await page.locator('[data-testid="fas-start"]').click({ force: true });

    await expect(page.locator('[data-testid="fas-round"]')).toContainText('Ronda 1 de 3');
    await expect(page.locator('[data-testid="fas-letter"]')).toContainText('F');
    await expect(page.locator('[data-testid="fas-timer"]')).toBeVisible();
    await expect(page.locator('[data-testid="fas-input"]')).toBeVisible();
  });

  test('validates letter in first round', async ({ page }) => {
    await page.goto('/test/fas');
    await acceptDisclaimer(page);
    await page.locator('[data-testid="fas-start"]').click({ force: true });

    const input = page.locator('[data-testid="fas-input"]');
    await input.fill('gato');
    await input.press('Enter');
    await expect(page.getByText(/debe empezar con/i)).toBeVisible();
  });

  test('accepts valid word and shows chips', async ({ page }) => {
    await page.goto('/test/fas');
    await acceptDisclaimer(page);
    await page.locator('[data-testid="fas-start"]').click({ force: true });

    const input = page.locator('[data-testid="fas-input"]');
    await input.fill('fresa');
    await input.press('Enter');

    await expect(page.locator('[data-testid="fas-word-chips"]')).toContainText('fresa');
  });

  test('shows next round button after 3 words', async ({ page }) => {
    await page.goto('/test/fas');
    await acceptDisclaimer(page);
    await page.locator('[data-testid="fas-start"]').click({ force: true });

    const input = page.locator('[data-testid="fas-input"]');
    await input.fill('fresa');
    await input.press('Enter');
    await page.waitForTimeout(100);
    await input.fill('flor');
    await input.press('Enter');
    await page.waitForTimeout(100);
    await input.fill('fuego');
    await input.press('Enter');

    await expect(page.locator('[data-testid="fas-next-round"]')).toBeVisible();
  });

  test('advances to round 2 (A) when clicking next', async ({ page }) => {
    await page.goto('/test/fas');
    await acceptDisclaimer(page);
    await page.locator('[data-testid="fas-start"]').click({ force: true });

    const input = page.locator('[data-testid="fas-input"]');
    await input.fill('fresa');
    await input.press('Enter');
    await page.waitForTimeout(100);
    await input.fill('flor');
    await input.press('Enter');
    await page.waitForTimeout(100);
    await input.fill('fuego');
    await input.press('Enter');

    await page.locator('[data-testid="fas-next-round"]').click({ force: true });

    await expect(page.locator('[data-testid="fas-round"]')).toContainText('Ronda 2 de 3');
    await expect(page.locator('[data-testid="fas-letter"]')).toContainText('A');
  });
});
