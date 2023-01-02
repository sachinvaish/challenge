const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback.js');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

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
            submission_id : "63749eca6057278e2f24b74a",
            user_id : req.user.id,
            feedback : req.body.feedback
        });

        res.json({feedback });
    } catch (error) {
        res.json({ error });
    }
})

//Get List of submissions by Challenge ID
router.get('/:submission_id', async (req, res) => {
    try {
        let feedbacks = await Feedback.find({ submission_id: req.params.submission_id });
        res.send(feedbacks);
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;