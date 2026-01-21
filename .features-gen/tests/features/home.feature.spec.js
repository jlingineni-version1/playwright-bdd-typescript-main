// Generated from: tests\features\home.feature
import { test } from "../../../tests/support/fixtures.ts";

test.describe('Home Page Login Functionality', () => {

  test.beforeEach('Background: Filter map functionality test', async ({ Given, homePage }, testInfo) => { if (testInfo.error) return;
    await Given('I am on the home page', null, { homePage }); 
  });
  
  test('Successful navigation to Connectivity Tool map', { tag: ['@home', '@smoke'] }, async ({ When, Then, homePage, page }) => { 
    await When('I click the explore connectivity tool link', null, { homePage }); 
    await Then('I should navigate to map successfully', null, { page }); 
  });

  test('Test Full page screenshot of Connectivity Tool map', { tag: ['@home', '@smoke', '@fullpagescreenshot'] }, async ({ When, Then, homePage, mapHelper, page }) => { 
    await When('I click explore connectivity tool link and take connectivity full page screenshot', null, { homePage, mapHelper, page }); 
    await Then('I should successfully capture a full-page screenshot of the connectivity map', null, { page }); 
  });

  test('Home page accessibility check', { tag: ['@footer', '@regression'] }, async ({ When, Then, homePage, navigationHelper }) => { 
    await When('I click the on accessibility check and validate the accessibility statement page is displayed successfully', null, { homePage, navigationHelper }); 
    await Then('navigate back to home page', null, { homePage }); 
  });

  test('Home page privacy policy check', { tag: ['@footer', '@regression'] }, async ({ When, Then, homePage, navigationHelper }) => { 
    await When('I click on privacy policy link and validate the privacy policy page is displayed successfully', null, { homePage, navigationHelper }); 
    await Then('navigate back to home page', null, { homePage }); 
  });

  test('Home page guidance link check', { tag: ['@footer', '@regression'] }, async ({ When, Then, homePage, navigationHelper }) => { 
    await When('I click on guidance link and validate the guidance page is displayed successfully', null, { homePage, navigationHelper }); 
    await Then('navigate back to home page', null, { homePage }); 
  });

  test('Home page nav header guidance link check', { tag: ['@regression', '@footer'] }, async ({ When, Then, homePage, navigationHelper }) => { 
    await When('I click on nav header guidance link and validate the guidance page is displayed successfully', null, { homePage, navigationHelper }); 
    await Then('navigate back to home page', null, { homePage }); 
  });

  test('Home page understand the data link check', { tag: ['@footer', '@regression'] }, async ({ When, Then, homePage, navigationHelper }) => { 
    await When('I click on understand the data link and validate the understand the data page is displayed successfully', null, { homePage, navigationHelper }); 
    await Then('navigate back to home page', null, { homePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\home.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":7,"tags":["@home","@smoke"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I click the explore connectivity tool link","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then I should navigate to map successfully","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":12,"tags":["@home","@smoke","@fullpagescreenshot"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When I click explore connectivity tool link and take connectivity full page screenshot","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then I should successfully capture a full-page screenshot of the connectivity map","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":17,"tags":["@footer","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I click the on accessibility check and validate the accessibility statement page is displayed successfully","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then navigate back to home page","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":22,"tags":["@footer","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I click on privacy policy link and validate the privacy policy page is displayed successfully","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then navigate back to home page","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":27,"tags":["@footer","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When I click on guidance link and validate the guidance page is displayed successfully","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then navigate back to home page","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":32,"tags":["@regression","@footer"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When I click on nav header guidance link and validate the guidance page is displayed successfully","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then navigate back to home page","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":37,"tags":["@footer","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"When I click on understand the data link and validate the understand the data page is displayed successfully","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then navigate back to home page","stepMatchArguments":[]}]},
]; // bdd-data-end