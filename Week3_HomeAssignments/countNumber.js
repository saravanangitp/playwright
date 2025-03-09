//Find how many times the given number is available in an array
let arr = [1,2,3,2,5,1,4,5,2];

const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

console.log(`Number of times 2 exists: ${countOccurrences(arr,8)}`);