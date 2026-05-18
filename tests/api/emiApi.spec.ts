import { test, expect } from '@playwright/test';

test.describe('API Testing', () => {

    test('Validate Important APIs', async ({ page }) => {

        const importantApis: any[] = [];

        page.on('response', async response => {
                const url = response.url();

                const method = response.request().method();

                const status = response.status();

                const isImportantApi = url.includes('admin-ajax') || url.includes('emicalculator.js') || url.includes('commoncalculator.js')

                if (isImportantApi) {

                    importantApis.push({
                        url,
                        method,
                        status
                    });
                }

            }

        );

        const startTime = Date.now();

        await page.goto('/');

        await expect(page.locator('#loanamount').first()).toBeVisible();

        await page.waitForTimeout(5000);

        const endTime = Date.now();

        const totalLoadTime = endTime - startTime;

        console.log('Load Time:', totalLoadTime);

        expect(importantApis.length).toBeGreaterThan(0);

        for (const api of importantApis) {

            console.log(

                `URL: ${api.url}

                 METHOD: ${api.method}

                 STATUS: ${api.status}`

            );

            expect(api.status).toBeLessThan(400);

            expect(['GET', 'POST'].includes(api.method)).toBeTruthy();
        }
 
        const failedApis = importantApis.filter(api => api.status >= 400);

        console.log('Failed APIs:', failedApis);

        expect(failedApis.length).toBe(0);

        expect(totalLoadTime).toBeLessThan(15000);

    });

});

