import { test } from '@playwright/test';
import users from '../data/user.json';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);

  const { username, password } = users.validUser;

  await loginPage.navigate('/');
  await loginPage.login(username, password);
  await inventoryPage.waitForLoaded();
  await inventoryPage.countItems();
});

test('TC_01: Sorting: Name (A → Z)', async () => {
  await inventoryPage.selectSort('az');
  await inventoryPage.validateSorting('az');
});

test('TC_02: Sorting: Name (Z → A)', async () => {
  await inventoryPage.selectSort('za');
  await inventoryPage.validateSorting('za');
});

test('TC_03: Sorting: Price (Low → High)', async () => {
  await inventoryPage.selectSort('lohi');
  await inventoryPage.validateSorting('lohi');
});

test('TC_04: Sorting: Price (High → Low)', async () => {
  await inventoryPage.selectSort('hilo');
  await inventoryPage.validateSorting('hilo');
});