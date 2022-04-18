import mongoose from 'mongoose';
import { userSchema } from './schemas/userSchema.js';
import { feedbackSchema } from './schemas/feedbackSchema.js';

const MONGOURI = `mongodb+srv://admin:admin@cluster0.obmxw.mongodb.net/miniProject3?retryWrites=true&w=majority`;

function getDB(){
    return new Promise(async (resolve,reject)=>{
        try{
            await mongoose.connect(MONGOURI);
            resolve()
        }catch(err){
            reject(err);
        }
    });
}

export async function initDB(req,res,next){
    await getDB();
    next();
}

export const User = mongoose.model('User',userSchema);
export const Feedback = mongoose.model('Feedback',feedbackSchema);


