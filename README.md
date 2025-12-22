# Playwright BDD TypeScript

A robust, scalable end-to-end (E2E) automation framework leveraging **Playwright**, **Cucumber (BDD)**, and **TypeScript**.  
Implements modern best practices for maintainable, high-performance web application testing.

---

## 🚀 Features

- **Playwright** for fast, reliable browser automation (Chromium, Firefox, WebKit)
- **Cucumber BDD** for human-readable, behavior-driven test scenarios
- **TypeScript** for type safety and maintainability
- **Page Object Model** for scalable test architecture
- **Custom .gitignore** for clean version control
- **Ready for CI/CD** and enterprise-grade quality engineering

---

## 📁 Project Structure

```
tests/
  features/        # .feature files (Gherkin syntax)
  helpers/         # Utility & helper functions
  steps/           # Step definitions (TypeScript)
  pages/           # Page objects (TypeScript)
  support/         # Fixtures, hooks, helpers
    hooks/         # Cucumber hooks
  *.spec.ts        # Example Playwright tests
playwright.config.ts
cucumber.js
tsconfig.json
package.json
.gitignore
```

---

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Tests

- **Run all BDD tests:**  
  ```bash
  npm run bdd:test
  ```
- **Run Playwright tests in headed UI mode:**  
  ```bash
  npm run bdd:test:headed
  ```
- **Run a specific feature:**  
  ```bash
  npm run bdd:test:home
  ```

- **Run Tests in Playwright UI Mode:**  
```bash
npm run bdd:test:ui
```

- **Run tagged tests (example: smoke):**  
```bash
npm run bdd:test:smoke
```

### 3. View Reports

- **Playwright HTML report:**  
  ```bash
  npm run bdd:show-report
  ```

---

## 🧩 Scripts

| Script                    | Description                                 |
|-------------------------- |---------------------------------------------|
| `bdd:tst`                 | Run Cucumber BDD tests                      |
| `bdd:test:headed`         | Run Playwright tests in headed mode (UI)    |
| `bdd:test:home`           | Run specific feature file                   |
| `bdd:test:smoke`          | Run tests with @smoke tag                   |
| `bdd:test:ui  `           | Run tests in Playwright UI Mode             |
| `playwright-test`         | Run Playwright with HTML & list reporters   |
| `bdd:show-report`         | Show Playwright HTML report                 |

---

## 📝 Writing Scenarios

- Write Gherkin scenarios in `tests/features/`
- Implement step definitions in `tests/steps/`
- Use page objects from `tests/pages/` for maintainability

---

## 🧑‍💻 Technologies

- [Playwright](https://playwright.dev/)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Best Practices

- Use strong typing in all step definitions and page objects
- Keep scenarios atomic and independent
- Use tags (`@smoke`, `@regression`, etc.) for test categorization
- Store sensitive data in `.env` (already gitignored)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE) (add a LICENSE file if you wish).

---

## 🙋‍♂️ Author

**Jyothi Lingineni**  
_Senior Automation Test Engineer_

---

Let me know if you want to add badges, CI instructions, or tailor it for a specific company or use case!
