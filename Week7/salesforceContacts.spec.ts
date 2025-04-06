import test from "@playwright/test";
import { deleteContact, updateContact, generateToken, getContact } from "./apiUtils";

let tokenReturn: any = {};
let contactId: any;

test.describe.serial(`Sequential execution; Salesforce - Contact E2E flow`, async () => {
    test(`UI flow`, async({page}) => {
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
        await page.locator(`//input[@placeholder="Search apps or items..."]`).pressSequentially('contacts');
        await page.click(`//a[@data-label="Contacts"]`);
        await page.waitForTimeout(2000);
        await console.log(`Contacts link is clicked`)

        //verify the Cases page gets loaded
        await page.waitForSelector(`//h1[text()='Contacts']`);
        await page.click(`//a[@title="New"]`);
        await page.waitForLoadState(`domcontentloaded`);
        await page.waitForSelector(`//h2[text()='New Contact']`);
        await page.click(`//button[@aria-label="Salutation"]`);
        await page.click(`//*[@title="Mr."]`);
        await page.locator(`//input[@name="firstName"]`).fill("test");
        await page.locator(`//input[@name="lastName"]`).fill("leaf");
        await page.click(`//*[@name="SaveEdit"]`);
        await page.waitForLoadState(`domcontentloaded`);
        await page.waitForTimeout(2000);
    })

    test('API Flow', async({request}) => {
        tokenReturn = await generateToken(request);
        contactId = await getContact(request, "leaf, test");
        await updateContact(request, contactId);
        await deleteContact(request, contactId);
    })
})