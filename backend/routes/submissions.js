const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission.js');
const fetchuser = require('../middleware/fetchuser');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/submissions/' });

// POST : Create a Submission
router.post('/',[fetchuser, upload.single('image')], [
    body('photo_url', 'Photo URL cannot be Empty').notEmpty(),
    body('description', 'Description cannot be Empty').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    console.log(req);
    //validation check post
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = req.user.id;
        if (!user) {
            return res.status(404).send({"error":"Login required"});
        }
        let submission = await Submission.create({
            challenge_id : "63748a4dfcc73c064df4c744",
            user_id : req.user.id,
            photo_url : req.body.photo_url,
            description : req.body.description
        });

        res.json({ submission });
    } catch (error) {
        res.json({ error });
    }
})

module.exports = router;