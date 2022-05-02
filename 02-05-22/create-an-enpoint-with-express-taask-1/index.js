import express from 'express';
import fs from 'fs';
import { userRouter } from './routers/userRouter.js';
import { productsRouter } from './routers/productsRouter.js';
import { booksRouter } from './routers/booksRouter.js';

const app = express();
app.use(express.json());
app.use(logger);

// Router
app.use('/users',userRouter);
app.use('/books',booksRouter);
app.use('/products',productsRouter);


app.get('/trackers',(req,res)=>{
    res.json(JSON.parse(fs.readFileSync('./LOGS.json')));
})
app.listen('3000',()=>console.log("Listening..."));


// LOGGER
function logger(req,res,next){
    let logs = JSON.parse(fs.readFileSync('./LOGS.json'));
    logs.push({type:req.method,url:req.url,time:new Date().toISOString()});
    console.log(`${req.method} ${req.url}`);
    fs.writeFileSync("./LOGS.json",JSON.stringify(logs));
    next();
}