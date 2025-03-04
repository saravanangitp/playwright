import {test} from '@playwright/test'

test("Create Lead - Salesforce", async({page}) => {
    test.setTimeout(80000);
    await page.goto("https://login.salesforce.com");

    await page.locator("#username").fill("vidyar@testleaf.com");
    await page.locator("#password").fill("Sales@123");
    // const navigationPromise = page.waitForNavigation();
    await page.locator("#Login").click();
    
    await page.waitForTimeout(3000);

    //Clicking on toggle menu
    await page.locator(`//*[@title="App Launcher"]`).click();

    //Clicking on View All button
    await page.locator(`//button[contains(text(),'View All')]`).click();

    //Fill on Search field
    await page.locator(`//input[@placeholder="Search apps or items..."]`).fill('Individuals');
    await page.waitForTimeout(2000);

    //Click on Individuals link from search
    await page.locator(`//a[@href="/lightning/o/Individual/home"]`).click();
    await page.waitForTimeout(3000);

    //Click on New button
    await page.locator(`//a[@title="New"]`).click();

    //Input values on 'Last Name' field
    await page.locator(`//*[@placeholder="Last Name"]`).fill('IndividualsTest');

    //Click on Save button
    await page.locator(`//button[@title='Save']/span[text()='Save']`).click();
    await page.waitForTimeout(4000);

    //confirming the lead created or not
    if(await(page.locator(`//*[@class="uiOutputText" and text()='IndividualsTest']`).isVisible()))
        await console.log('Created Individuals exists on the page');

    // //Click on Delete option
    // await page.locator(`//*[@title="Delete"]/div[text()='Delete']`).click();

    // //Click on Delete button in the delete popup
    // await page.locator(`//button[@title="Delete"]`).click();
    // await page.waitForTimeout(3000);

})