const mongoose = require('mongoose');

const MONGOURI = `mongodb+srv://admin:admin@cluster0.obmxw.mongodb.net/withmongoose?retryWrites=true&w=majority`;

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

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required:'Password address is required',
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Please enter valid password']
    }
});

const User = mongoose.model('User',userSchema);

async function initDB(req,res,next){
    await getDB();
    next();
}


module.exports.User = User;
module.exports.initDB = initDB;