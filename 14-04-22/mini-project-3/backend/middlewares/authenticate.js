import jwt from 'jsonwebtoken';
import { User } from '../models/models.js';

export const authenticateUser = async (req,res,next)=>{
    const token = req.headers.token;
    jwt.verify(token,'KVEYVK^#V%^Fftivyf76267542tVHTC2C',async (err,decoded)=>{
        const userId = decoded.userId;
        const user = await User.findById(userId);
        if(!user){
            res.status(404);
            res.json({message:'user not found or invalid token'});
            return;
        }
        next();
    })
}