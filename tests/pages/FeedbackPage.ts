import { Page, expect } from '@playwright/test';
import { BASE_URL, MAP_URL } from '../config/env';

export class FeedbackPage {

    readonly feedbackLink;
    readonly feedbackFormHeading;
    readonly feedbackCategoryRadioButton;
    readonly feedbacktaskDescriptionTextbox;
    readonly feedbackSatisfactionRadioButton;
    readonly feedbackImprovementTextbox;
    readonly feedbackContactTextbox;
    readonly feedbackFinishButton;
    readonly feedbackCompletionHeading;
    readonly backLink;

    constructor(private page: Page) {
        this.feedbackLink = this.page.getByRole('link', { name: 'give your feedback (opens in' });
        this.feedbackFormHeading = this.page.getByRole('heading', { name: 'Connectivity Tool Lite', exact: true });
        this.feedbackCategoryRadioButton = this.page.getByRole('radio', { name: 'Policy application' });
        this.feedbacktaskDescriptionTextbox = this.page.getByRole('textbox', { name: 'Question 2. Describe the task' });
        this.feedbackSatisfactionRadioButton = this.page.getByRole('radio', { name: 'Satisfied', exact: true });
        this.feedbackImprovementTextbox = this.page.getByRole('textbox', { name: 'Question 4. How could we' });
        this.feedbackContactTextbox = this.page.getByRole('textbox', { name: 'Question 5. If you wish to be' });
        this.feedbackFinishButton = this.page.getByRole('button', { name: 'Finish Survey' });
        this.feedbackCompletionHeading = this.page.getByRole('heading', { name: 'You have completed this' });
        this.backLink = this.page.getByRole('link', { name: 'Back' });
    }


    async navigate() {
        // await this.page.goto('https://connectivity-tool-lite-test.dft.gov.uk/index');
        await this.page.goto(BASE_URL);
    }

    async navigateToConnectivityToolMap() {
        // await this.page.goto('https://connectivity-tool-lite-test.dft.gov.uk/app#14/52.879/-0.47');
        await this.page.goto(MAP_URL);
    }

    async clickBackLink() {
        await this.backLink.click();
    }

    async clickFeedbackLink() {
        await this.feedbackLink.click();
        await expect(this.page).toHaveURL('https://www.smartsurvey.co.uk/s/ConnectivityToolLiteFeedback/');
    }

    async fillFeedbackForm() {
        await expect(this.feedbackFormHeading).toBeVisible();
        await this.feedbackCategoryRadioButton.click();
        await this.feedbacktaskDescriptionTextbox.fill('Test description');
        await this.feedbackSatisfactionRadioButton.check();
        await this.feedbackImprovementTextbox.fill('No suggestions');
        await this.feedbackContactTextbox.fill('Test contact');
        await this.feedbackFinishButton.click();
        await expect(this.feedbackCompletionHeading).toBeVisible();
        await this.page.bringToFront();
    }

    async closeTab() {
        await this.page.close();
    }
}
