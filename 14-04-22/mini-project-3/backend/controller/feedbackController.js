import { Feedback } from '../models/models.js';

export const getAllFeedbacks = async (req,res)=>{
    try{
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    }catch(err){
        res.json(err);
    }
}

export const createFeedback = async(req,res)=>{
    try{
        let {question,answer,answeredByName,answeredByEmail,dependentOn} = req.body;
        if(dependentOn){
            dependentOn = await Feedback.findById(dependentOn);
        }else{
            dependentOn = null;
        }
        const feedback = new Feedback({question:question,answer:answer,answeredByName:answeredByName,answeredByEmail:answeredByEmail,dependentOn:dependentOn});
        await feedback.save();
        res.json(feedback);
    }catch(err){
        console.log(err);
        res.json(err);
    }
}

export const deleteFeedback = async (req,res)=>{
    const { feedbackId } = req.params;
    await _deleteFeedback(feedbackId);
    res.json({message:"Feedback deleted successfully"});
}

// Helpers
const _deleteFeedback = async (feedbackId)=>{
    if(!feedbackId) return;

    const currentFeedback = await Feedback.findById(feedbackId);
    const dependentFeedbacks = await Feedback.find({dependentOn:currentFeedback});
    dependentFeedbacks.forEach(async (feedback)=>{
        await _deleteFeedback(feedback._id);
    });
    await currentFeedback.delete();
}
