import { Page, expect } from '@playwright/test';

export class MapTilePage {

    readonly mapTilerHeading;

    constructor(private page: Page) {
        this.mapTilerHeading = this.page.getByRole('heading', { name: 'MapTiler Maps API' });
    }

    async verifyMapTilerHeading() {
        // The MapTiler link opens in a new popup/tab. Find the popup page in the context
        const pages = this.page.context().pages();
        const popup = pages.find(p => {
            try {
                return p.url().includes('maptiler.com');
            } catch (e) {
                return false;
            }
        });

        if (!popup) {
            throw new Error('MapTiler popup/page was not opened');
        }

        await popup.waitForLoadState();
        await expect(popup).toHaveURL(/https?:\/\/(www\.)?maptiler\.com/);
        const heading = popup.getByRole('heading', { name: 'MapTiler Maps API' });
        await expect(heading).toBeVisible();
    }

    async closeTab() {
        // Close the MapTiler popup if present, do not close the main test page
        const pages = this.page.context().pages();
        const popup = pages.find(p => {
            try {
                return p.url().includes('maptiler.com');
            } catch (e) {
                return false;
            }
        });
        if (popup) {
            await popup.close();
        }
    }

}
