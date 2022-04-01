

![Image description](https://i1.faceprep.in/ProGrad/prograd-logo.png)

# PROGRAD LABS | NODE | FILE OPERATIONS

## Learning Goals

In this exercise, the goal is to learn various node modules:

- os module
- fs module
- crypto

## Getting started

1. Fork this repo
2. Clone this repo

Whenever you create a first significant change, you should make your first commit.

3. Follow these [guidelines to add, commit and push changes](https://github.com/FACEPrep-ProGrad/general-guidelines-labs-project-builders.git).

In the end of this document, you will find guidelines on how to submit the exercise.

## Introduction
In this lab we will work on fetching data from one file into another and encrypting the data inside the file.
Import the following modules in index.js
- os
- fs
- crypto
### PROGRESSION 1 | data.js
Create a file called data.js and create data module inside it with three arguments `name, year and qualification`. 
```
module.exports.data=(name,year,qualification)=>{
    data={
        name:name,
        Year:year,
        Qualification:qualification
    }
    return data
}
```

### PROGRESSION 2 | message.txt
Create a text file called message.txt. You need to fetch the data from data.js and write the value inside message.txt

### PROGRESSION 3 | index.js
Your task in this progression is to fetch all the data from data.js and then you need to append the data in message.txt. Import all the necessary modules inside index.js.
fetch the userinfo from the os module and the value to data.js can be passed as
```
var userdata= value.data("Prograd",2020,"BE")
```

### PROGRESSION 4 | CYRPTO
Your task in this iteration to use `crypto` module and encrypt the password.
```
const crypto = require('crypto');
const password = crypto.createHmac('sha256', secret).update('Prograd').digest('hex');

```

### Output
```
message.txt
ProGrad Details
   UserId ->        1000,
   Name ->          Prograd,
   Year ->          2020,
   Qualification -> BE,
   UserName->       prasanth,
   Password ->      f61a89be62891ce83afb2ac9d165f4e3566cadec3481d50d7f03630f796af55e
   
```

And you have reached the end!

Happy Coding! :heart:
