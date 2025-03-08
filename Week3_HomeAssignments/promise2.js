
let conditionalPromise = new Promise((resolve,reject) => {
    const randomNumber = Math.random();
    console.log(`Generated random number is ${randomNumber}`);

    //Based on random Number promise will be resolved or rejected
    if(randomNumber > 0.5){
        resolve(`"Resolved successfully"`);
    }
    else
    {
        reject(`"Rejected"`);
    }
})

conditionalPromise
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.log(error);
    })