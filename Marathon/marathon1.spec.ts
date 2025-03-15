import {expect, test} from '@playwright/test'

test("Create and convert Lead to Oppurtunity - Salesforce", async({page}) => {
    test.setTimeout(80000);
    await page.goto("https://login.salesforce.com");

    await page.locator("#username").fill("vanansaransecondary856@agentforce.com");
    await page.locator("#password").fill("vananTest@08");
    await page.locator("#Login").click();
    
    //Verify and clicking on toggle menu
    const appLauncher = await page.waitForSelector(`//*[@title="App Launcher"]`);
    appLauncher.click();

    //Clicking on View All button
    await page.locator(`//button[contains(text(),'View All')]`).click();

    await page.locator(`//*[@placeholder='Search apps or items...' and @type='search']`).pressSequentially('Marketing');
    await page.locator(`//div[@data-name="Marketing CRM Classic"]`).click();
    
    //verify and click on Leads tab
    await page.waitForTimeout(5000);
    await page.waitForLoadState('domcontentloaded');
    const leadsTab = await page.waitForSelector(`//a[@title="Leads"]`);
    leadsTab.click();

    //Verify the page title
    await expect(page.locator(`//h1[text()='Leads']`)).toBeVisible();
    console.log('My Leads page is displayed');

    //Clicking on New button
    await page.locator(`//a[@title='New']`).click();

    //Verify the new lead popup page title
    await expect(page.locator(`//h2[contains(text(),'New Lead')]`)).toBeVisible();
    console.log('New Lead page is displayed');

    //Entering the details in the new lead popup
    await page.locator(`//button[@aria-label="Salutation"]`).click();
    await page.locator(`//span[text()='Mr.']`).click();
    await page.locator(`//input[@placeholder='First Name']`).fill('test');
    await page.locator(`//input[@placeholder='Last Name']`).fill('leaf');
    await page.locator(`//*[@name="Company"]`).fill('LeafQA');
    await page.locator(`//*[@name="SaveEdit"]`).click();
    console.log('Save button is clicked');

    //Verify the created lead displayed
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator(`//*[text()="Mr. test leaf"]`)).toBeVisible();
    console.log('Created lead is displayed');

    //clicking on downward arrow
    const downArrow = await page.waitForSelector(`//ul[@class="slds-button-group-list"]//span[text()='Show more actions']`)
    downArrow.click();

    //Verify and clicking on Convert menu option
    await expect(page.locator(`//span[text()='Convert']`)).toBeVisible();
    await page.locator(`//span[text()='Convert']`).click();
    console.log('Convert button is clicked');

    //Verify convert lead page is opened
    await expect(page.locator(`//h1[contains(text(),'Convert Lead')]`)).toBeVisible();
    console.log('Convert Lead page is displayed');
    
    //Entering the details in the convert lead page
    await page.locator(`//button[@title='LeafQA-']`).click();
    await page.locator(`//button[@title="LeafQA-"]/following::input[1]`).fill('LeafQA-oppurtunity');
    await page.locator(`//button[text()='Convert']`).click();
    
    await expect(page.locator(`//h2[text()='Your lead has been converted']`)).toBeVisible();
    console.log('Lead has been converted');
    await page.locator(`//button[text()='Go to Leads']`).click();
    
    //click on Opputunities tab
    const oppurtunitiesTab = await page.waitForSelector(`//*[@title="Opportunities"]`);
    oppurtunitiesTab.click();

    //Verify the page title
    await expect(page.locator(`//*[@name="Opportunity-search-input"]`)).toBeVisible();
    console.log('Opportunities page is displayed');
    await page.locator(`//*[@name="Opportunity-search-input"]`).fill('LeafQA-oppurtunity');
    
    //Verify the created opportunity
    await expect(page.locator(`(//*[@title="LeafQA-oppurtunity"])[1]`)).toBeVisible();
    console.log('Created opportunities is displayed');
    await page.locator(`(//*[text()='Show Actions'])[1]`).click();
    await page.locator(`//a/div[text()='Delete']`).click();
    await expect(page.locator(`//h1[text()='Delete Opportunity']`)).toBeVisible();
    await page.locator(`//button/span[text()='Delete']`).click();
    console.log('Opportunity is deleted');
    
    //Verify the created lead displayed
    //verify and click on Leads tab
    const leadTab = await page.waitForSelector(`//*[@title="Leads"]`);
    leadTab.click();
    if(await page.locator(`//a[@title="test leaf"]`).isVisible())
    {
        console.log('Lead is not deleted');
    }
    else
    {
        console.log('Lead is deleted');
    }
    
});