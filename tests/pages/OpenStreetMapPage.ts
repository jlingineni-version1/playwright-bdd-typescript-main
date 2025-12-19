import { Page, expect } from '@playwright/test';

export class OpenStreetMapPage {

    readonly openStreetMapHeading;

    constructor(private page: Page) {
        this.openStreetMapHeading = page.locator("h1", { hasText: "Copyright and License" });
    }

    async verifyOpenStreetMapHeading() {
        // The MapTiler link opens in a new popup/tab. Find the popup page in the context
        const pages = this.page.context().pages();
        const popup = pages.find(p => {
            try {
                return p.url().includes('openstreetmap.org');
            } catch (e) {
                return false;
            }
        });

        if (!popup) {
            throw new Error('OpenStreetMap popup/page was not opened');
        }

        await popup.waitForLoadState();
        await expect(popup).toHaveURL(/https?:\/\/(www\.)?openstreetmap\.org/);
        const heading = popup.locator("h1", { hasText: "Copyright and License" });
        await expect(heading).toBeVisible();
    }

    async closeTab() {
        // Close the MapTiler popup if present, do not close the main test page
        const pages = this.page.context().pages();
        const popup = pages.find(p => {
            try {
                return p.url().includes('openstreetmap.org');
            } catch (e) {
                return false;
            }
        });
        if (popup) {
            await popup.close();
        }
    }
    

}
