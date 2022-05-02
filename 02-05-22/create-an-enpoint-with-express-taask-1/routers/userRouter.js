import  express, { json } from "express";
import cors from 'cors';

import {DB,DBSave} from "../DB.js";

export const userRouter = express.Router();

userRouter.post('/',cors({origin:["http://alloweddomain.com", "http://permitteddomain.com","*"]}),async(req,res)=>{
    const {username , password,age,email} = req.body;
    DB.users.push({id:DB.users.length + 1,username,password,age,email});
    DBSave();
    res.json(DB[DB.length - 1]);
})

userRouter.get("/:userId",cors({origin:["http://alloweddomain.com", "http://permitteddomain.com"]}),async (req,res)=>{
    const {userId} = req.params;
    res.json(DB.users.find(user=>user.id == Number(userId)));
})

userRouter.get('/',(req,res)=>{
    res.json(DB.users);
})