const http = require('http');
const fs = require('fs');

const PORT = 3000;
const DB = JSON.parse(fs.readFileSync('./db.json'));

const server = http.createServer(serverHandler);

function serverHandler(request,response){
    const URL = request.url;
    const METHOD = request.method;

    // Routes
    if(URL === '/balance' && METHOD === 'POST') getBalance(request,response);
    if(URL === '/deposit' && METHOD === 'POST') deposit(request,response);
    if(URL === '/withdraw' && METHOD === 'POST') withdraw(request,response);
    if(URL === '/register' && METHOD === 'POST') register(request,response);



}

// Router Handlers
function getBalance(request,response){
    let data = '';
    request.on('data',(chunk)=>data += chunk);
    response.setHeader("Content-Type","application/json");
    request.on("end",()=>{
        const userName = JSON.parse(data).userName;
        const password = JSON.parse(data).password;
        let isFound = false;
        for(user of DB){
            if(user.userName === userName && user.password === password){
                response.write(JSON.stringify({'balance':user.balance}));
                isFound = true;
            }
        }
        if(!isFound){
            response.statusCode = 401;
            response.write(JSON.stringify({"message":"INVALID CREDENTIALS!!!"}));
        }
        response.end();
    });
}

function deposit(request,response){
    let data = '';
    request.on('data',(chunk)=>data += chunk);
    request.on("end",()=>{
        const userName = JSON.parse(data).userName;
        const password = JSON.parse(data).password;
        const amount = Number(JSON.parse(data).amount);
        let isFound = false;
        response.setHeader("Content-Type","application/json");
        for(let i =0;i<DB.length; i++){
            if(DB[i].userName === userName && DB[i].password === password){
                isFound = true;
                DB[i].balance += amount;
                response.write(JSON.stringify({'balance':DB[i].balance}));
                newDb = JSON.stringify(DB, null, 2);
                fs.writeFileSync('./db.json',newDb);
            }
        }
        if(!isFound){
            response.statusCode = 401;
            response.write(JSON.stringify({"message":"INVALID CREDENTIALS!!!"}));
        }
        response.end();
    });
}

function withdraw(request,response){
    let data = '';
    request.on('data',(chunk)=>data += chunk);
    request.on("end",()=>{
        const userName = JSON.parse(data).userName;
        const password = JSON.parse(data).password;
        const amount = Number(JSON.parse(data).amount);
        let isFound = false;
        response.setHeader("Content-Type","application/json");
        for(let i =0;i<DB.length; i++){
            if(DB[i].userName === userName && DB[i].password === password){
                isFound = true;
                if(amount > DB[i].balance){
                    response.statusCode = 400;
                    response.write(JSON.stringify({"message":"Insufficient Balance","balance":DB[i].balance}));
                    break;
                }
                DB[i].balance -= amount;
                response.write(JSON.stringify({'balance':DB[i].balance}));
                newDb = JSON.stringify(DB, null, 2);
                fs.writeFileSync('./db.json',newDb);
            }
        }
        if(!isFound){
            response.statusCode = 401;
            response.write(JSON.stringify({"message":"INVALID CREDENTIALS!!!"}));
        }
        response.end();
    });
}

function register(request,response){
    let data = '';
    request.on('data',(chunk)=>data += chunk);
    request.on("end",()=>{
        const userName = JSON.parse(data).userName;
        const password = JSON.parse(data).password;
        let isFound = false;
        response.setHeader("Content-Type","application/json");
        for(let i =0;i<DB.length; i++){
            if(DB[i].userName === userName){
                isFound = true;
            }
        }
        DB.push({id:DB.length,userName:userName,password:password,balance:0});
        newDb = JSON.stringify(DB, null, 2);
        fs.writeFileSync('./db.json',newDb);
        if(isFound){
            response.statusCode = 401;
            response.write(JSON.stringify({"message":"USERNAME ALREADY EXISTS!!!"}));
        }else{
            response.write(JSON.stringify({"message":"USER CREATED SUCCESSFULLY!!!"}));

        }
        response.end();
    });
}


server.listen(PORT,(err)=>console.log(`Listening on ${PORT}`));