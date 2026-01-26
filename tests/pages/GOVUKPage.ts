import { Page, expect } from '@playwright/test';

export class GOVUKPage {

    readonly govUKHeading;

    constructor(private page: Page) {
        this.govUKHeading = this.page.locator('svg[aria-label="GOV.UK"]');
    }

    async verifyGovUKHeading() {
        // Assume `this.page` is the GOV.UK popup page. Verify it directly.
        await this.page.waitForLoadState();
        await expect(this.page).toHaveURL(/https?:\/\/(www\.)?gov\.uk\/?/);
        await expect(this.govUKHeading).toBeVisible();
    }

    async closeTab() {
        // Close the page instance associated with this GOV.UK helper
        try {
            await this.page.close();
        } catch (e) {
            // ignore if already closed
        }
    }

}
