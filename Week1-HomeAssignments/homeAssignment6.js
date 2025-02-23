//Program to print all the odd number on the given range

function printOddNumberInRange(range)
{
    for(let i=1; i<=range; i++)
    {
        if(i%2 != 0) //modulus operation
            console.log(i)
    }
}

printOddNumberInRange(25);