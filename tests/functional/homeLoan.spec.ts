import { test, expect } from '@playwright/test';
import { HomeLoanPage } from '../../pages/HomeLoanPage';
import { calculateEMI } from '../../utils/emiFormula';
import { homeLoanData } from '../../utils/testData';
import { appendDataToExcel } from '../../utils/excelUtils';

test.describe('Home Loan Functional Testing', () => {

    for (const data of homeLoanData) {

        test(`Validate EMI Calculation for Loan ${data.loanAmount}`, async ({ page }) => {

            const homeLoanPage = new HomeLoanPage(page);

            await homeLoanPage.openWebsite();

            await homeLoanPage.enterLoanDetails(data.loanAmount, data.interestRate, data.loanTenure);

            await page.waitForTimeout(2000);

            const websiteEMI = await homeLoanPage.getEMIValue();

            const expectedEMI =

                calculateEMI(

                    Number(data.loanAmount),
                    Number(data.interestRate),
                    Number(data.loanTenure)

                );

            console.log('Website EMI:', websiteEMI);

            console.log('Expected EMI:', expectedEMI);

            expect(websiteEMI).toBeCloseTo(expectedEMI, 0);

            const interest = await homeLoanPage.getInterestValue();

            const totalPayment = await homeLoanPage.getTotalPaymentValue();

            appendDataToExcel({

                LoanType: 'Home Loan',

                LoanAmount: data.loanAmount,

                InterestRate: data.interestRate,

                LoanTenure: data.loanTenure,

                EMI: websiteEMI,

                TotalInterest: interest,

                TotalPayment: totalPayment

            });

        });

    }



});