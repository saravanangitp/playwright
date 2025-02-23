//Program to find the given string is palindrome or not
function reverseString(strValue,call)
{
    let chrArray = strValue.split("");
    let revString = "";
    for(var i=strValue.length-1; i>=0; i--)
    {
        revString += chrArray[i];
    }
    console.log("Given string is '"+ strValue+"'")
    console.log("Reversed String is: '" + revString+"'");
    console.log("Given string '"+ strVal + "' is "+ (call(strValue, revString)? "": "not ") +"palindrome"); //callback function
}

function isPalindrome(original, reversed)
{
    return (original === reversed)? true : false; //strictly compared
}

let strVal = "Madam";
reverseString(strVal, isPalindrome);