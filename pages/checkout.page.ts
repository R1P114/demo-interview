import { Page, expect } from '@playwright/test';
import { BasePage } from '../basepage';

export class CheckoutPage extends BasePage {
  private firstName = '[data-test="firstName"]';
  private lastName = '[data-test="lastName"]';
  private postalCode = '[data-test="postalCode"]';
  private continueBtn = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';
  private itemTotal = '[data-test="subtotal-label"]';
  private tax = '[data-test="tax-label"]';
  private total = '[data-test="total-label"]';
  private completeHeader = '[data-test="complete-header"]';
  private completeText = '[data-test="complete-text"]';

  constructor(page: Page) {
    super(page);
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.sendkeys(this.firstName, firstName);
    await this.sendkeys(this.lastName, lastName);
    await this.sendkeys(this.postalCode, postalCode);
    await this.click(this.continueBtn);
  }

  async validateTotals(expectedSubtotal: number, expectedTax: number) {
    const subtotalText = await this.page.locator(this.itemTotal).textContent();
    const taxText = await this.page.locator(this.tax).textContent();
    const totalText = await this.page.locator(this.total).textContent();

    const subtotal = Number(subtotalText?.replace('Item total: $', '').trim());
    const tax = Number(taxText?.replace('Tax: $', '').trim());
    const totalAmount = Number(totalText?.replace('Total: $', '').trim());

    await expect(this.page.locator(this.itemTotal)).toHaveText(`Item total: $${expectedSubtotal}`);
    await expect(this.page.locator(this.tax)).toHaveText(`Tax: $${expectedTax.toFixed(2)}`);
    await expect(this.page.locator(this.total)).toHaveText(`Total: $${(expectedSubtotal + expectedTax).toFixed(2)}`);

    await this.assertThat('Validate subtotal', async () => expect(subtotal).toBeCloseTo(expectedSubtotal));
    await this.assertThat('Validate tax', async () => expect(tax).toBeCloseTo(expectedTax));
    await this.assertThat('Validate total', async () => expect(totalAmount).toBeCloseTo(expectedSubtotal + expectedTax));
  }

  async finishCheckout() {
    await this.click(this.finishButton);
  }

  async validateOrderCompleted() {
    await this.assertThat('Validate order complete message', async () => {
      await expect(this.page.locator(this.completeHeader)).toHaveText('Thank you for your order!');
    });

    await this.assertThat('Validate order description message', async () => {
      await expect(this.page.locator(this.completeText)).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });
  }
}
