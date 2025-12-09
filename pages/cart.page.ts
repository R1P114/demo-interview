import { Page, expect } from '@playwright/test';
import { BasePage } from '../basepage';

export class CartPage extends BasePage {
  private backpackProduct = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private bikelightProduct = '[data-test="add-to-cart-sauce-labs-bike-light"]';
  private shoppingCart = '[data-test="shopping-cart-link"]';
  private nameBikeLight = '[data-test="item-0-title-link"]';
  private nameBackpack = '[data-test="item-4-title-link"]';
  private itemInCart = this.page.locator('[data-test="cart-list"]');
  private removeBackpackButton = '[data-test="remove-sauce-labs-backpack"]';
  private checkoutButton = '[data-test="checkout"]';

  constructor(page: Page) {
    super(page);
  }

  async addTwoProduct():Promise<void> {
    await this.click(this.backpackProduct);
    await this.click(this.bikelightProduct);
  }

  async navigateToCart():Promise<void> {
    await this.click(this.shoppingCart);
  }

  async validateDetailProductInCart():Promise<void> {
    const priceBikeLight = this.page.locator('[data-test="inventory-item"]')
      .filter({ hasText: 'Sauce Labs Bike Light' });
    const priceBackpack = this.page.locator('[data-test="inventory-item"]')
      .filter({ hasText: 'Sauce Labs Backpack' });

    await this.expectVisible(this.nameBikeLight);
    await expect(priceBikeLight.locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');

    await this.expectVisible(this.nameBackpack);
    await expect(priceBackpack.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');

    const totalItemsText = await this.page.locator(this.shoppingCart).textContent()?? "";
    const totalItems = Number(totalItemsText.trim());

    expect(totalItems).toBe(2);
  }

  async removeBackpackItem():Promise<void> {
    await this.click(this.removeBackpackButton);
  }

  async validateAfterRemoveBackpack():Promise<void> {
    const priceBikeLight = this.page.locator('[data-test="inventory-item"]')
      .filter({ hasText: 'Sauce Labs Bike Light' });

    await this.expectVisible(this.nameBikeLight);
    await expect(priceBikeLight.locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');

    const totalItems = await this.itemInCart.count();
    expect(totalItems).toBe(1);
  }

  async proceedToCheckout():Promise<void> {
    await this.click(this.checkoutButton);
  }
}