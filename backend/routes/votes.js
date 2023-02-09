const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote.js');
const fetchuser = require('../middleware/fetchuser');
const { toggleVote, getVotesBySubmission, deleteUserVotes, isLiked, deleteSubmissionVotes } = require('../controllers/voteController.js');
const isAdmin = require('../middleware/isAdmin.js');

//POST voteToggle
router.post('/', fetchuser, toggleVote)

//Get Votes by Submission ID
router.get('/:submission_id', getVotesBySubmission)

// delete all votes for a user
// when a user account is deleted, this API should be hit
// router.delete('/user/:user_id',fetchuser, deleteUserVotes)

// delete all votes for a Submission
// when a Submission is deleted, this API should be hit
// router.delete('/submission/:submission_id', fetchuser, isAdmin, deleteSubmissionVotes);

//Check whether the logged in User has liked the post
router.get('/isliked/:submission_id/:user_id', isLiked)



module.exports = router;