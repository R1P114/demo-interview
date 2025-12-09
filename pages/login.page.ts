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