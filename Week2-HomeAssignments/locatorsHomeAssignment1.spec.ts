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

    //Click on Sales tab
    await page.locator(`//p[text()='Sales']`).click();
    await page.waitForTimeout(3000);

    //Click on Leads tab
    await page.locator(`//a[@href="/lightning/o/Lead/home"]`).click();
    await page.waitForTimeout(3000);

    //Click on New button
    await page.locator(`//a[@title="New"]`).click();

    //Click on Salutation dropdown
    await page.locator(`//button[@name="salutation"]`).click();

    //Click on "Mr." options
    await page.locator(`//*[text()='Mr.']`).click();

    //Input values on 'Last Name' field
    await page.locator(`//*[@name="lastName"]`).fill('test');

    //Input values on 'Company Name' field
    await page.locator(`//*[@name="Company"]`).fill('leaf');

    //Click on Save button
    await page.locator(`//button[@name='SaveEdit' and text()='Save']`).click();
    await page.waitForTimeout(4000);

    //confirming the lead created or not
    if(await(page.locator(`//*[text()='Mr.test']`).isVisible()))
        await console.log('Created saled lead exists on the page');

    //Click on the inverted arrow
    await page.locator(`(//*[text()='Submit for Approval']/following::li)[1]`).click()

    //Click on Delete option
    await page.locator(`//*[@title="Delete"]`).click();

    //Click on Delete button in the delete popup
    await page.locator(`//button[@title="Delete"]`).click();
    await page.waitForTimeout(3000);

})