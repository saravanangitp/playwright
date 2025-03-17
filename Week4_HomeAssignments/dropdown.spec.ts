import { expect, test } from '@playwright/test';

test('Checkbox practice', async ({page}) => {
    // Go to the page
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://leafground.com/select.xhtml');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
  
    //select the favorite automation tool 
    const automationDropdown = await page.locator(`//select[@class='ui-selectonemenu']`);
    const dropdownlistCount = await automationDropdown.count();
    console.log('Printing all the list items on Automation tool dropdown')
    for(let index=0; index < dropdownlistCount; index++)
    {
        console.log(await automationDropdown.nth(index).innerText());
    }
    await page.locator(`//select[@class='ui-selectonemenu']`).selectOption({ index: 1 });
    await console.log("First option is selected from the favorite automation tool dropdown");

    //Verify the city dropdown is empty
    let cityDropdown = await page.locator(`//h5[text()='Confirm Cities belongs to Country is loaded']/following-sibling::div/descendant::input`);
    let cityDropdownCount = await cityDropdown.count();
    if(cityDropdownCount == 1)
    {
        await console.log("City dropdown is empty before selecting country");
    }
    else
    {
        await console.log("City dropdown is not empty before selecting country");
    }

    //Choose the preferred country
    await page.locator(`//h5[text()='Choose your preferred country.']/following-sibling::div/descendant::input`).click();
    await page.selectOption(`//h5[text()='Choose your preferred country.']/following-sibling::div/descendant::select`, {value: 'India'});
    await console.log("India is selected from the preferred country dropdown");
    await page.waitForTimeout(1000);

    //Verify the city options is loaded with list items
    cityDropdown = await page.locator(`//h5[text()='Confirm Cities belongs to Country is loaded']/following-sibling::div/descendant::input`);
    cityDropdownCount = await cityDropdown.count();
    if(cityDropdownCount == 4)
    {
        await console.log("After country selection City dropdown is populated with list items");
    }
    else
    {
        await console.log("City dropdown is still empty after selecting country");
    }

    // Selecting 3 courses on the dropdown
    await page.locator(`//h5[text()='Choose the Course']/following-sibling::div/descendant::input`).pressSequentially('aws');
    await page.locator(`//span[@role="listbox"]/ul/li[text()='AWS']`).click();
    await page.locator(`//h5[text()='Choose the Course']/following-sibling::div/descendant::input`).pressSequentially('appium');
    await page.locator(`//span[@role="listbox"]/ul/li[text()='Appium']`).click();
    await page.locator(`//h5[text()='Choose the Course']/following-sibling::div/descendant::input`).pressSequentially('jmeter');
    await page.locator(`//span[@role="listbox"]/ul/li[text()='JMeter']`).click();
    
    //Select the language
    await page.selectOption(`//h5[text()="Choose language randomly"]/following-sibling::div/descendant::select`, {value : 'Tamil'});
    await console.log("Tamil is selected from the language dropdown");

    //select two in the last dropdown
    await page.selectOption(`//h5[text()="Select 'Two' irrespective of the language chosen"]/following-sibling::div/descendant::select`, {value : "Two"});
    await console.log("Two is selected from the last dropdown");
})