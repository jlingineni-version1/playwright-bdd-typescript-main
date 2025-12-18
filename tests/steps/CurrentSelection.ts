import { createBdd } from 'playwright-bdd';
import { test } from '../support/fixtures';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Then('current selection should display expected results {float},{float},{string},{string}', async ({ currentSelectionPage }, expectedCs_latitude: number, expectedCs_longitude: number, expectedLocation: string, expectedSquareID: string) => {
  // const expectedSquareID='${expectedSquareID1}_${expectedSquareID2}';
  await currentSelectionPage.verifyCurrentSelection(expectedCs_latitude, expectedCs_longitude, expectedLocation, expectedSquareID);
});




