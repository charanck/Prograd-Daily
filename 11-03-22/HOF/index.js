const list = [1,2,3,4,5,6,7,8,9,10];

// Map
list.map(item => log(item));

// Filter
const filteredList = list.filter(item => item%2 == 0);
console.log("Filetered List",filteredList);

// Reduce
const reducedNo = list.reduce((prev,curr) => prev+curr);
console.log(`Reduced No: ${reducedNo}`);

// Foreach
list.forEach(item => log(item))

function log(element){
    console.log(`LOG: ${element}`);
}