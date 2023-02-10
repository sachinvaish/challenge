const Feedback = require('../models/Feedback.js');
const { body, validationResult } = require('express-validator');

// POST Create a feedback
exports.createFeedback = async (req,res)=>{
    const errors = validationResult(req);
    //validation check post
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = req.user.id;
        if (!user) {
            return res.status(404).send({"error":"Login required"});
        }
        let feedback = await Feedback.create({
            submission_id : req.body.submission_id,
            user_id : req.user.id,
            feedback : req.body.feedback
        });

        res.json({feedback });
    } catch (error) {
        res.json({ error });
    }
}


//Get List of feedbacks by submission ID
exports.getFeedbacksBySubmission = async (req, res) => {
    // console.log('submission id', req.params.submission_id);
    try {
        let feedbacks = await Feedback.find({ submission_id: req.params.submission_id });
        // console.log('got feedacks', feedbacks)
        res.send(feedbacks);
    } catch (error) {
        console.log(error);
    }
}

//Get Feedback by ID
exports.getFeedbackById = async(req,res)=>{
    try{
        let feedback = await Feedback.findById(req.params.id);
        res.send(feedback);
    }catch (error) {
        console.log(error);
    }
}

//Get feedbacksCount by submission ID
exports.getFeedbackCountBySubmission = async (req, res) => {
    // console.log('submission id', req.params.submission_id);
    try {
        let feedbacks = await Feedback.find({ submission_id: req.params.submission_id });
        // console.log('got feedacks', feedbacks)
        let count = feedbacks.length
        res.send({count});
    } catch (error) {
        console.log(error);
    }
}

// delete all Feedbacks for a user
// when a user account is deleted, this API should be hit
exports.deleteUserFeedbacks = async (user_id) => {
    try {
        let feedback = await Feedback.deleteMany({ user_id: user_id });
        console.log('inside deleteUserFeedbacks :', feedback);
        // res.json({"message":"All Feedbacks Deleted for this User"});

    } catch (error) {
        console.log(error);
        // res.status(500).send({ "error": "Internal Server Error" });
    }
}

// delete all Feedbacks for a Submission
// when a Submission is deleted, this API should be hit
exports.deleteSubmissionFeedbacks = async (submission_id) => {
    try {
        let feedback = await Feedback.deleteMany({ submission_id: submission_id });
        // res.json({"message":"All Feedbacks Deleted for this Submission"});

    } catch (error) {
        console.log(error);
        // res.status(500).send({ "error": "Internal Server Error" });
    }
}

// Delete a feedback by ADMIN
exports.deleteFeedbackByAdmin = async (req, res) => {
    try {
        feedbackID = req.params.feedback_id;
        console.log(feedbackID);
        feedback = await Feedback.findByIdAndDelete(feedbackID);
        console.log(feedback);
        res.json({ "success": "Feedback Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ "message": "Server Error Occured" });
    }
}