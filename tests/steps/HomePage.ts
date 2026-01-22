import { createBdd } from 'playwright-bdd';
import { test } from '../support/fixtures';
import { expect } from '@playwright/test';
import { FeedbackPage } from '../pages/FeedbackPage';
import { BrowserContext } from 'playwright';
import { APP_URL, FULLPAGE_URL } from '../config/env';
import { VisualSnapshotHelper } from '../helpers/visualSnapshot.helper';

const { Given, When, Then } = createBdd(test);
let context: BrowserContext;
let feedbackPage: FeedbackPage;

Given('I am on the home page', async ({ homePage }) => {
  await homePage.navigate();
  await expect(homePage.pageTitle).toBeVisible();
  await homePage.titlesVisible();
});

Given('I navigate to the connectivity tool map', async ({ homePage }) => {
  await homePage.navigateToConnectivityToolMap();
});

When('I click the explore connectivity tool link', async ({ homePage }) => {
  await homePage.clickConnectivityToolLink();
});

When('I click explore connectivity tool link and take connectivity full page screenshot', async ({ homePage, page, mapHelper }) => {
  await homePage.clickConnectivityToolLink();
  await expect(page).toHaveURL(APP_URL);
  await mapHelper.waitForMapToLoad();
  const screenshot = await homePage.takeConnectivityToolFullPageScreenshot();
  await VisualSnapshotHelper.connectivityToolFullPageScreenshot(screenshot, '-fullscreen-connectivity.png');
});

Then('I should navigate to map successfully', async ({ page }) => {
  await expect(page).toHaveURL(APP_URL);
});

Then('I should successfully capture a full-page screenshot of the connectivity map', async ({ page }) => {
  await expect(page).toHaveURL(FULLPAGE_URL);
});

When('I click the on accessibility check and validate the accessibility statement page is displayed successfully', async ({ homePage, navigationHelper }) => {
  await homePage.clickAccessibilityLink();
  await homePage.verifyAccessibilityPage();
  await navigationHelper.clickBackLink();
});

When('I click the on Open Government Licence check and validate the Open Government Licence page is displayed successfully', async ({ homePage }) => {
  await homePage.clickOpenGovernmentLicenceLink();
  await homePage.verifyOpenGovernmentPageTitle();
  await homePage.navigate();
});

Then('navigate back to home page', async ({ homePage }) => {
  await expect(homePage.pageTitle).toBeVisible();
});

When('I click on privacy policy link and validate the privacy policy page is displayed successfully', async ({ homePage, navigationHelper }) => {
  await homePage.clickPrivacyPolicyLink();
  await homePage.verifyPrivacyPolicyPage();
  await homePage.verifyPrivacyPolicyPageURL();
  await navigationHelper.clickBackLink();
});

Then('navigate back to home page from privacy policy', async ({ homePage }) => {
  await expect(homePage.pageTitle).toBeVisible();
});

When('I click on nav header guidance link and validate the guidance page is displayed successfully', async ({ homePage, navigationHelper }) => {
  await homePage.clickOnNavGuidanceLink();
  await homePage.verifyGuidancePage();
  await homePage.clickGuidanceClickableLink();
  await homePage.verifyGuidancePageURL();
  await navigationHelper.clickBackLink();
});

When('I click on guidance link and validate the guidance page is displayed successfully', async ({ homePage, navigationHelper }) => {
  await homePage.clickGuidanceLink();
  await homePage.verifyGuidancePage();
  await homePage.clickGuidanceClickableLink();
  await homePage.verifyGuidancePageURL();
  await navigationHelper.clickBackLink();
});

When('I click on understand the data link and validate the understand the data page is displayed successfully', async ({ homePage, navigationHelper }) => {
  await homePage.understandDataLink.click();
  await homePage.verifyUnderstandDataPage();
  await homePage.verifyUnderstandDataPageURL();
  await navigationHelper.clickBackLink();
});


When('I click on feedback link and validate the feedback page is submitted successfully', async ({ homePage, page, context }) => {
  const newPage = await homePage.clickFeedbackLink();
  feedbackPage = new FeedbackPage(newPage);
  await feedbackPage.fillFeedbackForm();
  await feedbackPage.closeTab();
  await page.bringToFront();
});














