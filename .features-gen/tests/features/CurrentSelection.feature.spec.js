// Generated from: tests\features\CurrentSelection.feature
import { test } from "../../../tests/support/fixtures.ts";

test.describe('Current Selection', () => {

  test.beforeEach('Background: Current selection functionality test', async ({ Given, homePage }, testInfo) => { if (testInfo.error) return;
    await Given('I am on the home page & I navigate to the connectivity tool map', null, { homePage }); 
  });
  
  test.describe('Verify current selection results displayed accordingly when Score for different local authorities are selected', () => {

    test('Example #1', { tag: ['@currentselection', '@regression'] }, async ({ When, Then, connectivityToolPage, currentSelectionPage, mapHelper }) => { 
      await When('I search for location "Hounslow" and select coordinates 476,275 on the map & select tile on the map', null, { connectivityToolPage, mapHelper }); 
      await Then('current selection should display expected results 51.472289,-0.385232,"Hounslow","512250_176050"', null, { currentSelectionPage }); 
    });

  });

  test.describe('Verify current selection updates when cancel location selection is selected', () => {

    test('Example #1', { tag: ['@currentselection', '@regression'] }, async ({ When, Then, connectivityToolPage, currentSelectionPage, mapHelper }) => { 
      await When('I search for location "Hounslow" and select coordinates 476,275 on the map & select tile on the map', null, { connectivityToolPage, mapHelper }); 
      await Then('I cancel the location selection and current selection should update to reflect new tile selection', null, { currentSelectionPage }); 
    });

  });

  test.describe('Verify explore the score link displays expected results', () => {

    test('Example #1', { tag: ['@currentselection', '@regression'] }, async ({ When, Then, connectivityToolPage, currentSelectionPage, mapHelper }) => { 
      await When('I search for location "Hounslow" and select coordinates 476,275 on the map & select tile on the map', null, { connectivityToolPage, mapHelper }); 
      await Then('I click on Explore the score link should display expected results 51.472289,-0.385232,"Hounslow","512250_176050"', null, { currentSelectionPage }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\CurrentSelection.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":12,"tags":["@currentselection","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page & I navigate to the connectivity tool map","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I search for location \"Hounslow\" and select coordinates 476,275 on the map & select tile on the map","stepMatchArguments":[{"group":{"start":22,"value":"\"Hounslow\"","children":[{"start":23,"value":"Hounslow","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":56,"value":"476","children":[]},"parameterTypeName":"int"},{"group":{"start":60,"value":"275","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":14,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then current selection should display expected results 51.472289,-0.385232,\"Hounslow\",\"512250_176050\"","stepMatchArguments":[{"group":{"start":50,"value":"51.472289","children":[]},"parameterTypeName":"float"},{"group":{"start":60,"value":"-0.385232","children":[]},"parameterTypeName":"float"},{"group":{"start":70,"value":"\"Hounslow\"","children":[{"start":71,"value":"Hounslow","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":81,"value":"\"512250_176050\"","children":[{"start":82,"value":"512250_176050","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":21,"pickleLine":20,"tags":["@currentselection","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page & I navigate to the connectivity tool map","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I search for location \"Hounslow\" and select coordinates 476,275 on the map & select tile on the map","stepMatchArguments":[{"group":{"start":22,"value":"\"Hounslow\"","children":[{"start":23,"value":"Hounslow","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":56,"value":"476","children":[]},"parameterTypeName":"int"},{"group":{"start":60,"value":"275","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":23,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then I cancel the location selection and current selection should update to reflect new tile selection","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":28,"tags":["@currentselection","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page & I navigate to the connectivity tool map","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When I search for location \"Hounslow\" and select coordinates 476,275 on the map & select tile on the map","stepMatchArguments":[{"group":{"start":22,"value":"\"Hounslow\"","children":[{"start":23,"value":"Hounslow","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":56,"value":"476","children":[]},"parameterTypeName":"int"},{"group":{"start":60,"value":"275","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":32,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then I click on Explore the score link should display expected results 51.472289,-0.385232,\"Hounslow\",\"512250_176050\"","stepMatchArguments":[{"group":{"start":66,"value":"51.472289","children":[]},"parameterTypeName":"float"},{"group":{"start":76,"value":"-0.385232","children":[]},"parameterTypeName":"float"},{"group":{"start":86,"value":"\"Hounslow\"","children":[{"start":87,"value":"Hounslow","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":97,"value":"\"512250_176050\"","children":[{"start":98,"value":"512250_176050","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end