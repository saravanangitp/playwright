import test from "@playwright/test"

test('Week5 Home Assignment - File Upload', async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    //Uploading the file
    const filePromise = page.waitForEvent('filechooser');
    await page.locator(`#file-upload`).click();
    const fileUpload = await filePromise;
    await fileUpload.setFiles(`C:\\Users\\SaravananP\\Pictures\\calm.jpg`);

    //one another way for file upload
    // await page.locator('#file-upload').setInputFiles(`C:\\Users\\SaravananP\\Pictures\\calm.jpg`);
    
    console.log("entered1");
    page.on('console', (msg) => console.log(`Browser console log: ${msg.text()}`));
    await page.waitForSelector('#file-upload');

    const spanText = await page.evaluate(() => {
        console.log("entered");

        const fileInput = document.querySelector('#file-upload');
        console.log('File Input:', fileInput);
      
        if (!fileInput) return null;
      
        const shadowRoot = fileInput.shadowRoot;
        console.log('Shadow Root:', shadowRoot);
      
        const spanElement = shadowRoot?.querySelector(`span[aria-hidden="true"]`);
        console.log('Span Element:', spanElement);
      
        return spanElement?.textContent || null;
      
      });
    
    
    await console.log(`Upload file name exists on the page: ${spanText}`);
})


test('Week5 Home Assignment - File Download', async({page}) => {
    await page.goto(`https://the-internet.herokuapp.com/download`);
    const filePromise = page.waitForEvent('download');
    await page.click(`//a[@href="download/sample.txt"]`);
    const fileDownload = await filePromise;
    const milliSeconds = new Date().valueOf();
    await fileDownload.saveAs(`C:/Users/SaravananP/Downloads/samplefile_${milliSeconds}.txt`);
    //awiat fileDownload.saveAs(fileDownload.suggestedFilename()); //this will get the file name automatically based on the API information
    console.log('File downloaded successfully');
    
    await page.waitForTimeout(2000);
})