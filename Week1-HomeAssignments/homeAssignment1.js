//Program to find the given number is odd or even
let inputNumber=7;

function isOddOrEven(number)
{
    if(number%2 == 0)
        return "Even";
    else
        return "Odd"
}

console.log(`Given number is "${isOddOrEven(inputNumber)}"`);