import { test, expect } from '@playwright/test';

test('Wait for invisibility practice', async ({page}) => {
    // Go to the page
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://leafground.com/waits.xhtml');

    // Verifying the visible of button
    await (page.locator(`.card`).filter({hasText:'Wait for Visibility'}).getByRole('button').filter({hasText: 'Click'})).click();
    await expect(page.locator(`.card`).filter({hasText:'Wait for Visibility'}).getByRole('button').filter({hasText: 'I am here'})).toBeVisible({timeout: 15000});
    console.log("Button has been appeared");

    //Verifying the disappearence of button
    await (page.locator(`.card`).filter({hasText:'Wait for Invisibility'}).getByRole('button').filter({hasText: 'Click'})).click();
    await expect(page.locator(`.card`).filter({hasText:'Wait for Invisibility'}).getByRole('button').filter({hasText: 'I am about to hide'})).toBeHidden({timeout: 15000});
    console.log("Button has been disappeared");

    //Wait for clickable
    await page.locator(`//span[text()='Click First Button']`).click();
    await expect(page.locator(`//span[text()='Click Second']/parent::button`)).toBeEnabled({timeout: 15000});
    await console.log("Second button is clickable");

    //Wait for change
    await expect(page.locator(`//button/span[text()='I am going to change!']`)).toBeVisible();
    await page.locator(`(//h5[text()='Wait for Text Change (1 - 10 Sec)']//following-sibling::div/descendant::button/span)[1]`).click();
    await expect(page.locator(`//button/span[text()='Did you notice?']`)).toBeVisible({timeout: 10000});
    console.log("Text has been changed");
})