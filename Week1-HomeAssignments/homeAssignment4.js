//Program to understand the conditional statements
function launchBrowser(browserName, runTypes, call)
{
    var localBrowserName = browserName.toLowerCase();
    if(localBrowserName == "chrome")
        console.log(browserName + " browser launched successfully");
    else if(localBrowserName == "edge")
        console.log(browserName + " browser launched successfully");
    else if(localBrowserName == "firefox")
        console.log(browserName + " browser launched successfully");
    else
        console.log(browserName + " browser is an invalid one");

    call(runTypes);
}

function runTest(testType)
{
    switch(testType.toLowerCase())
    {
        case "sanity":
            console.log("Sanity testing is running");
            break;
        case "regression":
            console.log("Regression testing is running");
            break;
        default:
            console.log("Smoke testing is running");
            break;
    }
}

launchBrowser("Chrome", "sanity", runTest);
launchBrowser("Edge", "smoke", runTest);
launchBrowser("Firefox", "regression", runTest);
launchBrowser("Safari", "functional", runTest);