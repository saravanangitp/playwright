import test, { expect } from "@playwright/test";
import { createLead, deleteDashboard, generateSFToken, getDashboard, getLead, updateLead } from './apiUtils'

test.describe.serial(`Sequential execution`, async () => {
    test('Create the Salesforce Dashboard using UI', async ({ page }) => {
        await page.goto("https://login.salesforce.com");

        await page.locator("#username").fill("vanansaransecondary856@agentforce.com");
        await page.locator("#password").fill("Salesleafvanan@08");
        await page.locator("#Login").click();
        await page.waitForTimeout(3000);
        await page.waitForLoadState(`domcontentloaded`)

        //Clicking on toggle menu
        await page.locator(`//*[@title="App Launcher"]`).click();
        await page.waitForLoadState(`domcontentloaded`)

        //Clicking on View All button
        await page.locator(`//button[contains(text(),'View All')]`).click();
        await page.waitForLoadState(`domcontentloaded`)

        //Fill on Search field
        await page.locator(`//input[@placeholder="Search apps or items..."]`).pressSequentially('Dashboards');
        await page.click(`//a[@data-label="Dashboards"]`);
        await page.waitForTimeout(2000);
        await console.log(`Dashboards link is clicked`)

        //verify the Dashboard page gets loaded
        await page.waitForSelector(`//h2[text()='Dashboards']`);
        await page.click(`//a[@title="New Dashboard"]`);
        await console.log('New Dashboard button is clicked');
        await page.waitForLoadState(`domcontentloaded`);

        //New Dashboard popup
        const framePage = await page.frameLocator(`(//*[@title="dashboard"])[1]`);
        await framePage.locator(`//h1[text()="New Dashboard"]`).isVisible();
        await framePage.locator(`//*[@id="dashboardNameInput"]`).fill('Salesforce Automation by [Your Name]');
        await framePage.locator(`//*[@id="submitBtn"]`).click();
        await console.log(`Submit button is clicked on the New Dashboard popup`);
        await page.waitForTimeout(3000);
        await page.waitForLoadState(`domcontentloaded`);

        //Update the dashboard name
        const newFrame = await page.frameLocator(`(//*[@title="dashboard"])`).last();
        await newFrame.locator(`//*[text()='Salesforce Automation by [Your Name]']`).isVisible();;
        await console.log(`Dashboard page is opened`);
        await newFrame.locator(`//*[@class='slds-form-element editTitle']`).last().click();
        await newFrame.locator(`//*[@id="edit-dashboard-title"]`).fill('Salesforce Automation by Saran');
        await console.log(`Updating the dashboard`);
        await newFrame.locator(`//button[text()='Save']`).click();
        await console.log('Click on the Save button')
        await page.waitForLoadState(`domcontentloaded`);;
        await page.click(`//*[@title="Dashboards"]`);
        await page.waitForLoadState(`domcontentloaded`);
        await page.waitForSelector(`//a[@title="Salesforce Automation by Saran"]`);
        await console.log('Dashboard is created and updated successfully');
    })

    test('Delete the dashboard using API', async ({ request }) => {
        await generateSFToken(request);
        let dashboardId = await getDashboard(request, "Salesforce Automation by Saran");
        await deleteDashboard(request, dashboardId);
        dashboardId = await getDashboard(request, "Salesforce Automation by Saran");
        console.log(dashboardId === null ? 'Dashboard deleted successfully' : 'Dashboard is not deleted');
    })
})