const fs = require('fs');
const express = require('express');
const PORT = 3000;
const DB = JSON.parse(fs.readFileSync('./DB.json'));

const app = express();
app.use(express.json());

// Middlewares
function logTransaction(req,res,next){
    let data;
    if(/deposit/.test(req.path)) data = `DEPOSIT Rs.${req.body.amount} by user with Id: ${req.params.userId}\n`;
    else data = `WITHDRAW Rs.${req.body.amount} by user with Id: ${req.params.userId}\n`;
    fs.appendFileSync('./Trasactions.txt',data);
    next();
}

// Routes
//Register user
app.post('/user',(req,res)=>{
    let user = req.body;
    console.log(DB.length);
    user.id = (DB.length)> 0 ? DB[DB.length - 1].id + 1: 1;
    user.balance = 0;
    DB.push(user);
    fs.writeFileSync('./DB.json',JSON.stringify(DB));
    res.json(user);
});

//Updater user
app.put('/user/:userId',(req,res)=>{
    const {userId} = req.params;
    for(let i =0 ;i<DB.length;i++){
        if(DB[i].id === Number(userId)){
            DB[i].fname = req.body.fname;
            DB[i].lname = req.body.lname;
            fs.writeFileSync('./DB.json',JSON.stringify(DB));
            res.json(DB[i]);
            return;
        }
    }
    res.status(404);
    res.json({'message':"user not found"});
})

//get user details
app.get('/user/:userId',(req,res)=>{
    const {userId }= req.params;
    const user = DB.find(user => user.id === Number(userId));
    if(user) res.json(user);
    else{
        res.status(404);
        res.json({'message':"user not found"});
    }   
})

//Delete user
app.delete('/user/:userId',(req,res)=>{
    const {userId }= req.params;
    let ind = -1;
    for(let i=0;i<DB.length;i++){
        if(DB[i].id === Number(userId)){
            ind = i;
            break;
        }
    }
    if(ind != -1){
        DB.splice(ind);
        fs.writeFileSync('./DB.json',JSON.stringify(DB));
        res.json({'message':'user deleted successfully'});
    }else{
        res.status(404);
        res.json({'message':"user not found"});
    }
});

//Check balance
app.get('/balance/:userId',(req,res)=>{
    const {userId }= req.params;
    const user = DB.find(user=> user.id === Number(userId));
    if(user) res.json({'balance':user.balance});
    else{
        res.status(404);
        res.json({'message':"user not found"});
    }
});

//Deposit
app.post('/deposit/:userId',logTransaction,(req,res)=>{
    const {userId }= req.params;
    const {amount} = req.body;
    for(let i =0;i<DB.length;i++){
        if(DB[i].id === Number(userId)){
            DB[i].balance += Number(amount);
            res.json(DB[i]);
            fs.writeFileSync('./DB.json',JSON.stringify(DB));
            return;
        }
    }
    res.status(404);
    res.json({'message':"user not found"});
})

//Withdraw
app.post('/withdraw/:userId',logTransaction,(req,res)=>{
    const {userId }= req.params;
    const {amount} = req.body;
    for(let i =0;i<DB.length;i++){
        if(DB[i].id === Number(userId)){
            DB[i].balance -= Number(amount);
            fs.writeFileSync('./DB.json',JSON.stringify(DB));
            res.json(DB[i]);
            return;
        }
    }
    res.status(404);
    res.json({'message':"user not found"});
})

app.listen(PORT,()=>console.log(`Listening on port ${PORT}...`));