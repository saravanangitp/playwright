//write a function to find the nth Fibonacci number in Typescript
type PositiveInteger<T extends number> =
  `${T}` extends '0' | `-${any}` | `${any}.${any}` ? never : T

function factorial<T extends number>(n: PositiveInteger<T>): number{
    let nFactorial = 1;

    if(n==1){
        return 1;
    }
    else{
        for(let iterator = 2; iterator <= n; iterator++){
            nFactorial = nFactorial * iterator;
            // console.log(`${iterator} nth number: ${nFactorial}`);
        }
    }
    return nFactorial;
}

console.log(`1st fibonacci series is: ${factorial(1)}`);
console.log(`3rd fibonacci series is: ${factorial(3)}`);
console.log(`10th fibonacci series is: ${factorial(10)}`);
// console.log(`10th fibonacci series is: ${factorial(-5)}`);