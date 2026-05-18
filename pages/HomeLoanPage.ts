import { Page, Locator } from '@playwright/test';

export class HomeLoanPage {

    readonly page: Page;

    readonly homeLoanTab: Locator;

    readonly loanAmountInput: Locator;

    readonly interestRateInput: Locator;

    readonly loanTenureInput: Locator;

    readonly emiAmount: Locator;

    readonly totalInterest: Locator;

    readonly totalPayment: Locator;

    readonly pieChart: Locator;

    readonly tableRows: Locator;

    constructor(page: Page) {

        this.page = page;


        this.homeLoanTab = page.getByRole('link', { name: 'Home Loan' });

        this.loanAmountInput = page.locator('#loanamount');

        this.interestRateInput = page.locator('#loaninterest');

        this.loanTenureInput = page.locator('#loanterm');

        this.emiAmount = page.locator('#emiamount span');

        this.totalInterest = page.locator('#emitotalinterest span');

        this.totalPayment = page.locator('#emitotalamount span');

        this.pieChart = page.locator('svg');

        this.tableRows = page.locator('#emipaymenttable tbody tr');

    }

    async openWebsite() {
        await this.page.goto('/');
    }

    async enterLoanDetails( loanAmount: string, interestRate: string, loanTenure: string ) {

        await this.loanAmountInput.fill(loanAmount);

        await this.interestRateInput.fill(interestRate);

        await this.loanTenureInput.fill(loanTenure);

    }

    async getEMIValue() {

        const emiText = await this.emiAmount.textContent();

        return Number(
            emiText
                ?.replace('₹', '')
                .replace(/,/g, '')
                .trim()
        );

    }

    async getInterestValue() {
        return await this.totalInterest.textContent();
    }

    async getTotalPaymentValue() {
        return await this.totalPayment.textContent();
    }

}