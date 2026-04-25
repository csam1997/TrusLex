const path = require('path');
const { test, expect } = require('@playwright/test');

const caseFile = path.join(__dirname, '..', 'data', 'sample', 'Case_Table_2026-Feb-21_1952.xlsx');
const secondaryFile = path.join(__dirname, '..', 'data', 'sample', 'Secondary_Source_Coverage_Table_2026-Feb-21_2058.xlsx');

async function uploadSampleData(page) {
  await page.goto('/');
  await page.setInputFiles('#upload-input', caseFile);
  await page.setInputFiles('#secondary-input', secondaryFile);
  await page.click('#empty-go-btn');
  await expect(page.locator('#dashboard')).toBeVisible();
  await expect(page.locator('#s-total')).not.toHaveText('—');
  await expect(page.locator('#cases-list .case-item').first()).toBeVisible();
}

async function getMapSize(page) {
  return await page.locator('#map-wrap').evaluate(el => {
    const rect = el.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });
}

test('dashboard renders sample dataset with working maps', async ({ page }) => {
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    pageErrors.push(err.message);
  });

  await uploadSampleData(page);

  const stateVisuals = await page.locator('#map-svg .state-path, #map-svg g').count();
  expect(stateVisuals).toBeGreaterThan(0);

  await page.locator('#map-svg .bl g').filter({ hasText: 'CA' }).click();
  await expect(page.locator('#cases-title')).toHaveText('Cases // California');
  await expect(page.locator('#clear-state-btn')).toBeVisible();

  await expect.poll(async () => page.locator('#world-svg .wb').count()).toBeGreaterThan(0);

  await page.locator('#country-chips .country-chip').first().click();
  await expect(page.locator('#cases-title')).not.toHaveText('Case Log');
  await expect(page.locator('#cases-list .case-item').first()).toBeVisible();

  await page.click('#clear-state-btn');
  await expect(page.locator('#cases-title')).toHaveText('Case Log');

  expect(pageErrors, pageErrors.join('\n')).toEqual([]);
expect(consoleErrors, consoleErrors.join('\n')).toEqual([]);
});

test('state clicks do not resize the US map', async ({ page }) => {
  await uploadSampleData(page);

  const baseline = await getMapSize(page);

  for (const state of ['VA', 'MN', 'CA']) {
    await page.locator('#map-svg .bl g').filter({ hasText: state }).click();
    await expect(page.locator('#cases-title')).not.toHaveText('Case Log');
    const size = await getMapSize(page);
    expect(size.width).toBeCloseTo(baseline.width, 1);
    expect(size.height).toBeCloseTo(baseline.height, 1);
    await page.click('#clear-state-btn');
  }
});

test('US map zoom controls change transform and keep bubbles readable', async ({ page }) => {
  await uploadSampleData(page);

  const transform = async () => {
    return await page.locator('#map-svg .us-panzoom').evaluate(el => el.getAttribute('transform') || '');
  };
  const bubbleWidth = async () => {
    const box = await page.locator('#map-svg .bl g circle:nth-child(3)').first().boundingBox();
    return box ? box.width : 0;
  };

  expect(await transform()).toContain('scale(1)');
  const baselineBubbleWidth = await bubbleWidth();

  await page.getByRole('button', { name: 'Zoom in on US map' }).click();
  await expect.poll(transform).not.toBe('');
  expect(await transform()).toContain('scale(');
  expect(await bubbleWidth()).toBeCloseTo(baselineBubbleWidth, 1);

  await page.getByRole('button', { name: 'Reset US map zoom' }).click();
  await expect.poll(transform).toContain('scale(1)');
});



test('world map zoom controls change transform and can reset', async ({ page }) => {
  await uploadSampleData(page);
  await expect.poll(async () => page.locator('#world-svg .wb').count()).toBeGreaterThan(0);

  const transform = async () => {
    return await page.locator('#world-svg .world-panzoom').evaluate(el => el.getAttribute('transform') || '');
  };
  const bubbleWidth = async () => {
    const box = await page.locator('#world-svg .wb circle:nth-child(2)').first().boundingBox();
    return box ? box.width : 0;
  };

  expect(await transform()).toContain('scale(1)');
  const baselineBubbleWidth = await bubbleWidth();

  await page.getByRole('button', { name: 'Zoom in on world map' }).click();
  await expect.poll(transform).not.toBe('');
  expect(await transform()).toContain('scale(');
  expect(await bubbleWidth()).toBeCloseTo(baselineBubbleWidth, 1);

  await page.getByRole('button', { name: 'Reset world map zoom' }).click();
  await expect.poll(transform).toContain('scale(1)');
  expect(await bubbleWidth()).toBeCloseTo(baselineBubbleWidth, 1);
});

test('mobile viewport keeps core dashboard sections visible', async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await uploadSampleData(page);

  await expect(page.locator('#map-wrap')).toBeVisible();
  await expect(page.locator('#world-map-wrap')).toBeVisible();
  await expect(page.locator('#chart-trend')).toBeVisible();
  await expect(page.locator('#cases-list')).toBeVisible();

  await page.close();
});
