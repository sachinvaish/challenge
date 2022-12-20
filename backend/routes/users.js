const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// GET : Get a User
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.json(user);
     } catch (error) {
        //catching errors 
        console.log(error);
        res.status(500).json({ "message": "Server Error Occured" });
     }
})

// POST : Create a User
router.post('/signup', [
    body('username', 'Name cannot be Empty').notEmpty(),
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Password must be min 8 characters').isLength(8)
], async (req, res) => {
    const errors = validationResult(req);
    //validation check post
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ "error": "User already exists with this email" });
        }

        let salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass,
            photo_url: req.body.photo_url,
            portfolio_url: req.body.portfolio_url,
            instagram_url: req.body.instagram_url
        });

        const payload = {
            id: user.id
        }
        const secretKey = "ChallengeWebsite#1";
        let authToken = await jwt.sign(payload, secretKey);
        res.json({ authToken });
    } catch (error) {
        res.json({ error });
    }
})


// POST : Authenticate a User
router.post('/login', [
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Password must be min 8 characters').isLength(8)
], async (req, res) => {
    const errors = validationResult(req);
    //validation check post
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({"error":"Please login with correct credentials"});
        }
        let hash = user.password;
        let verified = bcrypt.compareSync(req.body.password, hash);

        const payload = {
            id: user.id
        }
        if(verified){
            const secretKey = "ChallengeWebsite#1";
            let authToken = await jwt.sign(payload, secretKey);
            res.json({ authToken });
        }else{
            res.json({"error":"Please login with correct credentials"});
        }
        
    } catch (error) {
        res.json({ error });
    }
})

// PUT : Update a User
router.put('/update', fetchuser, [
    body('name', 'Name cannot be Empty').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    //validation check post
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        userID = req.user.id;
        const user = await User.findByIdAndUpdate(userID,{
            name: req.body.name,
            photo_url: req.body.photo_url,
            portfolio_url: req.body.portfolio_url,
            instagram_url: req.body.instagram_url
        },{new:true})
        res.json(user);
     } catch (error) {
        //catching errors 
        console.error(error);
        res.status(500).json({ "message": "Server Error Occured" });
     }
    
})

module.exports = router;