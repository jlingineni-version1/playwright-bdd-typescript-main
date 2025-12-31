import { Page, Locator } from '@playwright/test';

export class NavigationHelper {
  private backLink: Locator;

  constructor(page: Page) {
    this.backLink = page.getByRole('link', { name: 'Back', exact: true }); // update selector if needed
  }

  async clickBackLink(): Promise<void> {
    await this.backLink.click();
  }
}
