//Callbacks Home assignment
let browser = "Chrome";

function checkBrowserVersion(call){
    console.log('Waiting to retrieve the browser version');
    
    //simulate the delay
    setTimeout(()=>{
        call(browser);
    },2000);
}

function displayBrowserVersion(browserName)
{
    console.log(`Browser version using callback: ${browserName}`)
}

checkBrowserVersion(displayBrowserVersion);