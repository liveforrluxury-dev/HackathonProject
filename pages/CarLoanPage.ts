import { Locator, Page } from "@playwright/test";

export class CarLoanPage {

    readonly page : Page;
    readonly carLoanTab : Locator;
    readonly loanAmountInput : Locator;
    readonly interestInput : Locator;
    readonly tenureInput : Locator;
    readonly emiAdvance : Locator;
    readonly emiArrears : Locator;
    readonly emiAmount : Locator;

    constructor( page : Page){
        this.page = page;
        this.carLoanTab = page.getByRole('link', {name : 'Car Loan'});
        this.loanAmountInput = page.locator('#loanamount');
        this.interestInput = page.locator('#loaninterest');
        this.tenureInput = page.locator('#loanterm');
        this.emiAdvance = page.getByLabel('EMI in Advance');
        this.emiArrears = page.getByLabel('EMI in Arrears');
        this.emiAmount = page.locator('#emiamount span');
    }

    async openWebsite() {
        await this.page.goto('/');
    }

    async openCarLoanTab() {
        await this.carLoanTab.click();
    }

    async enterLoanDetails(loan : string, intertest : string, tenure : string){
        await this.loanAmountInput.fill(loan);
        await this.interestInput.fill(intertest);
        await this.tenureInput.fill(tenure);
    }

    async getEMIValue(){
        const text = await this.emiAmount.textContent();

        return text;
    }
    
}