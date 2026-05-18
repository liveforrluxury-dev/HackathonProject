import { test, expect } from '@playwright/test'
import { homeLoanData } from '../../utils/testData'
import { HomeLoanPage } from '../../pages/HomeLoanPage'
import { calculateEMI } from '../../utils/emaiFormula'

test.describe('Home Loan Tests', () => {

    for(const data of homeLoanData) {

        test(`Validate EMI for ${data.loan}`, async ({page}) => {

            const homePage = new HomeLoanPage(page);

            await homePage.openWebsite();

            await homePage.enterLoanDetails(data.loan, data.interest, data.tenure);

            await page.waitForTimeout(2000);

            const websiteEMI = await homePage.getEMIValue();

            const expectedEMI = calculateEMI(Number(data.loan), Number(data.interest), Number(data.tenure));

            expect(websiteEMI).toBeCloseTo(expectedEMI, 0);
        });
    }
})