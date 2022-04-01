const {data} = require('./data');
const crypto = require('crypto');
const fs = require('fs');

let userdata= data("Prograd",2022,"BE");
const password = crypto.createHmac('sha256', "skdbf643yuEv#$").update('Prograd').digest('hex');
userdata.userId = 1000;
userdata.userName = "Charan";
userdata.password = password;
fs.writeFileSync('./message.txt',JSON.stringify(userdata));
console.log(userdata);
