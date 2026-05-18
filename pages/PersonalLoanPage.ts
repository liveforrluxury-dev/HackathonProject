import { Page, Locator }
from '@playwright/test';

export class PersonalLoanPage {

    readonly page: Page;

    readonly personalLoanTab: Locator;

    readonly loanAmountInput: Locator;

    readonly interestInput: Locator;

    readonly tenureInput: Locator;

    readonly emiAmount: Locator;

    readonly totalInterest: Locator;

    readonly totalPayment: Locator;

    constructor(page: Page) {

        this.page = page;

        this.personalLoanTab = page.getByRole('link', { name: 'Personal Loan' });

        this.loanAmountInput = page.locator('#loanamount');

        this.interestInput = page.locator('#loaninterest');

        this.tenureInput = page.locator('#loanterm');

        this.emiAmount = page.locator('#emiamount span');

        this.totalInterest = page.locator('#emitotalinterest span');

        this.totalPayment = page.locator('#emitotalamount span');
    }

    async openWebsite() {
        await this.page.goto('/');
    }

    async openPersonalLoanTab() {
        await this.personalLoanTab.click();
    }

    async enterLoanDetails(loan: string,interest: string,tenure: string) {

        await this.loanAmountInput.fill(loan);

        await this.interestInput.fill(interest);

        await this.tenureInput.fill(tenure);

    }

}