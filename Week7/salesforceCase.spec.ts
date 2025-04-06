import test from "@playwright/test";
import { createCase, deleteCase, generateToken, getCaseById } from "./apiUtils";

let tokenReturn: any = {};
let caseId: any;
let caseNumber: any;

test.describe.serial(`Sequential execution; Salesforce - Case E2E flow`, async () => {
    test('API Flow', async({request}) => {
        tokenReturn = await generateToken(request);
        caseId = await createCase(request);
        caseNumber = await getCaseById(request, caseId);
    })

    test('UI Flow', async({page}) => {
        await page.goto("https://login.salesforce.com");

        await page.locator("#username").fill("");
        await page.locator("#password").fill("");
        await page.locator("#Login").click();
        await page.waitForLoadState(`domcontentloaded`);
        await page.waitForTimeout(3000);
        
        //Clicking on toggle menu
        await page.locator(`//*[@title="App Launcher"]`).click();
        await page.waitForLoadState(`domcontentloaded`);

        //Clicking on View All button
        await page.locator(`//button[contains(text(),'View All')]`).click();
        await page.waitForLoadState(`domcontentloaded`);

        //Fill on Search field
        await page.locator(`//input[@placeholder="Search apps or items..."]`).pressSequentially('Cases');
        await page.click(`//a[@data-label="Cases"]`);
        await page.waitForTimeout(2000);
        await console.log(`Cases link is clicked`)

        //verify the Cases page gets loaded
        await page.waitForSelector(`//h1[text()='Cases']`);
        await page.locator(`//*[@type="search" and @name="Case-search-input"]`).fill(caseNumber)
        await page.locator(`//*[@type="search" and @name="Case-search-input"]`).press('Enter');
        await page.waitForTimeout(2000);
        await page.click(`//a[@title="${caseNumber}"]`);
        await page.waitForTimeout(2000);
        await console.log(`Case number ${caseNumber} is clicked`)
        await page.click(`//button[@name="Edit"]`);
        await page.waitForLoadState(`domcontentloaded`);
        await page.waitForSelector(`//h2[text()='Edit ${caseNumber}']`);
        await page.click(`//button[@aria-label="Status"]`);
        await page.click(`//*[@title="Working"]`);
        await page.click(`//button[@aria-label="Priority"]`);
        await page.click(`//*[@title="Low"]`);
        await page.click(`//button[@aria-label="Case Origin"]`);
        await page.click(`//*[@title="Phone"]`);
        await page.click(`//button[@aria-label="SLA Violation"]`);
        await page.click(`//*[@title="No"]`);
        await page.click(`//*[@name="SaveEdit"]`);
        await page.waitForLoadState(`domcontentloaded`);
        await page.waitForTimeout(2000);
    })

    test('Delete the case using API', async({request}) => {
        await deleteCase(request, caseId);
    })
})