const express = requires('express');

const app = express();

let users = [];

app.post('/user',(req,res)=>{
    let user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.json(user);
});

app.get('/user',(req,res)=>{
    res.json(users[users.length - 1]);
});

app.delete('/user',(req,res)=>{
    const user = users.pop();
    res.json(user);
})

app.all('/*',(req,res)=>{
    res.status(404);
    res.json({'message':'Page not found'});
})

app.listen(3000,()=> console.log('Listening on 3000...'));