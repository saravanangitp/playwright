//Function to find the length of last word in a string
function findLengthOfLastWord(strVal)
{
    let strArr = strVal.split(" ");
    let arrLength = strArr.length;
    
    console.log("Length of last word in the given string '" + strVal + "' is "+ strArr[arrLength-1].length);
}

//Function to trim, find and return the length of last word in a string
function findAndReturnLengthOfLastWord(strVal)
{
    strVal = strVal.trim();
    let strArr = strVal.split(" ");
    return strArr.length;    
}

//function to find the given two strings are anagrams
function isAnagram(str1, str2)
{
    str1 = str1.trim().toLowerCase();
    str2 = str2.trim().toLowerCase();
    let str1Arr = str1.split("");
    let str2Arr = str2.split("");
    str1Arr.sort();
    str2Arr.sort();
    str1 = str1Arr.join("");
    str2 = str2Arr.join("");
    
    console.log("After storing string1 '"+ str1 + "'");
    console.log("After storing string2 '"+ str2 +"'");

    if(str1 == str2)
        return true;
    else
        return false;
}

//Example 1
findLengthOfLastWord("Hello World");

//Example 2
let rawString = " fly me to the moon ";
console.log("Length of last word in the given string '" + rawString + "' is "+ findAndReturnLengthOfLastWord(rawString));

//Example 3
console.log("Given strings are " + (isAnagram("hello", "World")? "Anagram" : "not Anagram"));
console.log("Given strings are " + (isAnagram("listen", "Silent")? "Anagram" : "not Anagram"));