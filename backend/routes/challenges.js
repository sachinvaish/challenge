const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Challenge = require('../models/Challenge.js');


// POST : Create a Challenge
router.post('/', [
    body('title', 'Name cannot be Empty').notEmpty(),
    body('description', 'Description cannot be Empty').notEmpty(),
    body('due_date', 'Please specify Due Date').isDate(),
    body('winner_prize', 'Specify Winner Prize in Number').isNumeric(),
    body('runner_prize', 'Specify Runner up Prize in Number').isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    //validation check post
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let challenge = await Challenge.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            winner_prize: req.body.winner_prize,
            runner_prize: req.body.runner_prize
        });

        res.json({ challenge });
        console.log('successfull');
    } catch (error) {
        res.json({ error });
    }
})

// GET : Get a Challenge by ID
router.get('/:id', async (req, res) => {
    try {
        challengeID = req.params.id;
        const challenge = await Challenge.findById(challengeID);
        res.json(challenge);
    } catch (error) {
        //catching errors 
        console.error(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }
})


// PUT : Update a Challenge
router.put('/:id', [body('title', 'Name cannot be Empty').notEmpty(),
body('description', 'Description cannot be Empty').notEmpty(),
body('due_date', 'Please specify Due Date').isDate(),
body('winner_prize', 'Specify Winner Prize in Number').isNumeric(),
body('runner_prize', 'Specify Runner up Prize in Number').isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    //validation check post
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        challengeID = req.params.id;
        const challenge = await Challenge.findByIdAndUpdate(challengeID, {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            winner_prize: req.body.winner_prize,
            runner_prize: req.body.runner_prize
        }, { new: true })
        res.json(challenge);
    } catch (error) {
        //catching errors 
        console.error(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }

})

//PUT Delete a challenge by ID
router.delete('/:id',async (req,res)=>{
    try {
       let challenge = await Challenge.findById(req.params.id);
       if(!challenge){
          return res.status(404).send({"error" : "Not Found"});
       }
       await Challenge.findByIdAndDelete(req.params.id)
       return res.json({"Success":"Challenge Deleted Successfully"});
    } catch (error) {
       console.error(error);
       res.status(500).send("Some Error Occured");
    }
 
 })

module.exports = router;