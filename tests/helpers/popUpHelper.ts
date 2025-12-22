import { Page, Locator } from '@playwright/test';

export class PopupHelper {
  static async clickAndWaitForPopup(
    page: Page,
    link: Locator
  ): Promise<Page> {

    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      link.click(), // opens new tab
    ]);

    await popup.waitForLoadState();
    return popup;
  }
}