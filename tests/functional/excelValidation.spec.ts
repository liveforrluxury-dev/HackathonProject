import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { HomeLoanPage } from '../../pages/HomeLoanPage';
import { readExcelData } from '../../utils/excelReader';

test.describe('Excel Validation Testing', () => {

    test('Validate Downloaded Excel Data', async ({ page }) => {

        const homeLoanPage = new HomeLoanPage(page);

        await homeLoanPage.openWebsite();

        await homeLoanPage.enterLoanDetails('1000000', '8.5', '20');

        await page.waitForTimeout(3000);

        // Create Download Promise

        const downloadPromise = page.waitForEvent('download');

        // Click Excel Download

        await homeLoanPage.excelButton.click();

        // Wait Download

        const download = await downloadPromise;

        // File Path

        const filePath = path.join('downloads', download.suggestedFilename());

        // Create downloads folder

        if (!fs.existsSync('downloads')) {
            fs.mkdirSync('downloads');
        }

        // Save Download

        await download.saveAs(filePath);

        console.log('Downloaded File:', filePath);

        // Validate File Exists

        expect(fs.existsSync(filePath)).toBeTruthy();

        // Read Excel Data

        const excelData = readExcelData(filePath);

        console.log('Excel Data:', excelData);

        // Validate Excel Not Empty

        expect(excelData.length).toBeGreaterThan(0);

        // Read Website Table Data

        const tableData = await homeLoanPage.getFirstRowTableData();

        console.log('Website Table Data:', tableData);

        // Basic Validation

        expect(tableData.length).toBeGreaterThan(0);

    });

});