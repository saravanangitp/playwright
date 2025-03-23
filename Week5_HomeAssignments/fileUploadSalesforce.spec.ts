import {test, expect} from '@playwright/test'

test("Create Lead - Salesforce", async({page}) => {
    test.setTimeout(80000);
    await page.goto("https://login.salesforce.com");

    await page.locator("#username").fill("vanansaransecondary856@agentforce.com");
    await page.locator("#password").fill("vananTest@08");
    // const navigationPromise = page.waitForNavigation();
    await page.locator("#Login").click();
    await page.waitForTimeout(3000);

    //Clicking on toggle menu
    await page.locator(`//*[@title="App Launcher"]`).click();

    //Clicking on View All button
    await page.locator(`//button[contains(text(),'View All')]`).click();

    //Fill on Search field
    await page.locator(`//input[@placeholder="Search apps or items..."]`).fill('Account');
    await page.waitForTimeout(2000);

    //Clicking on Account
    await page.locator(`//a[@href="/lightning/o/Account/home"]`).click();
    await page.waitForTimeout(3000);

    //Click on New button
    await page.locator(`//a[@title="New"]`).click();

    //Input all the mandatory fields
    await page.locator(`//input[@name="Name"]`).fill('fileUpload');
    await page.locator(`//*[text()='Rating']/following-sibling::div`).first().click();
    await page.locator(`//*[text()='Warm']`).click();
    await page.locator(`//*[text()='Type']/following-sibling::div`).first().click();
    await page.locator(`//*[text()='Prospect']`).click();
    await page.locator(`//*[text()='Industry']/following-sibling::div`).first().click();
    await page.locator(`//*[text()='Banking']`).click();
    await page.locator(`//*[text()='Ownership']/following-sibling::div`).first().click();
    await page.locator(`//*[text()='Public']`).click();
    await page.locator(`//*[@name="SaveEdit"]`).click();

    //Click on the Notes & Attachments and upload the file
    await page.waitForSelector(`//h1/descendant::*[text()='fileUpload']`);
    await page.locator(`//span[text()='Notes & Attachments']`).click();
    await page.waitForSelector(`//h1[@title="Notes & Attachments"]`);
    await page.locator('//*[@name="fileInput"]').setInputFiles(`C:\\Users\\SaravananP\\Pictures\\calm.jpg`);

    //Verify the files uploaded or not
    await page.waitForSelector(`//H1[text()='Upload Files']`);
    await expect(page.locator(`//*[text()='calm.jpg']`)).toBeVisible();

})