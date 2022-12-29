const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission.js');
const fetchuser = require('../middleware/fetchuser');
const multer  = require('multer');

const upload = multer({ 
    storage : multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, 'uploads/submissions');
        },
        filename : (req, file, cb)=>{
            let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, file.fieldname + "-" + Date.now() + ext);
            console.log('multer upload called');
        }
    })
}).single('image');

// router.post('/upload', upload, async(req,res)=>{
//     // console.log(req.file);
// })

// POST : Create a Submission
router.post('/',[upload,fetchuser], [
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
            return res.status(404).send({"error":"Login required"});
        }
        // console.log(req.file);
        
        let submission = await Submission.create({
            challenge_id : "63748a4dfcc73c064df4c744",
            user_id : req.user.id,
            photo_url : req.file.path,
            description : req.body.description,
            feedback : req.body.feedback
        });

        res.json({ submission, message:'Thanks for participation, Your Design has been submitted successfully' });
    } catch (error) {
        res.json({ error });
    }
})

module.exports = router;