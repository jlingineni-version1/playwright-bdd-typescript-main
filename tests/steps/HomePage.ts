import { createBdd } from 'playwright-bdd';
import { test } from '../support/fixtures';
import { expect } from '@playwright/test';
import { FeedbackPage } from '../pages/FeedbackPage';
import { BrowserContext } from 'playwright';


const { Given, When, Then } = createBdd(test);
let context: BrowserContext;
let feedbackPage: FeedbackPage;

Given('I am on the home page', async ({ homePage }) => {
  await homePage.navigate();
  await expect(homePage.pageTitle).toBeVisible();
});

Given('I navigate to the connectivity tool map', async ({ homePage }) => {
  await homePage.navigateToConnectivityToolMap();
});

When('I click the explore connectivity tool link', async ({ homePage }) => {
  await homePage.clickConnectivityToolLink();
});

Then('I should navigate to map successfully', async ({ page }) => {
  await expect(page).toHaveURL('https://connectivity-tool-lite-test.dft.gov.uk/app');
});

When('I click the on accessibility check and validate the accessibility statement page is displayed successfully', async ({ homePage }) => {
  await homePage.clickAccessibilityLink();
  await homePage.verifyAccessibilityPage();
  await homePage.clickBackLink();
});

Then('navigate back to home page', async ({ homePage }) => {
  await expect(homePage.pageTitle).toBeVisible();
});

When('I click on privacy policy link and validate the privacy policy page is displayed successfully', async ({ homePage }) => {
  await homePage.clickPrivacyPolicyLink();
  await homePage.verifyPrivacyPolicyPage();
  await homePage.verifyPrivacyPolicyPageURL();
  await homePage.clickBackLink();
});

Then('navigate back to home page from privacy policy', async ({ homePage }) => {
  await expect(homePage.pageTitle).toBeVisible();
});

When('I click on guidance link and validate the guidance page is displayed successfully', async ({ homePage }) => {
  await homePage.clickGuidanceLink();
  await homePage.verifyGuidancePage();
  await homePage.clickGuidanceClickableLink();
  await homePage.verifyGuidancePageURL();
  await homePage.clickBackLink();
});

When('I click on understand the data link and validate the understand the data page is displayed successfully', async ({ homePage }) => {
  await homePage.understandDataLink.click();
  await homePage.verifyUnderstandDataPage();
  await homePage.verifyUnderstandDataPageURL();
  await homePage.clickBackLink();
});


When('I click on feedback link and validate the feedback page is submitted successfully', async ({ homePage, page, context }) => {
  const newPage = await homePage.clickFeedbackLink();
  feedbackPage = new FeedbackPage(newPage);
  await feedbackPage.fillFeedbackForm();
  await feedbackPage.closeTab();
  await page.bringToFront();
});














