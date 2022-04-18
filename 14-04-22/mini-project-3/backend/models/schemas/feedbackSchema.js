import mongoose from "mongoose";

export const feedbackSchema = new mongoose.Schema({
    question:{
        type:String,
        required:"Question is required",
        trim:true,
    },
    answer:{
        type:String,
        trim:true, 
    },
    dependentOn:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    },
    answeredOn:{
        type:Date,
        default: Date.now
    },
    answeredByName:{
        type:String,
        trim:true,
    },
    answeredByEmail:{
        type:String,
        trim:true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})