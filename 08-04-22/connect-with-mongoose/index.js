const express = require("express");
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
    age:{
        type:Number,
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
    }
});

const User = mongoose.model('User',userSchema);


const app = express();
app.use(express.json());

app.get('/users',async (req,res)=>{
    await getDB();
    try{
        const users = await User.find();
        res.json(users)
    }catch(err){
        res.json(err);
    }
});

app.get('/users/:userId',async (req,res)=>{
    await getDB();
    try{
        const {userId} = req.params;
        const user = await User.findById(userId);
        res.json(user);
    }catch(err){
        res.json(err);
    }
})

app.post('/users',async (req,res)=>{
    await getDB();
    try{
        const {name,age,email} = req.body;
        const user = new User({name:name,age:Number(age),email:email});
        await user.save();
        res.json({message:'user saved successfully'})
    }catch(err){
        console.log(err);
        if(err) res.json(err);
    }
});

app.put('/users/:userId',async (req,res)=>{
    await getDB();
    try{
        const {userId} = req.params
        let user = await User.findById(userId);
        const {name,age,email} = req.body;
        user.name = name;
        user.age = Number(age);
        user.email = email;
        user.save();
        res.json({message:'user changes saved succcessfully'});
    }catch(err){
        res.json(err);
    }
})

app.delete('/users/:userId',async (req,res)=>{
    await getDB();
    try{
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.json({message:'user deleted successfully'});
    }catch(err){
        res.json(err);
    }
});



app.listen(3000,()=>console.log('Listening...'))


