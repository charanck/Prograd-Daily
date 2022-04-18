import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:"Username is required",
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:"Email address is required",
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    hash:{
        type:String,
        required:true
    }
});