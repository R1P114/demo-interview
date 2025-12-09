import { Page, expect, test } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  private async stepWithScreenshot(name: string, action: () => Promise<void>) {
    await test.step(name, async () => {
      try {
        await action();
      } finally {
        const screenshot = await this.page.screenshot();
        await test.info().attach(name, {
          body: screenshot,
          contentType: 'image/png',
        });
      }
    });
  }

  async assertThat(name: string, assertion: () => void | Promise<void>) {
    await test.step(name, async () => {
      await assertion();
      const screenshot = await this.page.screenshot();
      await test.info().attach(name, {
        body: screenshot,
        contentType: 'image/png',
      });
    });
  }

  async navigate(url: string): Promise<void> {
    await this.stepWithScreenshot(`Navigate to ${url}`, async () => {
      await this.page.goto(url);
    });
  }

  async click(selector: string): Promise<void> {
    await this.stepWithScreenshot(`Click: ${selector}`, async () => {
      await this.page.locator(selector).click();
    });
  }

  async sendkeys(selector: string, text: string): Promise<void> {
    await this.stepWithScreenshot(`Type into ${selector}: "${text}"`, async () => {
      await this.page.locator(selector).fill(text);
    });
  }

  async expectVisible(selector: string): Promise<void> {
    await this.stepWithScreenshot(`Expect visible: ${selector}`, async () => {
      await expect(this.page.locator(selector)).toBeVisible();
    });
  }

  async expectText(selector: string, text: string): Promise<void> {
    await this.stepWithScreenshot(`Expect text "${text}" in ${selector}`, async () => {
      await expect(this.page.locator(selector)).toHaveText(text);
    });
  }

  async getText(selector: string): Promise<string[]> {
    let data: string[] = [];
    await this.stepWithScreenshot(`Get text list: ${selector}`, async () => {
      data = await this.page.locator(selector).allTextContents();
    });
    return data;
  }

  async selectDropdown(selector: string, value: string): Promise<void> {
    await this.stepWithScreenshot(`Select dropdown ${selector} => ${value}`, async () => {
      await this.page.locator(selector).selectOption(value);
    });
  }
}