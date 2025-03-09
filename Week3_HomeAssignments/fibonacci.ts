//write a function to find the nth Fibonacci number in Typescript
type Positiveinteger<T extends number> =
  `${T}` extends '0' | `-${any}` | `${any}.${any}` ? never : T

function fibonacci<T extends number>(n: Positiveinteger<T>): number{
    let previous = 0;
    let previousNext = 1;
    let nFibonacci = 0;

    if(n==1){
        return 0;
    }
    else{
        for(let iterator = 2; iterator <= n; iterator++){
            nFibonacci = previousNext + previous;
            previousNext = previous;
            previous = nFibonacci;
            // console.log(`${iterator} nth number: ${nFibonacci}`);
        }
    }
    return nFibonacci;
}

console.log(`1st fibonacci series is: ${fibonacci(1)}`);
console.log(`3rd fibonacci series is: ${fibonacci(3)}`);
console.log(`10th fibonacci series is: ${fibonacci(10)}`);
// console.log(`10th fibonacci series is: ${fibonacci(-10)}`); //invalid