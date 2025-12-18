import { Page, expect } from '@playwright/test';
import { BASE_URL, MAP_URL, Accesibility_URL, Private_Policy_URL, Guidance_URL, Understand_Data_URL } from '../config/env';

export class HomePage {
    private exploreConnectivityToolLink;
    readonly pageTitle;
    readonly accessibilityLink;
    readonly accessibilityHeading;
    readonly privatePolicyLink;
    readonly privacyPolicyHeading;
    readonly guidanceLink;
    readonly guidanceHeading;
    readonly guidanceClickableLink;
    readonly understandDataLink;
    readonly understandDataHeading;
    readonly feedbackLink;
    readonly backLink;

    constructor(private page: Page) {
        this.pageTitle = this.page.getByRole('heading', { name: 'Discover connectivity in your local area' });
        this.exploreConnectivityToolLink = this.page.getByRole('link', { name: 'Explore the Connectivity Tool' });
        this.accessibilityLink = this.page.getByRole('link', { name: 'Accessibility statement' });
        this.accessibilityHeading = this.page.getByRole('heading', { name: 'Accessibility statement', exact: true });
        this.backLink = this.page.getByRole('link', { name: 'Back', exact: true });
        this.privatePolicyLink = this.page.getByRole('link', { name: 'Privacy policy' });
        this.privacyPolicyHeading = this.page.getByRole('heading', { name: 'Privacy policy' });
        this.guidanceLink = this.page.getByRole('contentinfo').getByRole('link', { name: 'Guidance' });
        this.guidanceHeading = this.page.getByRole('heading', { name: 'Connectivity Tool Lite User' });
        this.guidanceClickableLink = this.page.getByRole('navigation').getByRole('link', { name: 'Guidance' });
        this.understandDataLink = this.page.getByRole('link', { name: 'Understand the data' });
        this.understandDataHeading = this.page.getByRole('heading', { name: 'Understand The Data' });
        this.feedbackLink = this.page.getByRole('link', { name: 'give your feedback (opens in' });
    }

    async navigate() {
        // await this.page.goto('https://connectivity-tool-lite-test.dft.gov.uk/index');
        await this.page.goto(BASE_URL);
    }

    async navigateToConnectivityToolMap() {
        // await this.page.goto('https://connectivity-tool-lite-test.dft.gov.uk/app#14/52.879/-0.47');
        await this.page.goto(MAP_URL);
    }

    async clickConnectivityToolLink() {
        await this.exploreConnectivityToolLink.click();
    }

    async verifyPageTitle() {
        await expect(this.pageTitle).toBeVisible();
    }

    async clickAccessibilityLink() {
        await this.accessibilityLink.click();
    }

    async verifyAccessibilityPage() {
        await expect(this.accessibilityHeading).toBeVisible();
    }

    async clickBackLink() {
        await this.backLink.click();
    }

    async clickPrivacyPolicyLink() {
        await this.privatePolicyLink.click();
    }

    async verifyAccessibilityPageURL() {
        // await expect(this.page).toHaveURL('https://connectivity-tool-lite-test.dft.gov.uk/help/accessibility-statement');
        await expect(this.page).toHaveURL(Accesibility_URL);
    }

    async verifyPrivacyPolicyPage() {
        await expect(this.privacyPolicyHeading).toBeVisible();
    }

    async verifyPrivacyPolicyPageURL() {
        // await expect(this.page).toHaveURL('https://connectivity-tool-lite-test.dft.gov.uk/help/privacy-policy');
        await expect(this.page).toHaveURL(Private_Policy_URL);
    }
    async clickGuidanceLink() {
        await this.guidanceLink.click();
    }

    async verifyGuidancePage() {
        await expect(this.guidanceHeading).toBeVisible();
    }

    async clickGuidanceClickableLink() {
        await this.guidanceClickableLink.click();
    }

    async verifyGuidancePageURL() {
        // await expect(this.page).toHaveURL('https://connectivity-tool-lite-test.dft.gov.uk/help/guidance');
        await expect(this.page).toHaveURL(Guidance_URL);
    }
    async clickUnderstandDataLink() {
        await this.understandDataLink.click();
    }

    async verifyUnderstandDataPage() {
        await expect(this.understandDataHeading).toBeVisible();
    }

    async verifyUnderstandDataPageURL() {
        // await expect(this.page).toHaveURL('https://connectivity-tool-lite-test.dft.gov.uk/help/understand-the-data');
        await expect(this.page).toHaveURL(Understand_Data_URL);
    }

    async clickFeedbackLink(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.feedbackLink.click(), // adjust selector 
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }
}
