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
  npm run test:bdd
  ```
- **Run Playwright UI mode:**  
  ```bash
  npm run test headed
  ```
- **Run a specific feature:**  
  ```bash
  npm run test home
  ```

### 3. View Reports

- **Playwright HTML report:**  
  ```bash
  npm run playwright-test
  npm run bdd:show-report
  ```

---

## 🧩 Scripts

| Script                | Description                                 |
|-----------------------|---------------------------------------------|
| `test:bdd`            | Run Cucumber BDD tests                      |
| `test:headed`         | Run Playwright tests in headed mode (UI)    |
| `test:painter`        | Run specific feature file                   |
| `playwright-test`     | Run Playwright with HTML & list reporters   |
| `bdd:show-report`     | Show Playwright HTML report                 |

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

**Arun Purohit**  
_Quality Engineering Enthusiast | Automation Specialist_

---

Let me know if you want to add badges, CI instructions, or tailor it for a specific company or use case!

```plaintext
tests/
  e2e/
    features/      # .feature files (Gherkin syntax)
    steps/         # Step definitions (TypeScript)
    pages/         # Page objects (TypeScript)
    support/       # Fixtures, hooks, helpers
  test.spec.ts     # Example Playwright test
playwright.config.ts
cucumber.js
tsconfig.json
.gitignore
```

```shellscript
npm install
```

```shellscript
  npm run test:bdd
```

```shellscript
  npm run test:headed
```

```shellscript
  npm run test:painter
```

```shellscript
  npm run playwright-test
  npm run bdd:show-report
```
