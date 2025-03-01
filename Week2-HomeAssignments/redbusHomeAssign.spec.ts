import {chromium, test} from "@playwright/test"

test ("RedBus & Flipkart", async() => {
    // Not installed/available in my local machine
    // const browserRedbus = await chromium.launch({channel: "firefox"});

    //New browser with ms chrome browser
    const browserRedbus = await chromium.launch({
        headless: false
    });

    //New browser with ms edge browser
    const browserFlipkart = await chromium.launch({
        channel: "msedge",
        headless: false
    });

    //Creating the browser context for two browsers
    const browserContext1 = await browserRedbus.newContext();
    const browserContext2 = await browserFlipkart.newContext();

    //Creating two object for pages
    const redbusPage = await browserContext1.newPage();
    const flipkartPage = await browserContext2.newPage();
    
    //Navigating to the URL
    await redbusPage.goto("https://www.redbus.in");
    await flipkartPage.goto("https://www.flipkart.com");

    console.log("Browser 1 title: " + await redbusPage.title());
    console.log("Browser 1 URL: " + await redbusPage.url());

    console.log("Browser 2 title: " + await flipkartPage.title());
    console.log("Browser 2 URL: " + await flipkartPage.url());

    redbusPage.close();
    flipkartPage.close();
})