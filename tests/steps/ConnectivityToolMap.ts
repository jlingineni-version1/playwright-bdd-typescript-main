import { createBdd } from 'playwright-bdd';
import { test } from '../support/fixtures';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('I am on the home page & I navigate to the connectivity tool map', async ({ homePage }) => {
  await homePage.navigate();
  await expect(homePage.pageTitle).toBeVisible();
  await homePage.clickConnectivityToolLink();
});

When('I apply filters on the map & select local authority view {string} & select Score by destination {string} & Score by mode of transport {string}', async ({ connectivityToolPage }, authority: string, destination: string, mode: string) => {
  await connectivityToolPage.verifyFilterMapHeader();
  await connectivityToolPage.clickShowButton();
  await connectivityToolPage.selectLocalAuthorityView();
  await connectivityToolPage.selectLocalAuthority(authority);
  await connectivityToolPage.selectShowAuthorityBand();
  await connectivityToolPage.selectScoreByDestination(destination);
  await connectivityToolPage.selectScoreByModeOfTransport(mode);
});

Then('I should see expected results based on the applied filters', async ({ connectivityToolPage, page }) => {
  // Add assertions here to verify the expected results based on the applied filters
  // This is a placeholder as the actual verification would depend on the application behavior
  await expect(connectivityToolPage.localAuthorityViewCheckBox).toBeChecked();
  await expect(connectivityToolPage.showAuthorityBandcheckBox).toBeChecked();
  await expect(connectivityToolPage.LocalAuthorityDropDown).toContainText('Birmingham');
  await expect(connectivityToolPage.scoreByDestinationDropDown).toContainText('Leisure');
  await expect(connectivityToolPage.scoreByModeOfTransportDropDown).toContainText('Cycling');
});

When('I select local authority view {string} & select tile on the map', async ({ connectivityToolPage }, localAuthority: string) => {
  await connectivityToolPage.navigateToMap()
  await connectivityToolPage.waitForMapToLoad();
  await connectivityToolPage.verifyFilterMapHeader();
  await connectivityToolPage.clickShowButton();
  await connectivityToolPage.selectLocalAuthorityView();
  await connectivityToolPage.selectLocalAuthority(localAuthority);
  await connectivityToolPage.waitForMapToLoad();
  // await connectivityToolPage.navigateToMap();
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  await connectivityToolPage.clickMapAtPosition(469, 133);
  // await connectivityToolPage.verifyVisualRegessionOfMap();
});

Then('I should see the connectivity score displayed correctly on the map for {string} as {string} ', async ({ connectivityToolPage, page }, location: string, expectedScore: string) => {
  // Add assertions here to verify the connectivity score displayed on the map
  // This is a placeholder as the actual verification would depend on the application behavior
  // Example: await expect(connectivityToolPage.connectivityScoreElement).toBeVisible();
  await connectivityToolPage.verifyConnectivityScorefordifferentlocations(expectedScore);
});

When('I select local authority view {string} & enable show authority band checkbox', async ({ connectivityToolPage }, localAuthority: string) => {
  await connectivityToolPage.navigateToMap();
  await connectivityToolPage.waitForMapToLoad();
  await connectivityToolPage.verifyFilterMapHeader();
  await connectivityToolPage.clickShowButton();
  await connectivityToolPage.selectLocalAuthorityView();
  await connectivityToolPage.selectLocalAuthority(localAuthority);
  await connectivityToolPage.selectShowAuthorityBand();
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  await connectivityToolPage.clickMapAtPosition(469, 133);
});

Then('I should see the authority bands displayed correctly on the map', async ({ connectivityToolPage, page }) => {
  // Add assertions here to verify the local authority band displayed on the map
  // This is a placeholder as the actual verification would depend on the application behavior
  // Example: await expect(connectivityToolPage.localAuthorityBandElement).toBeVisible();
  await connectivityToolPage.verifyLocalAuthorityBand();
});

When('I select localauthorityview as {string} & select Scorebydestination as {string} & Scorebymodeoftransport as {string}', async ({ connectivityToolPage }, authority: string, destination: string, mode: string) => {
  await connectivityToolPage.verifyFilterMapHeader();
  await connectivityToolPage.clickShowButton();
  await connectivityToolPage.selectLocalAuthorityView();
  await connectivityToolPage.selectLocalAuthority(authority);
  await connectivityToolPage.selectShowAuthorityBand();
  await connectivityToolPage.selectScoreByDestination(destination);
  await connectivityToolPage.selectScoreByModeOfTransport(mode);
});

When('I select local authority view {string} & select Score by destination {string} & Score by mode of transport {string}', async ({ connectivityToolPage }, authority: string, destination: string, mode: string) => {
  await connectivityToolPage.navigateToMap();
  await connectivityToolPage.waitForMapToLoad();
  await connectivityToolPage.verifyFilterMapHeader();
  await connectivityToolPage.clickShowButton();
  await connectivityToolPage.selectLocalAuthorityView();
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  await connectivityToolPage.selectLocalAuthority(authority);
  // await connectivityToolPage.clickMapAtPosition(469, 133);
  await connectivityToolPage.selectShowAuthorityBand();
  await connectivityToolPage.selectScoreByDestination(destination);
  await connectivityToolPage.selectScoreByModeOfTransport(mode);
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  // await connectivityToolPage.clickZoomInButton();
  await connectivityToolPage.clickMapAtPosition(613, 163);
});

When('I search for location {string} and select coordinates {int},{int} on the map & select tile on the map', async ({ connectivityToolPage }, location: string, x: number, y: number) => {
  await connectivityToolPage.waitForMapToLoad();
  await connectivityToolPage.searchLocation(location);
  // await connectivityToolPage.searchComboBox.click();
  await connectivityToolPage.clickMapAtPosition(x, y);
  // await connectivityToolPage.waitForMapToLoad();
});

Then('I should see the connectivity score displayed correctly on the map for {string} as {string}', async ({ connectivityToolPage }, location: string, expectedScore: string) => {
  // Add assertions here to verify the connectivity score displayed on the map
  // This is a placeholder as the actual verification would depend on the application behavior
  await connectivityToolPage.verifyConnectivityScorefordifferentlocations(expectedScore);
});

Then('I should see the connectivity score displayed correctly on the map', async ({ connectivityToolPage }) => {
  // Add assertions here to verify the connectivity score displayed on the map
  // This is a placeholder as the actual verification would depend on the application behavior
  await connectivityToolPage.verifyConnectivityScore();
});

Then('I should see the map updated with all selected filtering options {string}, {string}, {string}', async ({ connectivityToolPage }, authority: string, destination: string, mode: string) => {
  // Add assertions here to verify the expected results based on the applied filters for regional view
  // This is a placeholder as the actual verification would depend on the application behavior
  await expect(connectivityToolPage.localAuthorityViewCheckBox).toBeChecked();
  await expect(connectivityToolPage.showAuthorityBandcheckBox).toBeChecked();
  await expect(connectivityToolPage.LocalAuthorityDropDown).toContainText(authority);
  await expect(connectivityToolPage.scoreByDestinationDropDown).toContainText(destination);
  await expect(connectivityToolPage.scoreByModeOfTransportDropDown).toContainText(mode);
});

Then('I should see the map updated with the selected filtering options {string}, {string}, {string},{string},{string}', async ({ connectivityToolPage }, authority: string, destination: string, mode: string, expectedScore: string, expectedBand: string) => {
  // Add assertions here to verify the expected results based on the applied filters for regional view
  // This is a placeholder as the actual verification would depend on the application behavior
  await connectivityToolPage.verifyConnectivityScorefordifferentlocations(expectedScore);
  await connectivityToolPage.verifyLocalAuthorityBandForDIfferentLocations(expectedBand);
  await expect(connectivityToolPage.localAuthorityViewCheckBox).toBeChecked();
  await expect(connectivityToolPage.showAuthorityBandcheckBox).toBeChecked();
  await expect(connectivityToolPage.LocalAuthorityDropDown).toContainText(authority);
  await expect(connectivityToolPage.scoreByDestinationDropDown).toContainText(destination);
  await expect(connectivityToolPage.scoreByModeOfTransportDropDown).toContainText(mode);
  //ToDo add to UTIL Functionality for snapshot comparison
  // await connectivityToolPage.verifyVisualRegessionOfMap('connectivity-tool-map-authority.png');
  const screenshot = await connectivityToolPage.takeScreenshot();
  expect(screenshot).toMatchSnapshot(authority + '-connectivity-tool-map-chromium-win32-chromium-win32.png', {
    maxDiffPixelRatio: 0.2,   // 20% tolerance
    maxDiffPixels: 200000,    // absolute pixel count tolerance
  });

  // Then('current selection should display expected results', async ({ currentSelectionPage }) => {
  //   // Add assertions here to verify the connectivity score displayed on the map
  //   // This is a placeholder as the actual verification would depend on the application behavior
  //   await currentSelectionPage.verifyCurrentSelection();
  // });

});


