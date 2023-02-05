const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote.js');
const fetchuser = require('../middleware/fetchuser');
const { toggleVote, getVotesBySubmission, deleteUserVotes, isLiked } = require('../controllers/voteController.js');

//POST voteToggle
router.post('/', fetchuser, toggleVote)

//Get Votes by Submission ID
router.get('/:submission_id', getVotesBySubmission)

// delete all votes for a user
// when a user account is deleted, this API should be hit
router.delete('/:user_id',deleteUserVotes)

//Check whether the logged in User has liked the post
router.get('/isliked/:submission_id/:user_id', isLiked)



module.exports = router;