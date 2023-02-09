const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback.js');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const isAdmin = require('../middleware/isAdmin.js');
const { createFeedback, getFeedbacksBySubmission, getFeedbackCountBySubmission, deleteUserFeedbacks, deleteFeedbackByAdmin, deleteSubmissionFeedbacks } = require('../controllers/feedbackController.js');

// POST Create a feedback
router.post('/',fetchuser,[
    body('feedback','Feedback cannot be empty').notEmpty()
], createFeedback)

//Get List of feedbacks by submission ID
router.get('/:submission_id', getFeedbacksBySubmission)

//Get feedbacksCount by submission ID
router.get('/getfeedbackscount/:submission_id', getFeedbackCountBySubmission)

// delete all Feedbacks for a user
// when a user account is deleted, this API should be hit
// router.delete('/user/:user_id', deleteUserFeedbacks)

// delete all Feedbacks for a Submission
// when a Submission is deleted, this API should be hit
// router.delete('/submission/:submission_id', deleteSubmissionFeedbacks)

// Delete a feedback by ADMIN
router.delete('/:feedback_id', fetchuser,isAdmin, deleteFeedbackByAdmin)

module.exports = router;