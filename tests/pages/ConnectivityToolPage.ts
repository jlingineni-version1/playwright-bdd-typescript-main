import { Page, expect } from '@playwright/test';
import { PopupHelper } from '../helpers/popUpHelper';

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

    constructor(private page: Page) {
        this.filterMapHeader = this.page.getByRole('heading', { name: 'Filter map' });
        this.showButton = this.page.getByText('Show', { exact: true }).first();
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
    }

    async verifyFilterMapHeader() {
        await expect(this.filterMapHeader).toBeVisible();
        await expect(this.filterMapHeader).toHaveText('Filter map');

    }

    async waitForMapToLoad() {
        await this.page.waitForSelector('[data-testid="map-canvas"]', { state: 'visible' });
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForFunction(() => {
            const canvas = document.querySelector('canvas');
            return canvas && canvas.width > 0 && canvas.height > 0;
        });
    }

    async waitForMapToReload() {
        await this.page.waitForTimeout(60000); // Simple wait, can be replaced with more robust logic
    }

    async selectLocalAuthorityView() {
        await this.localAuthorityViewCheckBox.check();
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
        await this.page.waitForTimeout(1000);
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
        const isRedColor = Number(scoreText) >= Number(expectedScore) ? true : false;
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
        expect(await this.page.screenshot()).toMatchSnapshot('connectivity-tool-map-chromium-win32-chromium-win32.png');
    }

    async takeScreenshot(): Promise<Buffer> {
        return await this.page.screenshot();
    }

    // Method to take screenshot of the canvas element
    async takeCanvasScreenshot(filePath: string): Promise<Buffer> {
        return await this.mapCanvas.screenshot({ path: filePath });
    }

    async navigateToMap() {
        await this.page.goto('https://connectivity-tool-lite-dev.dft.gov.uk/app#14/52.4948/-1.88139');
    }

    async searchLocation(location: string) {
        await this.searchComboBox.click();
        await this.searchComboBox.fill(location);
        // Select the second item from the dropdown list 
        await this.page.locator('.app-site-search__option').nth(0).click();
        await this.page.waitForTimeout(8000);
    }


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