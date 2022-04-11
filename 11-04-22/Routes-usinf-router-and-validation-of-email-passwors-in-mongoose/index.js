const express = require('express');

const {initDB} = require('./models');
const {userRouter} = require('./routes');

const app = express();

app.use(express.json());
app.use(initDB);

app.use('/users',userRouter);

app.listen(3000,()=>console.log('Listening...!!!'));




