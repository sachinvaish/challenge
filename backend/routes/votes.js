const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote.js');
const fetchuser = require('../middleware/fetchuser');

//POST voteToggle
router.post('/', fetchuser, async(req, res) => {
    try {
        let submission_id = req.body.submission_id;
        let user_id = req.user.id;
        // console.log(submission_id,user_id);
        let vote = await Vote.findOne({user_id :user_id, submission_id :submission_id});
        // res.send(vote);
        if(!vote){
            await Vote.create({
                submission_id : submission_id,
                user_id : user_id
            })
            res.json({"UpVoted":"You upvoted for the submission"});
        }else{
            await Vote.findOneAndDelete({"_id":vote._id});
            res.json({"DownVoted":"You down voted for the submission"});
        }
    } catch (error) {
        res.status(500).send({"error":"Internal Server Error"});
    }
})


router.get('/:submission_id', async(req,res)=>{
    try {
        let votes = await Vote.find({submission_id : req.params.submission_id});
        let votesCount = votes.length;
        // console.log(votes);
        res.send({votesCount});
    } catch (error) {
        console.log(error);
        res.status(500).send({"error":"Internal Server Error"});
    }
})

router.get('/isliked/:submission_id/:user_id',async (req,res)=>{
    try {
        let upvote = await Vote.find({submission_id : req.params.submission_id,user_id : req.params.user_id});
        let isLiked = false;
        if(upvote.length > 0){
            isLiked = true;
        }
        res.send({isLiked});
    } catch (error) {
        console.log(error);
        res.status(500).send({"error":"Internal Server Error"});
    }
})



module.exports = router;