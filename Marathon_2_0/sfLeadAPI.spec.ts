import test, { expect } from "@playwright/test";
import { createLead, generateSFToken, getLead, updateLead } from './apiUtils'

test.describe.serial(`Sequential execution`, async () => {
    test('Create lead using API', async ({ request }) => {
        await generateSFToken(request);
        const leadID = await createLead(request);
        await getLead(request, leadID, "Company", "testLeaf");
        await updateLead(request, leadID);
        await getLead(request, leadID, "FirstName", "Marathon2.0");
    })

    test('Delete the lead using UI', async ({ page }) => {
        await page.goto("https://login.salesforce.com");

        await page.locator("#username").fill("vanansaransecondary856@agentforce.com");
        await page.locator("#password").fill("Salesleafvanan@08");
        await page.locator("#Login").click();
        await page.waitForTimeout(3000);
        await page.waitForLoadState(`domcontentloaded`)

        //Clicking on toggle menu
        await page.locator(`//*[@title="App Launcher"]`).click();

        //Clicking on View All button
        await page.locator(`//button[contains(text(),'View All')]`).click();
        await page.waitForLoadState(`domcontentloaded`)

        //Fill on Search field
        await page.locator(`//input[@placeholder="Search apps or items..."]`).pressSequentially('Leads');
        await page.click(`//a[@data-label="Leads"]`);
        await page.waitForTimeout(2000);
        await console.log(`Lead link is clicked`)

        //verify the lead page gets loaded
        await page.waitForSelector(`//h1[text()='Leads']`);
        await page.click(`//a[@title='Marathon2.0 Marathon2']`);
        await page.waitForSelector(`//p[@title="Title"]/following-sibling::p//*[text()='testtitle']`);
        await console.log('Lead page is opened');
        await page.click(`//*[text()='Show more actions']/parent::button`);
        await console.log('Inverted arrow button is clicked');
        await page.click(`//*[@role="menuitem"]/*[text()='Delete']`);
        await console.log('Delete menu item is clicked');

        //wait for delete lead popup
        await page.waitForSelector(`//h1[text()='Delete Lead']`);
        await console.log('Delete popup prompted');
        await page.click(`//button[@title="Delete"]`);
        await page.waitForSelector(`//*[contains(@class,'toastMessage')]`);
        await console.log('Deleted successfully toast message displayed');

        //Verifying the delete by search
        await page.locator(`//*[@name="Lead-search-input"]`).fill("Marathon2.0 Marathon2");
        await page.locator(`//*[@name="Lead-search-input"]`).press('Enter');
        await page.waitForLoadState(`domcontentloaded`);
        await expect(page.locator(`//*[text()='No items to display.']`)).toBeVisible();
        await console.log(`No Items to display text is displayed and confirmed that the lead is deleted`);
    })
})