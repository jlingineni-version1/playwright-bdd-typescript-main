import { createBdd } from 'playwright-bdd';
import { test } from '../support/fixtures';

const { Given, When, Then } = createBdd(test);

Then('current selection should display expected results {float},{float},{string},{string}', async ({ currentSelectionPage }, expectedCs_latitude: number, expectedCs_longitude: number, expectedLocation: string, expectedSquareID: string) => {
  // const expectedSquareID='${expectedSquareID1}_${expectedSquareID2}';
  await currentSelectionPage.verifyCurrentSelection(expectedCs_latitude, expectedCs_longitude, expectedLocation, expectedSquareID);
});

Then('I cancel the location selection and current selection should update to reflect new tile selection', async ({ currentSelectionPage }) => {
  await currentSelectionPage.cancelLocationSelection();
  await currentSelectionPage.verifyWarningMessage();
});

Then('I click on Explore the score link should display expected results {float},{float},{string},{string}', async ({ currentSelectionPage }, expectedCs_latitude: number, expectedCs_longitude: number, expectedLocation: string, expectedSquareID: string) => {
await currentSelectionPage.exploreTheScore();
await currentSelectionPage.verifyCurrentSelection(expectedCs_latitude, expectedCs_longitude, expectedLocation, expectedSquareID);
});


