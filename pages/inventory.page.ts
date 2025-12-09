import { Page, expect } from '@playwright/test';
import { BasePage } from '../basepage';

export class InventoryPage extends BasePage {
  private shoppingCart = '#shopping_cart_container';
  private burgerMenuBtn = '#react-burger-menu-btn';
  private inventoryList = '[data-test="inventory-list"]';
  private inventoryItem = '[data-test="inventory-item"]';
  private itemName = '[data-test="inventory-item-name"]';
  private itemImg = '.inventory_item_img img';
  private itemPrice = '[data-test="inventory-item-price"]';
  private addToCartBtn = 'button[data-test^="add-to-cart"]';
  private sortingDropdown = '[data-test="product-sort-container"]';

  constructor(page: Page) {
    super(page);
  }

  async validateInventoryPage(): Promise<void> {
    await this.expectVisible(this.shoppingCart);
    await this.expectVisible(this.burgerMenuBtn);
  }

  async validateInventoryListLoadedCorrectly(): Promise<void> {
    await this.expectVisible(this.inventoryList);

    const list = this.page.locator(this.inventoryList);
    const items = list.locator(this.inventoryItem);
    const count = await items.count();

    expect(count).toBeGreaterThan(0);

    let validItemFound = false;

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);

      const hasName  = await item.locator(this.itemName).isVisible();
      const hasImg   = await item.locator(this.itemImg).isVisible();
      const hasPrice = await item.locator(this.itemPrice).isVisible();
      const hasAddBtn = await item.locator(this.addToCartBtn).isVisible();

      if (hasName && hasImg && hasPrice && hasAddBtn) {
        validItemFound = true;
        break;
      }
    }

    expect(validItemFound, "No valid item found in inventory list").toBeTruthy();
  }

  async selectSort(option: string): Promise<void> {
    await this.selectDropdown(this.sortingDropdown, option);
  }

  async getAllItemNames(): Promise<string[]> {
    const items = this.page.locator(this.itemName);
    return await items.allInnerTexts();
  }

  async getAllItemPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator(this.itemPrice).allInnerTexts();
    return priceTexts.map(p => Number(p.replace("$", "").trim()));
  }

  async validateSorting(type: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {

    if (type === 'az') {
      const actual = await this.getAllItemNames();
      const expected = [...actual].sort((a, b) => a.localeCompare(b));
      expect(actual).toEqual(expected);
    }

    if (type === 'za') {
      const actual = await this.getAllItemNames();
      const expected = [...actual].sort((a, b) => b.localeCompare(a));
      expect(actual).toEqual(expected);
    }

    if (type === 'lohi') {
      const actual = await this.getAllItemPrices();
      const expected = [...actual].sort((a, b) => a - b);
      expect(actual).toEqual(expected);
    }

    if (type === 'hilo') {
      const actual = await this.getAllItemPrices();
      const expected = [...actual].sort((a, b) => b - a);
      expect(actual).toEqual(expected);
    }
  }

  async waitForLoaded(): Promise<void> {
    await this.expectVisible(this.inventoryList);
  }

  async countItems(): Promise<number> {
    const items = await this.page.locator(this.itemName).count();

    await this.assertThat('Validate item count > 0', async () => {
      expect(items).toBeGreaterThan(0);
    });

    return items;
  }
}