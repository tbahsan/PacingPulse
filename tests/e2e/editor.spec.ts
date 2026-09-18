import { test, expect } from '@playwright/test';

test.describe('PacingPulse E2E Tests', () => {
  test('loads home page and renders Gary Provost sample in SVG chart', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/PacingPulse/);
    await expect(page.locator('h1')).toContainText('PacingPulse');

    // Gary Provost sample has 16 sentences
    await expect(page.locator('#metric-sentences')).not.toHaveText('0');

    // SVG chart should contain bars
    const chartBars = page.locator('.chart-bar-group');
    await expect(chartBars.first()).toBeVisible();
    const count = await chartBars.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('clicking a chart bar activates and focuses the corresponding sentence', async ({ page }) => {
    await page.goto('/');

    // Click the first bar in the SVG chart
    const firstBar = page.locator('.chart-bar-group').first();
    await firstBar.click();

    // Editor should have an active highlighted sentence mark
    const activeMark = page.locator('mark.sentence-mark.active');
    await expect(activeMark).toBeVisible();
    await expect(activeMark).toContainText('This sentence has five words.');
  });

  test('switching presets updates the text, metrics, and chart', async ({ page }) => {
    await page.goto('/');

    // Click Action tempo preset
    const actionPill = page.locator('button.preset-pill:has-text("High-Tempo Action")');
    await actionPill.click();

    const textarea = page.locator('#editor-input');
    await expect(textarea).toHaveValue(/Run\. Don’t look back\./);

    // Click Blank preset
    const blankPill = page.locator('button.preset-pill:has-text("Clear / Blank")');
    await blankPill.click();

    await expect(textarea).toHaveValue('');
    await expect(page.locator('#metric-sentences')).toHaveText('0');
  });

  test('copy button provides visual feedback', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');

    const copyBtn = page.locator('#copy-btn');
    await copyBtn.click();
    await expect(copyBtn).toContainText('Copied');
  });

  test('toggles dark and light mode', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('#theme-toggle');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await themeToggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await themeToggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});
