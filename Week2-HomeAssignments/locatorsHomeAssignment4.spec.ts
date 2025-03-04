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

    //Click on exsitsing entry
    await page.locator(`//a[text()='IndividualsTest']`).click();

    //Click on Edit button
    await page.locator(`//a[@title='Edit']`).click();

    //Click on Salutation dropdown
    await page.locator(`//*[contains(@class,"salutation")]`).click();

    //Click on "Mr." options
    await page.locator(`//*[text()='Mr.']`).click();

    //Click on Save button
    await page.locator(`//button[@title='Save']/span[text()='Save']`).click();
    await page.waitForTimeout(4000);

    //confirming the lead created or not
    if(await(page.locator(`//*[@class="uiOutputText" and text()='Mr.  IndividualsTest']`).isVisible()))
        await console.log('Edited Individuals exists on the page')
})