# Saucedemo Playwright Tests

End-to-end test suite for [saucedemo.com](https://www.saucedemo.com) built with [Playwright](https://playwright.dev) and TypeScript.

## Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- npm v9 or later

## Installation

```bash
npm install
npx playwright install chromium
```

## Running Tests

Run the full suite:

```bash
npx playwright test
```

Run a specific spec file:

```bash
npx playwright test tests/checkout.spec.ts
```

Run tests matching a title:

```bash
npx playwright test --grep "full purchase"
```

Re-run only the tests that failed in the last run:

```bash
npx playwright test --last-failed
```

## Viewing the Report

After a test run, open the HTML report:

```bash
npx playwright show-report
```

## Visual Regression

Visual regression tests use `toHaveScreenshot()` to compare the current UI against a saved baseline. Baselines are not committed to the repo, so the first run will fail. Generate them with:

```bash
npx playwright test --update-snapshots
```

After that, the tests will pass and only fail if the page visually changes. To accept intentional UI changes, re-run `--update-snapshots`.

## Network Interception

`network.spec.ts` uses `page.route()` to intercept and abort image requests, simulating a CDN or image service outage. The tests verify that the inventory page still renders all product information and that the checkout flow still completes successfully — confirming the app degrades gracefully when images are unavailable.

## Known Accessibility Failures

The accessibility tests (`accessibility.spec.ts`) use [axe-core](https://github.com/dequelabs/axe-core) to audit pages against WCAG standards. Saucedemo has real, built-in accessibility violations — these tests are expected to fail and document those issues. The failures are intentional findings, not broken tests.

## Project Structure

```
├── pages/                    # Page Object Models
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── auth.setup.ts         # Saves authenticated session to storageState.json
│   ├── login.spec.ts         # Login validation for all user types
│   ├── inventory.spec.ts     # Inventory sorting (A-Z, Z-A, price) and visual regression
│   ├── checkout.spec.ts      # Full purchase flow and cart behaviour
│   ├── network.spec.ts       # Network interception and resilience tests
│   └── accessibility.spec.ts # Axe-core a11y audits (known failures on saucedemo)
├── playwright.config.ts
└── tsconfig.json
```

## How Authentication Works

The `setup` project runs `auth.setup.ts` before the main test suite. It logs in as `standard_user`, saves the browser session to `storageState.json`, and the checkout, inventory, and accessibility specs reuse that session — skipping the login UI entirely. The login spec runs independently and tests the login page directly.
