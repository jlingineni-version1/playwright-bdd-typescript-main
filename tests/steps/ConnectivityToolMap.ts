import { createBdd } from 'playwright-bdd';
import { test } from '../support/fixtures';
import { expect } from '@playwright/test';
import { VisualSnapshotHelper } from '../helpers/visualSnapshot.helper';
import { MapTilePage } from '../pages/MapTilerPage';
import { OpenStreetMapPage } from '../pages/OpenStreetMapPage';

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

When('I select local authority view {string} & select tile on the map', async ({ connectivityToolPage, mapHelper }, localAuthority: string) => {
  await connectivityToolPage.navigateToMap()
  await mapHelper.waitForMapToLoad();
  await connectivityToolPage.verifyFilterMapHeader();
  await connectivityToolPage.clickShowButton();
  await connectivityToolPage.selectLocalAuthorityView();
  await connectivityToolPage.selectLocalAuthority(localAuthority);
  await mapHelper.waitForMapToLoad();
  await connectivityToolPage.clickMapAtPosition(469, 133);
  await connectivityToolPage.waitForMapToReload();
});

Then('I should see the connectivity score displayed correctly on the map for {string} as {string} ', async ({ connectivityToolPage, page }, location: string, expectedScore: string) => {
  await connectivityToolPage.verifyConnectivityScorefordifferentlocations(expectedScore);
});

When('I select local authority view {string} & enable show authority band checkbox', async ({ connectivityToolPage, mapHelper }, localAuthority: string) => {
  await connectivityToolPage.navigateToMap();
  await mapHelper.waitForMapToLoad();
  await connectivityToolPage.verifyFilterMapHeader();
  await connectivityToolPage.clickShowButton();
  await connectivityToolPage.selectLocalAuthorityView();
  await connectivityToolPage.selectLocalAuthority(localAuthority);
  await connectivityToolPage.selectShowAuthorityBand();
  await connectivityToolPage.clickMapAtPosition(469, 133);
  await connectivityToolPage.waitForMapToReload();
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

When('I select local authority view {string} & select Score by destination {string} & Score by mode of transport {string}', async ({ connectivityToolPage, mapHelper }, authority: string, destination: string, mode: string) => {
  await connectivityToolPage.navigateToMap();
  await mapHelper.waitForMapToLoad();
  await connectivityToolPage.verifyFilterMapHeader();
  await connectivityToolPage.clickShowButton();
  await connectivityToolPage.selectLocalAuthorityView();
  await connectivityToolPage.selectLocalAuthority(authority);
  await connectivityToolPage.selectShowAuthorityBand();
  await connectivityToolPage.selectScoreByDestination(destination);
  await connectivityToolPage.selectScoreByModeOfTransport(mode);
  await connectivityToolPage.clickMapAtPosition(613, 163);
  await connectivityToolPage.waitForMapToReload();
});

When('I select local authority view {string},Score by destination {string},Score by mode of transport {string},public transport {string}', async ({ connectivityToolPage, mapHelper }, authority: string, destination: string, mode: string, publictransport: string) => {
  await connectivityToolPage.navigateToMap();
  await mapHelper.waitForMapToLoad();
  await connectivityToolPage.verifyFilterMapHeader();
  await connectivityToolPage.clickShowButton();
  await connectivityToolPage.selectLocalAuthorityView();
  await connectivityToolPage.selectLocalAuthority(authority);
  await connectivityToolPage.selectShowAuthorityBand();
  await connectivityToolPage.selectScoreByDestination(destination);
  await connectivityToolPage.selectScoreByModeOfTransport(mode);
  await connectivityToolPage.clickPublicTransportShowLink();
  await connectivityToolPage.checkPublicTransport(publictransport);
});


When('I search for location {string} and select coordinates {int},{int} on the map & select tile on the map', async ({ connectivityToolPage, mapHelper }, location: string, x: number, y: number) => {
  await mapHelper.waitForMapToLoad();
  await connectivityToolPage.searchLocation(location);
  await connectivityToolPage.clickMapAtPosition(x, y);
  await connectivityToolPage.waitForMapToReload();
});

When('I select location {string},coordinates {int},{int},tile on the map & select Map {string}', async ({ connectivityToolPage, mapHelper }, location: string, x: number, y: number, opacity: string) => {
  await mapHelper.waitForMapToLoad();
  await connectivityToolPage.searchLocation(location);
  await connectivityToolPage.clickMapAtPosition(x, y);
  await connectivityToolPage.clickSettingsLink();
  await connectivityToolPage.selectOpacitySlider(opacity);
});

Then('capture a canvas screenshot of the map for {string} with all {string} stops', async ({ connectivityToolPage }, location: string, publictransport: string) => {
  const screenshot = await connectivityToolPage.takeCanvasScreenshot();
  await VisualSnapshotHelper.compareCanvasScreenshot(screenshot, location + publictransport + '-canvas-connectivity.png');
});

Then('I capture a canvas screenshot of the map with the {string} percentage applied for {string}', async ({ connectivityToolPage }, location: string, opacity: string) => {
  const screenshot = await connectivityToolPage.takeCanvasScreenshot();
  await VisualSnapshotHelper.compareCanvasScreenshot(screenshot, location + opacity + '-canvas-connectivity.png');
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
  const screenshot = await connectivityToolPage.takeScreenshot();
  await VisualSnapshotHelper.compareScreenshot(screenshot, authority + '-connectivity-tool-map-chromium-win32-chromium-win32.png');
});

Then('I should see canvas screenshot updated with the selected filtering options {string}, {string}, {string},{string},{string}', async ({ connectivityToolPage }, authority: string, destination: string, mode: string, expectedScore: string, expectedBand: string) => {
  await connectivityToolPage.verifyConnectivityScorefordifferentlocations(expectedScore);
  await connectivityToolPage.verifyLocalAuthorityBandForDIfferentLocations(expectedBand);
  await expect(connectivityToolPage.localAuthorityViewCheckBox).toBeChecked();
  await expect(connectivityToolPage.showAuthorityBandcheckBox).toBeChecked();
  await expect(connectivityToolPage.LocalAuthorityDropDown).toContainText(authority);
  await expect(connectivityToolPage.scoreByDestinationDropDown).toContainText(destination);
  await expect(connectivityToolPage.scoreByModeOfTransportDropDown).toContainText(mode);
  const screenshot = await connectivityToolPage.takeCanvasScreenshot();
  await VisualSnapshotHelper.compareCanvasScreenshot(screenshot, authority + '-canvas-connectivity-tool-map.png');
});

When('I click on Map Tiler link on the connectivity tool map page', async ({ connectivityToolPage }) => {
  await connectivityToolPage.clickMapTilerLink();

});

Then('I should be redirected to Map Tiler screen and navigate back to connectivity tool map page', async ({ connectivityToolPage, mapTilePage, page }) => {
  mapTilePage = new MapTilePage(page);
  await mapTilePage.verifyMapTilerHeading();
  await mapTilePage.closeTab();
  await page.bringToFront();
  await connectivityToolPage.verifyFilterMapHeader();
});

When('I click on Open Street Map Contributors link on the connectivity tool map page', async ({ connectivityToolPage }) => {
  await connectivityToolPage.clickOpenStreetMapLink();
});

Then('I should be redirected to Open Street Map Contributors screen and navigate back to connectivity tool map page', async ({ connectivityToolPage, openStreetMapPage, page }) => {
  openStreetMapPage = new OpenStreetMapPage(page);
  await openStreetMapPage.verifyOpenStreetMapHeading();
  await openStreetMapPage.closeTab();
  await page.bringToFront();
  await connectivityToolPage.verifyFilterMapHeader();
});









