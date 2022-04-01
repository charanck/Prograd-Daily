const {data} = require("./question");
const fs = require('fs');

fs.writeFileSync('./question.json',JSON.stringify(data));