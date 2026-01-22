import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://connectivity-tool-lite-test.dft.gov.uk/index');
  await page.getByRole('link', { name: 'Open Government Licence v3.0' }).click();
  await page.goto('https://connectivity-tool-lite-test.dft.gov.uk/index');
  await page.getByRole('link', { name: '© Crown copyright' }).click();
  await page.getByRole('heading', { name: 'Crown copyright' }).click();
  await page.getByRole('heading', { name: 'Crown copyright' }).click();
  await page.goto('https://connectivity-tool-lite-test.dft.gov.uk/index');
  await page.getByRole('link', { name: 'Open Government Licence v3.0' }).click();
  await page.getByRole('img', { name: 'Open Government Licence for' }).click();
  await page.getByRole('link', { name: 'Connectivity Tool Lite' }).click();
  await page.getByRole('link', { name: 'Connectivity Tool Lite' }).click();
  await page.getByRole('link', { name: 'Explore the Connectivity Tool' }).click();
  await page.getByRole('link', { name: 'Connectivity Tool Lite' }).click();
  await page.getByRole('link', { name: 'Explore the Connectivity Tool' }).click();
});