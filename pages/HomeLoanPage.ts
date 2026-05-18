import { expect, Locator, Page } from "@playwright/test";

export class HomeLoanPage {

    readonly page : Page;
    readonly homeLoanTab : Locator;
    readonly loanAmountInput : Locator;
    readonly interestInput : Locator;
    readonly tenureInput : Locator;
    readonly emiAmount : Locator;
    readonly totalInterest : Locator;
    readonly totalAmount : Locator;
    readonly pieChart  :Locator;
    readonly tableRows : Locator;

    constructor(page : Page){
        this.page = page;
        this.homeLoanTab = page.getByRole('link', {name: 'Home Loan'});
        this.loanAmountInput = page.locator('#loanamount');
        this.interestInput = page.locator('#loaninterest');
        this.tenureInput = page.locator('#loanterm');
        this.emiAmount = page.locator('#emiamount span');
        this.totalInterest = page.locator('#emaitotalinterest span');
        this.totalAmount = page.locator('#emaitotalamount span');
        this.pieChart = page.locator('svg');
        this.tableRows = page.locator('#emipaymenttable tbody tr');
    }

    async openWebsite(){
        await this.page.goto('/');``
    }

    async enterLoanDetails(loan: string, interest: string, tenure: string){
        await this.loanAmountInput.fill(loan);
        await this.interestInput.fill(interest);
        await this.tenureInput.fill(tenure);
    }

    async getEMIValue(){
        const text = await this.emiAmount.textContent();
        
        return Number(
            text
            ?.replace('₹', '')
            .replace(/,/g, '')
            .trim()
        );
    }

    async validatePieChart(){
        await expect(this.pieChart).toBeVisible();
    }

    async validateTable() {
        await expect(this.tableRows).toHaveCount(20);
    }
}