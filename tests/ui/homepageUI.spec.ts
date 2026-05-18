import { test, expect } from '@playwright/test';

test.describe('Homepage UI Testing', () => {

    test('Validate Complete UI', async ({ page }) => {

        await page.goto('/');

        await expect(page).toHaveTitle(/EMI Calculator/);

        const homeLoanTab = page.locator('a[href="#"]').filter({hasText: 'Home Loan'}).first();

        await expect(homeLoanTab).toBeVisible();

        const carLoanTab = page.locator('a[href="#"]').filter({hasText: 'Car Loan'}).first();

        await expect(carLoanTab).toBeVisible();

        const personalLoanTab = page.locator('a[href="#"]').filter({hasText: 'Personal Loan'}).first();

        await expect(personalLoanTab).toBeVisible();

        const loanAmountInput = page.locator('#loanamount').first();

        await expect(loanAmountInput).toBeVisible();

        const interestInput = page.locator('#loaninterest').first();

        await expect(interestInput).toBeVisible();

        const tenureInput = page.locator('#loanterm').first();

        await expect(tenureInput).toBeVisible();

        await expect(page.locator('#emiamount span').first()).toBeVisible();

        await expect(page.locator('#emitotalinterest span').first()).toBeVisible();

        await expect(page.locator('#emitotalamount span').first()).toBeVisible();

        await expect(page.locator('svg').first()).toBeVisible();

        await expect(page.locator('#emipaymenttable').first()).toBeVisible();

        await expect(loanAmountInput).toHaveCSS('font-size','16px');

        await expect(loanAmountInput).toHaveAttribute('type','text');
    });

});