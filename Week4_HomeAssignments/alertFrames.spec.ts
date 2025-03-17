import { test } from '@playwright/test';

test('Wait for alert frames practice', async ({page}) => {
    // Go to the page
    await page.goto('https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm');

    page.on('dialog', async (dialog: any) => {
        console.log("******Alert*****");
        console.log(`Dialog Type: ${dialog.type()}; Dialog Message: ${dialog.message()}`);
        await page.waitForTimeout(1000);
        await dialog.accept(); // Accept other types of dialogs
    });

    //Clicking on the Try it button
    const frameLoc = await page.frameLocator(`#iframeResult`);
    await frameLoc.locator(`//button[text()='Try it']`).click();

    //verifying the You pressed OK text
    await frameLoc.locator(`//p[contains(text(),'You pressed OK!')]`).isVisible();
    console.log("Alert is accepted successfully");
});