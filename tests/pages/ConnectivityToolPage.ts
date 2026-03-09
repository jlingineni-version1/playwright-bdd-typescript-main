import { Page, expect } from '@playwright/test';
import { PopupHelper } from '../helpers/popUpHelper';
import { VisualSnapshotHelper } from '../helpers/visualSnapshot.helper';
import { MAP_URL } from '../config/env';

export class ConnectivityToolPage {
    private showButton;
    readonly localAuthorityViewCheckBox;
    readonly scoreByDestinationDropDown;
    readonly scoreByModeOfTransportDropDown;
    readonly filterMapHeader;
    readonly LocalAuthorityDropDown;
    readonly showAuthorityBandcheckBox;
    readonly zoomInButton;
    readonly mapCanvas;
    readonly connectivityScore;
    readonly localAuthorityBand;
    readonly searchComboBox;
    readonly mapTilerLink;
    readonly openStreetMapLink;
    readonly settingsLink;
    readonly opacitySlider;
    readonly opacityDisplay;
    readonly publicTransportShowLink;
    readonly showPublicTrasportHeading;
    readonly zoomOutButton;
    readonly govUKLink;

    constructor(private page: Page) {
        this.filterMapHeader = this.page.getByRole('heading', { name: 'Filter map' });
        this.showButton = this.page.getByText('Show', { exact: true }).first();
        this.publicTransportShowLink = this.page.getByText('Show', { exact: true }).last();
        this.localAuthorityViewCheckBox = this.page.getByRole('checkbox', { name: 'Local authority view' });
        this.scoreByDestinationDropDown = this.page.getByLabel('Score by destination');
        this.scoreByModeOfTransportDropDown = this.page.getByLabel('Score by mode of transport');
        this.showAuthorityBandcheckBox = this.page.getByRole('checkbox', { name: 'Show authority band' });
        this.LocalAuthorityDropDown = this.page.getByTestId('localAuthority');
        this.zoomInButton = this.page.getByRole('button', { name: 'Zoom in' });
        this.mapCanvas = this.page.getByTestId('map-canvas');
        this.connectivityScore = this.page.locator('.score-box').first();
        this.localAuthorityBand = this.page.locator('.score-box').last();
        this.searchComboBox = this.page.getByRole('combobox', { name: 'Search by coordinates, street' });
        this.mapTilerLink = this.page.getByRole('link', { name: 'MapTiler' });
        this.openStreetMapLink = this.page.getByRole('link', { name: 'OpenStreetMap contributors' });
        this.settingsLink = this.page.getByRole('link', { name: 'Settings' });
        this.opacitySlider = this.page.getByTestId('opacity');
        this.opacityDisplay = this.page.getByTestId('map-opacity');
        this.zoomOutButton = this.page.getByRole('button', { name: 'Zoom out' });
        this.showPublicTrasportHeading = page.getByRole('heading', { name: 'Show public transport stops' });
        this.govUKLink = this.page.locator('a:has(img[alt="GOV.UK"])');
    }

    async clickGovUKLink() {
        return await PopupHelper.clickAndWaitForPopup(
            this.page,
            this.govUKLink
        );
    }

    async clickSettingsLink() {
        await this.settingsLink.click();
    }

    async clickZoomOut() {
        await this.zoomOutButton.click();
    }

    async selectOpacitySlider(percentage: string) {
        await this.opacitySlider.fill(percentage);
        await this.page.waitForTimeout(30000);
    }

    async verifyFilterMapHeader() {
        await expect(this.filterMapHeader).toBeVisible();
        await expect(this.filterMapHeader).toHaveText('Filter map');
    }

    async waitForMapToLoad() {
        // Ensure map container and canvas are visible 
        await this.page.waitForSelector('[data-testid="map"]', { state: 'visible' });
        await this.page.waitForSelector('[data-testid="map-canvas"]', { state: 'visible' });
        // Wait for the 'data-map-tiles-loaded="true"' attribute to be set on the map element 
        await this.page.waitForFunction(
            () => {
                const mapElement = document.querySelector('[data-testid="map"]');
                return mapElement?.getAttribute('data-map-tiles-loaded') === 'true';
            }, { timeout: 100000 } // You can adjust the timeout duration as needed );
        );

        // Network should be idle once tiles loaded 
        await this.page.waitForLoadState('networkidle');

        // Confirm canvas has non-zero size 
        await this.page.waitForFunction(() => {
            const canvas = document.querySelector('[data-testid="map-canvas"]') as HTMLCanvasElement | null;
            return !!canvas && canvas.width > 0 && canvas.height > 0;
        });
    }

    async refreshPage() {
        await this.waitForMapToLoad();
        // Reload the page and wait until network is idle
        await this.page.reload({ waitUntil: 'networkidle' });
        // Ensure the map canvas has re-rendered and is visible
        await this.waitForMapToLoad();
    }

    async waitForMapToReload() {
        // Legacy helper retained for compatibility; prefer waitForMapToLoad after reload
        await this.page.waitForTimeout(8000);
    }

    async selectLocalAuthorityView() {
        await this.localAuthorityViewCheckBox.check();
    }

    async checkPublicTransport(publicTransport: string) {
        if (publicTransport.includes('Tram Tram') || publicTransport.includes('Ferry')) {
            await this.clickZoomOut();
            await this.clickZoomOut();
        }
        const transport = await this.page.getByRole('checkbox', { name: `Icon for ${publicTransport}` })
        await transport.check();
        // await this.page.waitForTimeout(8000);
    }

    async clickPublicTransportShowLink() {
        await this.publicTransportShowLink.click();
    }

    async selectScoreByDestination(destination: string) {
        await this.scoreByDestinationDropDown.selectOption(destination);
    }

    async selectScoreByModeOfTransport(mode: string) {
        await this.scoreByModeOfTransportDropDown.selectOption(mode);
    }

    async clickShowButton() {
        await this.showButton.click();
    }

    async selectLocalAuthority(authority: string) {
        await this.LocalAuthorityDropDown.selectOption(authority);
        // await this.page.waitForTimeout(1000);
    }

    async selectShowAuthorityBand() {
        await this.showAuthorityBandcheckBox.check();
    }

    async clickZoomInButton() {
        await this.zoomInButton.click();
    }

    async clickMapAtPosition(x: number, y: number) {
        await this.mapCanvas.click({
            position: {
                x: x,
                y: y
            }
        });
    }

    async verifyConnectivityScore() {
        await expect(this.connectivityScore).toBeVisible();
        const scoreText = await this.connectivityScore.textContent();
        console.log('Connectivity Score:', scoreText);
        const isRedColor = Number(scoreText) >= 80 ? true : false;
        expect(isRedColor).toBeTruthy();
    }

    async verifyConnectivityScorefordifferentlocations(expectedScore: string) {
        await expect(this.connectivityScore).toBeVisible();
        console.log('Expected Score:', expectedScore);
        console.log('Type of Expected Score:', typeof expectedScore);
        const scoreText = await this.connectivityScore.textContent();
        console.log('Connectivity Score:', scoreText);
        const expectedScoreNumber = Number(expectedScore);
        console.log('Expected Score Number:', expectedScoreNumber);
        const isRedColor = Number(scoreText) === expectedScoreNumber ? true : false;
        expect(isRedColor).toBeTruthy();
    }

    async verifyLocalAuthorityBand() {
        await expect(this.localAuthorityBand).toBeVisible();
        const bandText = await this.localAuthorityBand.textContent();
        console.log('Local Authority Band:', bandText);
        const isAorB = /[ABC]/.test(bandText ?? '')
        expect(isAorB).toBeTruthy();
    }

    async verifyLocalAuthorityBandForDIfferentLocations(expectedBand: string) {
        await expect(this.localAuthorityBand).toBeVisible();
        const bandText = await this.localAuthorityBand.textContent();
        console.log('Local Authority Band:', bandText);
        const expectedBandRegex = new RegExp(expectedBand);
        console.log('Expected Band Regex:', expectedBandRegex);
        // const isAorB = bandText?.match(\[A-C]) ? true : false;
        const isAorB = expectedBandRegex.test(bandText ?? '')
        expect(isAorB).toBeTruthy();
    }

    async verifyVisualRegessionOfMap(filename: string) {
        const screenshot = await this.page.screenshot();
        await VisualSnapshotHelper.compareScreenshot(screenshot, filename || 'connectivity-tool-map');
    }

    async takeScreenshot(): Promise<Buffer> {
        return await this.page.screenshot();
    }

    // Method to take screenshot of the canvas element
    async takeCanvasScreenshot(): Promise<Buffer> {
        return await this.mapCanvas.screenshot();
    }

    async navigateToMap() {
        // await this.page.goto('https://connectivity-tool-lite-dev.dft.gov.uk/app#14/52.4948/-1.88139');
        await this.page.goto(MAP_URL);
    }

    async searchLocation(location: string) {
        await this.searchComboBox.click();
        await this.searchComboBox.fill(location);
        // Select the second item from the dropdown list 
        await this.page.locator('.app-site-search__option').nth(0).click();
        await this.page.waitForTimeout(8000);
    }

    // async searchByLatitudeAndLongitude(latitude: number, longitude: number) {
    //     const location = `${latitude},${longitude}`;
    //     await this.searchComboBox.click();
    //     await this.searchComboBox.fill(location);
    //    // Select the second item from the dropdown list 
    //     await this.page.locator('.app-site-search__option').nth(0).click();
    //     await this.page.waitForTimeout(8000);
    //     await this.waitForMapToLoad();
    // }

    async clickMapTilerLink(): Promise<Page> {
        return await PopupHelper.clickAndWaitForPopup(
            this.page,
            this.mapTilerLink
        );
    }

    async clickOpenStreetMapLink(): Promise<Page> {
        return await PopupHelper.clickAndWaitForPopup(
            this.page,
            this.openStreetMapLink
        );
    }
}