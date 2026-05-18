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

    readonly tableRows: Locator;

    readonly excelButton: Locator;



    constructor(page: Page) {

        this.page = page;


        this.homeLoanTab = page.getByRole('link', { name: 'Home Loan' });

        this.loanAmountInput = page.locator('#loanamount');

        this.interestRateInput = page.locator('#loaninterest');

        this.loanTenureInput = page.locator('#loanterm');

        this.emiAmount = page.locator('#emiamount span');

        this.totalInterest = page.locator('#emitotalinterest span');

        this.totalPayment = page.locator('#emitotalamount span');

        this.tableRows = page.locator('#emipaymenttable table tbody tr');

        this.excelButton = page.getByTitle("Download Excel Spreadsheet");

    }

    async openWebsite() {
        await this.page.goto('/');
    }

    async enterLoanDetails(loanAmount: string, interestRate: string, loanTenure: string) {

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

    async getFirstRowTableData() {

        // Wait for table visible
        await this.page.waitForSelector('#emipaymenttable table tbody tr');

        // Get first actual data row
        const firstRow = this.tableRows.nth(1);

        // Get all cells
        const cells = await firstRow.locator('td').allTextContents();

        return cells;

    }
}