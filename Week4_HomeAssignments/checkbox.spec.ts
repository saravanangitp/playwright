import { expect, test } from '@playwright/test';

test('Checkbox practice', async ({page}) => {
    // Go to the page
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://leafground.com/checkbox.xhtml');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
   
    //Clicking on Basic checkbox and verify it is checked
    await page.locator(`//input[@aria-label="Basic"]`).check();
    await expect(page.locator(`//input[@aria-label="Basic"]`)).toBeChecked();
    await console.log("Basic checkbox is checked");

    //Click on Notification checkbox
    await page.locator(`//input[@aria-label="Ajax"]`).check();
    await expect(page.locator(`//input[@aria-label="Ajax"]`)).toBeChecked();
    await expect(page.locator(`//*[@role="alert"]/*[@class='ui-growl-message']/span`)).toBeVisible();
    const alertText = await page.locator(`//*[@role="alert"]/*[@class='ui-growl-message']/span`).innerText();
    await expect(alertText).toBe('Checked');
    await console.log("Noticiation checkbox is checked");

    //Clicking on the language checkboxes
    const languageCheckboxes = await page.locator(`//h5[text()='Choose your favorite language(s)']/following::td`);
    const languages = ['Java', 'Python']; 
    for (const language of languages) {
        await languageCheckboxes.locator(`//label[text()='${language}']`).check();
        await expect(languageCheckboxes.locator(`//label[text()='${language}']`)).toBeChecked();
        await console.log(`${language} checkbox is checked`);
    }
    
    //Verifying the tri-state checkbox
    await page.locator(`//h5[text()='Tri State Checkbox']/following-sibling::div/descendant::input`).click();
    await expect(page.locator(`//h5[text()='Tri State Checkbox']/following-sibling::div/descendant::input`)).toBeChecked();
    await expect(page.locator(`//*[@role="alert"]/*[@class='ui-growl-message']/span`)).toBeVisible();
    let popupText = await page.locator(`//*[@role="alert"]/*[@class='ui-growl-message']/p`).innerText();
    await expect(popupText).toBe('State = 1');

    await page.locator(`//h5[text()='Tri State Checkbox']/following-sibling::div/descendant::input`).click();
    await expect(page.locator(`//h5[text()='Tri State Checkbox']/following-sibling::div/descendant::input`)).toBeChecked();
    await expect(page.locator(`//*[@role="alert"]/*[@class='ui-growl-message']/span`)).toBeVisible();
    popupText = await page.locator(`//*[@role="alert"]/*[@class='ui-growl-message']/p`).innerText();
    await expect(popupText).toBe('State = 2');

    await page.locator(`//h5[text()='Tri State Checkbox']/following-sibling::div/descendant::input`).click();
    await expect(page.locator(`//h5[text()='Tri State Checkbox']/following-sibling::div/descendant::input`)).toBeChecked();
    await expect(page.locator(`//*[@role="alert"]/*[@class='ui-growl-message']/span`)).toBeVisible();
    popupText = await page.locator(`//*[@role="alert"]/*[@class='ui-growl-message']/p`).innerText();
    await expect(popupText).toBe('State = 0');
    await console.log("Tri State Checkbox is checked");

    //Verify the toggle switch
    await page.locator(`//h5[text()='Toggle Switch']/following-sibling::div/descendant::input`).click();
    await expect(page.locator(`//h5[text()='Toggle Switch']/following-sibling::div/descendant::input`)).toHaveAttribute('aria-checked', 'true');
    await console.log("Toggle Switch is checked");

    //Verify the checkbox is disabled
    await expect(page.locator(`//h5[text()='Verify if check box is disabled']/following-sibling::div/descendant::input`)).toHaveAttribute('aria-disabled', 'true');
    await console.log("Toggle Switch is checked");

});