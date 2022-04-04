const express = require('express');

const app = express();

const USERS = [
    {
        id:1,
        name:'charan',
    },
    {
        id:2,
        name:'Srihari',
    },
    {
        id:3,
        name:'Khavin',
    }
]
app.get('/users',(req,res)=>{
    res.json(USERS)
});

app.get('/users/:id',(req,res)=>{
    const user = USERS.filter(user => user.id == Number(req.params.id));
    res.json(user);
})

app.listen('3000',()=>console.log(`Listening on 3000...`))