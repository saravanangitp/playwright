import { expect, test } from '@playwright/test';

test('Buttons practice', async ({page}) => {
    // Go to the page
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://leafground.com/button.xhtml');
    await page.waitForLoadState('domcontentloaded');
    
    // Clicking on the button
    await page.locator(`//h5[text()='Click and Confirm title.']/following-sibling::button`).click();
    await page.waitForLoadState('domcontentloaded');
    const pageTitle = await page.title();
    await expect(pageTitle).toBe('Dashboard');
    await console.log(`Page Title: ${pageTitle}`);

    //Going back to buttons page
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // Confirming if the button is disabled
    await expect(page.locator(`//h5[text()='Confirm if the button is disabled.']/following-sibling::button`)).toBeDisabled();
    console.log("Button is disabled");

    // Clicking on the image button
    await page.locator(`//button/span[text()='Image']`).focus();
    await page.locator(`//button/span[text()='Image']`).click({delay: 1000});
    await console.log("Image button is clicked");
    await page.waitForTimeout(2000);

    await expect(page.locator(`//button/span[text()='Secondary']`)).toBeVisible();
    await console.log("Secondary button is hidden");

    // Counting the number of buttons
    const roundedButtons = await page.locator(`//h5[text()='How many rounded buttons are there?']/following-sibling::button`);
    const count = await roundedButtons.count();
    await console.log(`Number of rounded buttons: ${count}`);

});