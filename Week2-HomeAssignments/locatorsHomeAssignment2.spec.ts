import {test} from '@playwright/test'

test("Create Lead - Salesforce", async({page}) => {
    // test.setTimeout(80000);
    await page.goto("http://www.leaftaps.com/opentaps", { waitUntil: 'domcontentloaded' });

    //page.locator('#username').click();
    await page.locator('#username').fill("demoSalesManager");
    await page.locator('#password').fill("crmsfa");
    await page.locator('.decorativeSubmit').click();

    //Click on CRM/SFA link
    await page.locator(`//a[contains(text(),'CRM/SFA')]`).click()

    //Click on Leads tab
    await page.locator(`//a[text()='Leads']`).click();

    //Click on Create Lead tab
    await page.locator(`//a[text()='Create Lead']`).click();

    //Fill Company name field
    await page.locator(`#createLeadForm_companyName`).fill("leaf");

    //Fill First name field
    await page.locator(`#createLeadForm_firstName`).fill('test');

    //Fill Last name field
    await page.locator(`#createLeadForm_lastName`).fill('testing');
    
    //Click on Create lead button
    await page.locator(`//input[@class="smallSubmit" and @value='Create Lead']`).click();

    //Verifying the View Lead title is visible
    await page.locator(`//*[@id='sectionHeaderTitle_leads' and text()='View Lead']`).isVisible();

    //Click on Edit button
    await page.locator(`//a[text()='Edit']`).click();

    //Change the Company name field
    await page.locator(`#updateLeadForm_companyName`).fill("testleaf");

    //Clicking on Update button
    await page.locator(`//input[@class="smallSubmit" and @value='Update']`).click();

})