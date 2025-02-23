//Program to find the given number is positive or negative or zero
function checkNumber(inputNumber)
{
    if(inputNumber > 0)
        return "Positive";
    else if(inputNumber < 0)
        return "Negative";
    else if(inputNumber == 0)
        return "Neutral";
}

console.log("Given number 2 is " + checkNumber(2));
console.log("Given number -2 is " + checkNumber(-2));
console.log("Given number 0 is " + checkNumber(0));