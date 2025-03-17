import { test, expect } from '@playwright/test';

test('Handling Frames', async ({page}) => {
    // Go to the page
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://leafground.com/frame.xhtml');

    // Switch to the first frame
    const allFrames = page.frames();
    const frame1 = allFrames[1];
    await frame1.waitForSelector('button');
    await frame1.click('button');
    const buttonText = await frame1.locator('button').innerText();
    await expect(buttonText).toEqual(`Hurray! You Clicked Me.`);
    console.log('First frame button text is:', buttonText);

    console.log(`Total frames count is: ${allFrames.length}`);

    // Swtiching to Fourth frame by index 
    await allFrames[4].locator('button#Click').click();
    const buttonText2 = await allFrames[4].locator('button#Click').innerText();
    await expect(buttonText2).toEqual('Hurray! You Clicked Me.');
    console.log('Nested frame Button text is:', buttonText2);

    await page.waitForTimeout(3000);
});