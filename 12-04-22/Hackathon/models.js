import mongoose from 'mongoose';

const MONGOURI = `mongodb+srv://admin:admin@cluster0.obmxw.mongodb.net/hackathon?retryWrites=true&w=majority`;

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

const stockSchema = new mongoose.Schema({
    stockSymbol:{
        type:String,
        required:true
    },
    value:{
        type:Object,
        required:true
    }
});

export const Stock = mongoose.model('Stock',stockSchema);


