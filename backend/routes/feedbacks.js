const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback.js');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const isAdmin = require('../middleware/isAdmin.js');

// POST Create a feedback
router.post('/',fetchuser,[
    body('feedback','Feedback cannot be empty').notEmpty()
], async (req,res)=>{
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
})

//Get List of feedbacks by submission ID
router.get('/:submission_id', async (req, res) => {
    // console.log('submission id', req.params.submission_id);
    try {
        let feedbacks = await Feedback.find({ submission_id: req.params.submission_id });
        // console.log('got feedacks', feedbacks)
        res.send(feedbacks);
    } catch (error) {
        console.log(error);
    }
})

//Get feedbacksCount by submission ID
router.get('/getfeedbackscount/:submission_id', async (req, res) => {
    // console.log('submission id', req.params.submission_id);
    try {
        let feedbacks = await Feedback.find({ submission_id: req.params.submission_id });
        // console.log('got feedacks', feedbacks)
        let count = feedbacks.length
        res.send({count});
    } catch (error) {
        console.log(error);
    }
})

// delete all Feedbacks for a user
// when a user account is deleted, this API should be hit
router.delete('/:user_id', async (req, res) => {
    try {
        let feedback = await Feedback.deleteMany({ user_id: req.params.user_id });
        res.json({"message":"All Feedbacks Deleted for this User"});

    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": "Internal Server Error" });
    }
})

// Delete a feedback by ADMIN
router.delete('/:feedback_id', fetchuser,isAdmin, async (req, res) => {
    try {
        feedbackID = req.params.feedback_id;
        console.log(feedbackID);
        feedback = await Feedback.findByIdAndDelete(feedbackID);
        console.log(feedback);
        res.json({ "success": "Feedback Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ "message": "Server Error Occured" });
    }
})

module.exports = router;