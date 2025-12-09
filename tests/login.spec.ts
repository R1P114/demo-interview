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
