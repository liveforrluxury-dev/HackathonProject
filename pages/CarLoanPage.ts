import { Locator, Page } from "@playwright/test";

export class CarLoanPage {

    readonly page: Page;

    readonly carLoanTab: Locator;

    readonly loanAmountInput: Locator;

    readonly interestInput: Locator;

    readonly tenureInput: Locator;

    readonly emiInAdvanceRadio: Locator;

    readonly emiInArrearsRadio: Locator;

    readonly emiAmount: Locator;

    constructor(page: Page) {

        this.page = page;

        this.carLoanTab = page.getByRole('link', { name: 'Car Loan' });

        this.loanAmountInput = page.locator('#loanamount').first();

        this.interestInput = page.locator('#loaninterest').first();

        this.tenureInput = page.locator('#loanterm').first();

        this.emiInAdvanceRadio = page.getByText('EMI in Advance').first();

        this.emiInArrearsRadio = page.getByText('EMI in Arrears').first();

        this.emiAmount = page.locator('#emiamount span').first();

    }

    async openWebsite() {
        await this.page.goto('/');
    }

    async openCarLoanTab() {

        await this.carLoanTab.click();

        await this.page.waitForTimeout(3000);

    }

    async enterLoanDetails( loan: string, interest: string, tenure: string ) {

        await this.loanAmountInput.clear();

        await this.loanAmountInput.fill(loan);

        await this.interestInput.clear();

        await this.interestInput.fill(interest);

        await this.tenureInput.clear();

        await this.tenureInput.fill(tenure);

    }

    async selectEMIInArrears() {

        await this.emiInArrearsRadio.click();

        await this.page.waitForTimeout(2000);

    }

    async selectEMIInAdvance() {

        await this.emiInAdvanceRadio.click();

        await this.page.waitForTimeout(2000);

    }

    async getEMIValue() {

        const text = await this.emiAmount.textContent();

        return text
            ?.replace('₹', '')
            .replace(/,/g, '')
            .trim();

    }

}