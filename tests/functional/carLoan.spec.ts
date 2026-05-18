import { test, expect } from '@playwright/test';
import { CarLoanPage } from '../../pages/CarLoanPage';
import { carLoanData } from '../../utils/testData';
import { appendDataToExcel } from '../../utils/excelUtils';

test.describe('Car Loan Functional Testing', () => {

    for (const data of carLoanData) {

        test('Validate EMI Advance vs Arrears', async ({ page }) => {

            const carLoan = new CarLoanPage(page);
            await carLoan.openWebsite();
            await carLoan.openCarLoanTab();

            await carLoan.enterLoanDetails(data.loanAmount, data.interestRate, data.loanTenure);

            await carLoan.selectEMIInArrears();

            const arrearsEMI = await carLoan.getEMIValue();

            console.log('Arrears EMI:', arrearsEMI);

            await carLoan.selectEMIInAdvance();

            const advanceEMI = await carLoan.getEMIValue();

            console.log('Advance EMI:', advanceEMI);

            expect(arrearsEMI).not.toEqual(advanceEMI);

            appendDataToExcel({

                LoanType: 'Car Loan',

                LoanAmount: data.loanAmount,

                InterestRate: data.interestRate,

                LoanTenure: data.loanTenure,

                EMIInArrears: arrearsEMI,

                EMIInAdvance: advanceEMI

            });

        });

    }

});