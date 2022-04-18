import { User } from '../models/models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';


export const registerUser = async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        const user = await User.findOne({username:username});
        if(user){
            res.status(409);
            res.json({message:'User already exists'});
            return;
        }
        bcrypt.hash(password, 10, async function(err, hash) {
            let user = new User({username:username,email:email,hash:hash});
            await user.save();
            res.json(_.omit(user,['hash']));
        });
    }catch(err){
        res.status(500);
        res.json(err);
    }
}

export const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email})
        bcrypt.compare(password, user.hash, async function(err, result) {
            if(err || !result){
                res.status(400);
                res.json({message:'Invalid password'});
                return;
            }
            var token = jwt.sign({ userId: user._id }, "KVEYVK^#V%^Fftivyf76267542tVHTC2C");
            res.json({token:token});
        });
    }catch(err){
        res.status(500);
        res.json(err);
    }
}