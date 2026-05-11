import { Page } from "@playwright/test";

export class BasePage {

    constructor(private page : Page){}

    navigateToHome(){
        return this.page.goto("https://www.hdfc.bank.in/");
    }

}