import { test } from '@playwright/test';
import users from '../data/user.json';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);

  await loginPage.navigate('/');
  await loginPage.login(users.validUser.username, users.validUser.password);
  await inventoryPage.waitForLoaded();
});

test('TC_01: Cart and Checkout Flow', async () => {
  await cartPage.addTwoProduct();

  await cartPage.navigateToCart();

  await cartPage.validateDetailProductInCart();

  await cartPage.removeBackpackItem();
  await cartPage.validateAfterRemoveBackpack();

  await cartPage.proceedToCheckout();
  await checkoutPage.fillCheckoutInformation(users.information.firstname, users.information.lastname, users.information.zip);

  const expectedSubtotal = 9.99;
  const expectedTax = 0.80;

  await checkoutPage.validateTotals(expectedSubtotal, expectedTax);

  await checkoutPage.finishCheckout();
  await checkoutPage.validateOrderCompleted();
});
