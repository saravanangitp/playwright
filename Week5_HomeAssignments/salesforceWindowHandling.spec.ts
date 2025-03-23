import {test} from '@playwright/test'

test("Window handles - Salesforce", async({context, page}) => {    test.setTimeout(80000);
    await page.goto("https://login.salesforce.com");

    await page.locator("#username").fill("vanansaransecondary856@agentforce.com");
    await page.locator("#password").fill("vananTest@08");
    // const navigationPromise = page.waitForNavigation();
    await page.locator("#Login").click();
    
    await page.waitForTimeout(3000);

    //Fill on Search field
    await page.locator(`//button[text()='Search...']`).click();
    
    //click on learn more link
    const [multiplePages] = await Promise.all([
        context.waitForEvent('page'),
        await page.locator(`//*[@title='Learn more about natural language search']/descendant::*[text()='Learn More']`).click()
    ]);

    const allPage = await multiplePages.context().pages();
    console.log('Number of tabs opened' + await allPage.length);
    
    let pageTitle='';
    let currentPage: any;
    for(let page of allPage){
        console.log('Page URL: ' + page.url());
        await page.waitForTimeout(2000);
        pageTitle = await page.title();
        console.log('Page Title: ' + pageTitle);
    }
})