const express = require('express');
const fs= require('fs');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission.js');
const fetchuser = require('../middleware/fetchuser');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {

            uploadPath = './public/uploads/submissions/'
            fs.mkdirSync(uploadPath, { recursive: true })
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, file.fieldname + "-" + Date.now() + ext);
        }
    })
}).single('image');

// router.post('/upload', upload, async(req,res)=>{
//     // console.log(req.file);
// })

// POST : Create a Submission
router.post('/', [upload, fetchuser], [
    body('description', 'Description cannot be Empty').notEmpty()
], async (req, res, next) => {
    const errors = validationResult(req);
    //validation check post
    // console.log(req.file);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = req.user.id;
        if (!user) {
            return res.status(404).send({ "error": "Login required" });
        }
        console.log(req.file);

        let submission = await Submission.create({
            challenge_id: "63748a4dfcc73c064df4c744",
            user_id: req.user.id,
            photo_url: req.file.filename,
            description: req.body.description,
            feedback: req.body.feedback
        });

        res.json({ submission, message: 'Thanks for participation, Your Design has been submitted successfully' });
    } catch (error) {
        res.json({ error });
    }
})

//Get List of submissions by Challenge ID
router.get('/contest/:challenge_id', async (req, res) => {
    try {
        let submissions = await Submission.find({ challenge_id: req.params.challenge_id });
        res.send(submissions);
    } catch (error) {
        console.log(error);
    }
})

//Get SINGLE submission by Submission ID
router.get('/:id', async (req, res) => {
    try {
        let submission = await Submission.findById(req.params.id);
        res.send(submission);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;