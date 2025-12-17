import { Page, expect } from '@playwright/test';

export class CurrentSelectionPage {
    readonly currentSelectionTilte;
    readonly squreID;
    readonly localAuthorities;
    readonly latitude;
    readonly longitude;

    constructor(private page: Page) {
        this.currentSelectionTilte = this.page.getByRole('heading', { name: 'Current selection' });
        this.squreID = this.page.locator('.govuk-summary-list__value').nth(0);
        this.localAuthorities = this.page.locator('.govuk-summary-list__value').nth(1);
        this.latitude = this.page.locator('.govuk-summary-list__value').nth(2);
        this.longitude = this.page.locator('.govuk-summary-list__value').nth(3);
    }

    async verifyCurrentSelection(expectedCs_latitude: number, expectedCs_longitude: number, expectedLocation: string, expectedSquareID: string) {
        await expect(this.currentSelectionTilte).toBeVisible();
        const actualsquareID = await this.squreID.textContent();
        console.log('SquareID :', actualsquareID);
        const actualLocation = await this.localAuthorities.textContent();
        console.log('LocalAuthorities:', actualLocation);
        const actualLatitudeText = await this.latitude.textContent();
        console.log('Latitude:', actualLatitudeText);
        const actualLongitudeText = await this.longitude.textContent();
        console.log('Longitude:', actualLongitudeText);
        const expectedLocationText = `${expectedLocation}Greater London`;

        //  const actualSquareID = Number(await this.squreID.textContent())?.trim();
        const actualLatitude = Number((await this.latitude.textContent())?.trim());
        const actualLongitude = Number((await this.longitude.textContent())?.trim())
        expect(actualsquareID).toBe(expectedSquareID);
        expect(actualLocation).toContain(expectedLocation);
        expect(actualLatitude).toBeCloseTo(expectedCs_latitude);
        expect(actualLongitude).toBeCloseTo(expectedCs_longitude);
    }
}