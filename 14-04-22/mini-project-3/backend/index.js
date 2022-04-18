import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import {initDB} from './models/models.js';
import {userRouter} from './routes/userRouter.js';
import {feedbackRouter} from './routes/feedbackRouter.js';

import { authenticateUser } from './middlewares/authenticate.js';

const PORT = 3000;

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(initDB);

// Router handlers
app.use('/users',userRouter);
app.use('/feedbacks',feedbackRouter);

app.get('/test',authenticateUser,(req,res)=>{
    res.json("WORKING");
});


app.listen(PORT,()=>console.log(`Listening on port ${PORT}...`));