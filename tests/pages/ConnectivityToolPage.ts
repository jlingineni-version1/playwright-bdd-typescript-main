import { Page, expect } from '@playwright/test';

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
        // await this.page.waitForTimeout(60000); // Simple wait, can be replaced with more robust logic
        await this.page.waitForSelector('[data-testid="map-canvas"]', { state: 'visible' });
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
        // const isAorB = bandText?.match(\[A-C]) ? true : false;
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

    async navigateToMap() {
        await this.page.goto('https://connectivity-tool-lite-dev.dft.gov.uk/app#14/52.4948/-1.88139');
    }

    async searchLocation(location: string) {
        await this.searchComboBox.click();
        await this.searchComboBox.fill(location);
        // await this.page.getByRole('option', { name: 'location'}).click();
        // await this.page.press('searchComboBox','Enter');
        // const locationOption = this.page.getByRole('option', { name: location });
        // await locationOption.click();
        // Select the second item from the dropdown list 
        await this.page.locator('.app-site-search__option').nth(0).click();
        await this.page.waitForTimeout(8000);
    }

    async clickMapTilerLink() {
       
        const[popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.mapTilerLink.click(), // Opens a new tab
        ]);
        await popup.waitForLoadState();
    }

        async clickOpenStreetMapLink() {
            const[popup] = await Promise.all([
                this.page.waitForEvent('popup'),
                this.openStreetMapLink.click(), // Opens a new tab
            ]);
            await popup.waitForLoadState();
        }

    /*async clickMapTilerLink(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.mapTilerLink.click(), // Opens a new tab
        ]);
        await newPage.waitForLoadState();
        return newPage;
    } */


    /*async searchLocation(location: string) {
        const searchInput = this.page.locator('#app-site-search__input');
        await searchInput.click();
        await this.page.keyboard.type(location, { delay: 100 });
        await this.page.locator('.app-site-search__option').nth(0).click();
        await this.page.waitForTimeout(1500);
    }*/

    //     test.fail("Visual regression test - Services page", async ({ page }) => {
    //   await page.setViewportSize({ width: 1920, height: 1080 });
    //   const servicesPage = new ServicesPage(page);
    //   await servicesPage.navigateDirectlyToServicesUrl();
    //   expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
    //     "full-page-screenshot.png"
    //   );

}