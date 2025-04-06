import { test, Page } from '@playwright/test';
import { LoginTestData } from './TestData';

test(`Test Data Inheritance`, async ({ page }) => {
    // Create an instance of the TestData class
    const testData = new LoginTestData(page);

    // Navigate to the login page
    await testData.navigateToLoginPage('http://leaftaps.com/opentaps/control/main');

    // Enter credentials
    await testData.enterUserName("demoCSR");
    await testData.enterPassword("crmsfa");
    
    // Perform additional actions as needed
    await testData.enterCredentials();
})