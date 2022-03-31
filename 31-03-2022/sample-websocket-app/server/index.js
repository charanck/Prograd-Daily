const ws = require('ws');

const socket = new ws.WebSocketServer({port:3000})

socket.on('connection',(ws)=>{
    console.log("Connected to the client");
    ws.on('message',(message)=>{
        let tempObj = JSON.parse(message.toString());
        tempObj.fullname = tempObj.fname + " " + tempObj.lname;
        tempObj.greet  = `Hello ${tempObj.fname} ${tempObj.lname}, Have a goodday!`
        ws.send(JSON.stringify(tempObj));
    })
});