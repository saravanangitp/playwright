import test from "@playwright/test";
import { Chrome, Edge, Firefox } from "./Browser";

test(`Browser Inheritance`, async ({ page }) => {
    // Create instances of each browser class
    const chrome = new Chrome(page);
    const edge = new Edge(page);
    const firefox = new Firefox(page);

    // Open a URL in each browser
    await chrome.openURL('https://www.google.com');
    await edge.openURL('https://www.google.com');
    await firefox.openURL('https://www.google.com');

    // Perform actions specific to each browser
    await chrome.openIncognito();
    await edge.takeSnap();
    await edge.clearCookies();
    // await firefox.clearCache(); // not working as per the logic of inheritance
    // await firefox.clearCookies(); // not working as per the logic of inheritance
    // await edge.readerMode(); // not working as per the logic of inheritance
    // await edge.fullScreenMode(); // not working as per the logic of inheritance
    await firefox.readerMode();
    await firefox.navigateBack();
    await firefox.fullScreenMode();
    // await firefox.openIncognito(); // not working as per the logic of inheritance
    // await firefox.takeSnap(); // not working as per the logic of inheritance

    // Close the browsers
    await chrome.closeBrowser();
    await edge.closeBrowser();
    await firefox.closeBrowser();
});