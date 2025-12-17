# Setup Instructions

Follow these steps to get the project running on your machine.

## Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **VS Code** - [Download here](https://code.visualstudio.com/)

## Installation Steps

### 1. Extract the Project
Extract the zip file to your desired location.

### 2. Open in VS Code
Open the project folder in VS Code:
```bash
code playwright-bdd-typescript-main
```

### 3. Install Recommended Extensions
When you open the project, VS Code will prompt you to install recommended extensions. Click **Install All**.

Or install them manually:
- **Playwright Test for VS Code** (ms-playwright.playwright)
- **Cucumber (Gherkin) Full Support** (cucumberopen.cucumber-official)
- **Cucumber (Gherkin) Autocomplete** (alexkrechik.cucumberautocomplete)

### 4. Install Node Dependencies
Open a terminal in VS Code (`` Ctrl+` ``) and run:
```bash
npm install
```

### 5. Install Playwright Browsers
```bash
npx playwright install
```

### 6. Create Reports Directory
```bash
mkdir reports
```
Or on Windows PowerShell:
```powershell
New-Item -Path .\reports -ItemType Directory -Force
```

## Running Tests

### BDD Tests (Feature Files) - Using playwright-bdd

**Generate and run all tests:**
```bash
npm test
```
or
```bash
npm run bdd:test
```

**Run with UI mode (interactive):**
```bash
npm run test:ui
```

**Run with headed mode (see browser):**
```bash
npm run bdd:test:headed
```

**Just generate test files (without running):**
```bash
npm run bdd:generate
```

**Run from VS Code Test Explorer:**
1. Run `npm run bdd:generate` first
2. Tests will appear in the Test Explorer (Testing icon in sidebar)
3. Click the ▶️ play button next to any test/scenario

### Playwright Tests (Spec Files)
Run traditional Playwright `.spec.ts` files:
```bash
npx playwright test tests/*.spec.ts
```

## View Reports

After running tests, view the HTML report:
```bash
npm run bdd:show-report
```

View trace files (for failed tests):
```bash
npm run show-trace
```

Or view specific trace:
```bash
npx playwright show-trace test-results/[test-folder]/trace.zip
```

## Project Structure

```
playwright-bdd-typescript-main/
├── tests/
│   ├── features/          # BDD feature files (.feature)
│   ├── steps/             # Step definitions
│   ├── pages/             # Page objects
│   ├── support/hooks/     # Test hooks (setup/teardown)
│   └── *.spec.ts          # Playwright tests
├── reports/               # Test artifacts (screenshots, traces)
├── playwright.config.ts   # Playwright configuration
├── cucumber.js            # Cucumber configuration
└── package.json           # Dependencies and scripts
```

## Troubleshooting

### Tests Not Appearing in Test Explorer
Run `npm run bdd:generate` first. This generates Playwright test files from your `.feature` files in the `.features-gen` folder. After generation, tests will appear in VS Code Test Explorer.

### Regenerate Tests After Changes
Whenever you modify `.feature` files or step definitions, regenerate the tests:
```bash
npm run bdd:generate
```

### Browser Not Opening
By default, tests run in headless mode. To see the browser:
```bash
npm run bdd:test:headed
```

Or use UI mode for interactive debugging:
```bash
npm run test:ui
```

## How playwright-bdd Works

This project uses **playwright-bdd** which bridges Cucumber/Gherkin syntax with Playwright's test runner:

1. Write scenarios in `.feature` files (Gherkin syntax)
2. Implement step definitions in `tests/steps/` using `createBdd()`
3. Run `npm run bdd:generate` to convert features → Playwright tests
4. Generated tests appear in `.features-gen/` folder
5. Run tests with Playwright (shows in Test Explorer!)

## Notes

- Tests target the Birla Opus QA environment
- Default test credentials are in the step definitions  
- Failed tests automatically generate screenshots, videos, and traces
- The `.features-gen/` folder is auto-generated - don't edit these files directly
