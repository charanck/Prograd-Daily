const express = require('express');
const {User} = require('./models');

const router = express.Router();

router.get('/',async (req,res)=>{
    const users = await User.find({});
    res.json(users)
});

router.get('/:userId',async (req,res)=>{
    try{
        const {userId} = req.params;
        const user = await User.findById(userId);
        res.json(user);
    }catch(err){
        res.json(err);
    }
})

router.post('/',async (req,res)=>{
    const{name,email,password} = req.body;
    try{
        const user = new User({name:name,email:email,password:password});
        await user.save();
        res.json({message:'user saved successfully'})
    }catch(err){
        res.json(err);
    }
});

router.put('/:userId',async (req,res)=>{
    try{
        const {userId} = req.params
        let user = await User.findById(userId);
        const {name,email,password} = req.body;
        user.name = name;
        user.email = email;
        user.password = password;
        user.save();
        res.json({message:'user changes saved succcessfully'});
    }catch(err){
        res.json(err);
    }
});

router.delete('/:userId',async (req,res)=>{
    try{
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.json({message:'user deleted successfully'});
    }catch(err){
        res.json(err);
    }
});

module.exports.userRouter = router;

