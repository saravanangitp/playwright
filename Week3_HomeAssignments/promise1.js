
let fetchDataFromDatabase = new Promise((resolve,reject) => {
    const data = true
    console.log('Fetching data from database...');

    setTimeout(()=> {
        if(data){
            resolve('Data fetched successfully!');
        }
        else
        {
            reject('Data not found!');
        }
    }, 3000);
})

fetchDataFromDatabase
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.log(error);
    })