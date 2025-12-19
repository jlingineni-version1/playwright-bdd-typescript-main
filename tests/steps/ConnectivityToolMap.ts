import { createBdd } from 'playwright-bdd';
import { test } from '../support/fixtures';
import { expect } from '@playwright/test';
import { VisualSnapshotHelper } from '../helpers/visualSnapshot.helper';
import { FeedbackPage } from '../pages/FeedbackPage';
import { MapTilePage } from '../pages/MapTilerPage';

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
  await connectivityToolPage.verifyConnectivityScorefordifferentlocations(expectedScore);
});

Then('I should see the connectivity score displayed correctly on the map', async ({ connectivityToolPage }) => {
  await connectivityToolPage.verifyConnectivityScore();
});

Then('I should see the map updated with all selected filtering options {string}, {string}, {string}', async ({ connectivityToolPage }, authority: string, destination: string, mode: string) => {
  await expect(connectivityToolPage.localAuthorityViewCheckBox).toBeChecked();
  await expect(connectivityToolPage.showAuthorityBandcheckBox).toBeChecked();
  await expect(connectivityToolPage.LocalAuthorityDropDown).toContainText(authority);
  await expect(connectivityToolPage.scoreByDestinationDropDown).toContainText(destination);
  await expect(connectivityToolPage.scoreByModeOfTransportDropDown).toContainText(mode);
});

Then('I should see the map updated with the selected filtering options {string}, {string}, {string},{string},{string}', async ({ connectivityToolPage }, authority: string, destination: string, mode: string, expectedScore: string, expectedBand: string) => {
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
  await VisualSnapshotHelper.compareScreenshot(screenshot,authority + '-connectivity-tool-map-chromium-win32-chromium-win32.png');
    /* expect(screenshot).toMatchSnapshot(authority + '-connectivity-tool-map-chromium-win32-chromium-win32.png', {
     maxDiffPixelRatio: 0.2,   // 20% tolerance
     maxDiffPixels: 200000,    // absolute pixel count tolerance */
  });

When('I click on Map Tiler link on the connectivity tool map page', async ({ connectivityToolPage}) => {
  await connectivityToolPage.clickMapTilerLink();
  
});

Then('I should be redirected to Map Tiler screen and navigate back to connectivity tool map page', async ({ connectivityToolPage, mapTilePage, page }) => {
  mapTilePage = new MapTilePage(page);
  await mapTilePage.verifyMapTilerHeading();
  await mapTilePage.closeTab();
  await page.bringToFront();
  await connectivityToolPage.verifyFilterMapHeader();
});









