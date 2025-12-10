## Playwright TypeScript Automation Framework

# Table of Contents

1. Introduction

2. Tech Stack

3. Project Structure & File Roles

4. Installation

5. Running Tests

6. Allure Reporting

7. Writing Tests (POM Example)

8. Page Object Model (POM)

9. Debugging

10. Contact / Support

# 1. Introduction

This repository contains an end-to-end UI framework built using Playwright (TypeScript). It is designed for scalability, maintainability, and ease of adoption for both automation engineers and manual testers transitioning into automation.

# 2. Tech Stack

Node.js (v18+)    Runtime environment
Playwright        Core automation framework
Allure Playwright Generating detailed reports
Dotenv            Secrets and configuration handling
Playwright Test   Test runner and Jest-style assertions

# 3. Project Structure & File Roles

├─ data/
│  └─ user.json
├─ pages/
│  ├─ login.page.ts
│  ├─ inventory.page.ts
│  ├─ cart.page.ts
│  └─ checkout.page.ts
├─ tests/
│  ├─ login.spec.ts
│  ├─ sort.spec.ts
│  ├─ purchase.spec.ts
│  └─ validateEmail.spec.ts
├─ utils/
│  ├─ email.ts
│  └─ env.ts
├─ global-setup.js
├─ basepage.ts
├─ .env
├─ .gitignore
├─ package-lock.json
├─ tsconfig.json
└─ playwright.config.ts

# 4. Installation

4.1 Prerequisites

Node.js v18+

Git

4.2 Install Dependencies

Install Node dependencies: npm install. This will install all necessary packages, including Playwright, dotenv (for environment variables), and Allure Playwright (for test reporting).

Install Playwright browsers (Chromium is mandatory): npx playwright install chromium

Tip: Install all browsers for full compatibility testing: npx playwright install

# 5. Running Tests

npx playwright test

npx playwright test --headed

npx playwright test --headed --grep='TC_01'

# 6. Allure Reporting

npx allure generate allure-results --clean -o allure-report

npx allure open

# 7. Writing Tests (POM Example)

import { test } from '@playwright/test';
import users from '../data/user.json';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await loginPage.navigate('/');
});

test('TC_01: Login with invalid credentials', async ({ page }) => {
  const { username, password } = users.invalidUser;

  await loginPage.login(username, password);
  await loginPage.validateErrorMsg('Epic sadface: Username and password do not match any user in this service');
});

test('TC_02: Login success', async ({ page }) => {
  const { username, password } = users.validUser;

  await loginPage.login(username, password);
  await inventoryPage.validateInventoryPage();
  await inventoryPage.validateInventoryListLoadedCorrectly();
});

# 8. Page Object Model (POM)

All page classes must extend BasePage (base.page.ts), which provides enhanced functionality:

Automatic waits
Logging & Allure integration
Screenshot

import { Page } from '@playwright/test';
import { BasePage } from '../basepage';

export class LoginPage extends BasePage {
  private username = '#user-name';
  private password = '#password';
  private loginBtn = '#login-button';
  private errorMsg = '[data-test="error"]';
  private shoppingCart = '#shopping_cart_container';
  private burgerMenuBtn = '#react-burger-menu-btn';

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.sendkeys(this.username, username);
    await this.sendkeys(this.password, password);
    await this.click(this.loginBtn);
  }

  async validateErrorMsg(text: string): Promise<void> {
    await this.expectText(this.errorMsg, text);
  }

  async verifyInventoryPage(): Promise<void> {
    await this.expectVisible(this.shoppingCart);
    await this.expectVisible(this.burgerMenuBtn);
  }
}

# 9. Debugging
Action	            Command/Code	                        Notes
Pause execution	    await page.pause();	                  Insert this line in your test code.
Run in debug mode	  npx playwright test --debug	          Opens Playwright Inspector for step-by-step execution.

# 10. Contact / Support

For framework support, please contact ... directly.
