import { test, expect } from '@playwright/test';
import { PersonalLoanPage } from '../../pages/PersonalLoanPage';
import { personalLoanData } from '../../utils/testData';
import { calculateEMI } from '../../utils/emiFormula';
import { appendDataToExcel } from '../../utils/excelUtils';

test.describe('Personal Loan Functional Testing', () => {

    for (const data of personalLoanData) {

        test('Validate Personal Loan EMI', async ({ page }) => {

            const personalLoan = new PersonalLoanPage(page);

            await personalLoan.openWebsite();

            await personalLoan.openPersonalLoanTab();

            await personalLoan.enterLoanDetails(
                data.loanAmount,
                data.interestRate,
                data.loanTenure
            );

            await page.waitForTimeout(2000);

            const emiText = await personalLoan.emiAmount.textContent();

            const websiteEMI = Number(
                emiText
                    ?.replace('₹', '')
                    .replace(/,/g, '')
                    .trim()
            );

            const expectedEMI =
                calculateEMI(
                    Number(data.loanAmount),
                    Number(data.interestRate),
                    Number(data.loanTenure)
                );

            expect(websiteEMI).toBeCloseTo(expectedEMI, 0);

            appendDataToExcel({
                LoanType: 'Personal Loan',

                LoanAmount: data.loanAmount,

                EMI: websiteEMI
                
            });

        });

    }

});