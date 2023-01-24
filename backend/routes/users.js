const express = require('express');
const fs = require('fs');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const multer = require('multer');
const isAdmin = require('../middleware/isAdmin.js');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            uploadPath = './public/uploads/profile/'
            fs.mkdirSync(uploadPath, { recursive: true })
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, file.fieldname + "-" + Date.now() + ext);
        }
    })
}).single('profilePhoto');

router.put('/setphoto', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        let photo_url = await User.findById(userID).select('photo_url');

        uploadPath = './public/uploads/profile/';
        fs.mkdirSync(uploadPath, { recursive: true })
        // console.log('photourl',photo_url);
        if (photo_url.photo_url) {
            let url = `./public/uploads/profile/${photo_url.photo_url}`
            if (fs.existsSync(url)) {
                // console.log('value of existsSync : ',fs.existsSync(url))
                fs.unlinkSync(url);
            }
        }

        var data = req.body.photo.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(data, "base64");
        // console.log('buffer is ', buffer);
        const pathName = userID + Date.now();
        const image = fs.writeFileSync(`./public/uploads/profile/${pathName}.jpg`, buffer);
        const user = await User.findByIdAndUpdate(userID, {
            photo_url: `${pathName}.jpg`
        }, { new: true });
        res.send(user);

    } catch (error) {
        //catching errors 
        console.log(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }

})

router.delete('/deletephoto', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        if(req.body.photo_url){
            let photo_url = `./public/uploads/profile/${req.body.photo_url}`
            if (fs.existsSync(photo_url)) {
                // console.log('value of existsSync : ',fs.existsSync(url))
                fs.unlinkSync(photo_url);
            }
            const user = await User.findByIdAndUpdate(userID, {
                photo_url: ''
            }, { new: true });
            res.send(user);
        }else{
            res.status(401).json({ "message": "Please provide Photo Url" });
        }
    } catch (error) {
        //catching errors 
        console.log(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }
})

// router.put('/setphoto', [upload, fetchuser], async (req, res) => {
//     console.log('file is', req.file);
//     try {
//         userID = req.user.id;
//         let photo_url = await User.findById(userID).select('photo_url');
//         photo_url = `./public/uploads/profile/${photo_url.photo_url}`
//         if (fs.existsSync(photo_url))
//             fs.unlinkSync(photo_url);
//         console.log('after unlink file is', req.file);
//         const user = await User.findByIdAndUpdate(userID, {
//             photo_url: req.file.filename
//         }, { new: true });
//         res.json(user);
//     } catch (error) {
//         //catching errors 
//         console.log(error);
//         res.status(500).json({ "message": "Server Error Occured" });
//     }
// })

// GET : Get a User by authToken
router.get('/', fetchuser, async (req, res) => {
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

// GET : Get a User by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
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
            name: req.body.name,
            email: req.body.email,
            password: secPass
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
            return res.status(400).json({ "error": "Please login with correct credentials" });
        }
        let hash = user.password;
        let verified = bcrypt.compareSync(req.body.password, hash);

        const payload = {
            id: user.id
        }
        if (verified) {
            const secretKey = "ChallengeWebsite#1";
            let authToken = await jwt.sign(payload, secretKey);
            res.json({ authToken });
        } else {
            res.json({ "error": "Please login with correct credentials" });
        }

    } catch (error) {
        res.json({ error });
    }
})

// PUT : Update a User
router.put('/', fetchuser, [
    body('username', 'username cannot be Empty').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    //validation check post
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        userID = req.user.id;
        if (req.body.user_id === userID) {
            const user = await User.findByIdAndUpdate(userID, {
                name: req.body.name,
                username: req.body.username,
                designation: req.body.designation,
                location: req.body.location,
                about: req.body.about,
                facebook_url: req.body.facebook_url,
                instagram_url: req.body.instagram_url,
                twitter_url: req.body.twitter_url,
                linkedin_url: req.body.linkedin_url,
                portfolio_url: req.body.portfolio_url
            }, { new: true })
            res.json(user);
        } else {
            res.status(500).json({ "error": 'Authorization failed' });
        }
    } catch (error) {
        //catching errors 
        console.error(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }

})

router.delete('/', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        let photo_url = await User.findById(userID).select('photo_url');
        uploadPath = './public/uploads/profile/';
        // console.log('photourl',photo_url);
        if (photo_url.photo_url) {
            let url = `./public/uploads/profile/${photo_url.photo_url}`
            if (fs.existsSync(url)) {
                // console.log('value of existsSync : ',fs.existsSync(url))
                fs.unlinkSync(url);
            }
        }
        user = await User.findByIdAndDelete(userID);
        console.log(user);
        res.json({ "success": "User Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ "message": "Server Error Occured" });
    }
})

// ADMIN ROUTES
// PUT : Update a User by Admin
router.put('/admin', fetchuser, isAdmin, async (req, res) => {
    const errors = validationResult(req);
    //validation check post
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        if (req.body.id) {
            userID = req.body.id
            const user = await User.findByIdAndUpdate(userID, {
                role: req.body.role,
                name: req.body.name,
                designation: req.body.designation,
                location: req.body.location,
                about: req.body.about,
                facebook_url: req.body.facebook_url,
                instagram_url: req.body.instagram_url,
                twitter_url: req.body.twitter_url,
                linkedin_url: req.body.linkedin_url,
                portfolio_url: req.body.portfolio_url
            }, { new: true })
            res.json({ "success": "User Updated Successfully" });
        } else {
            res.status(500).json({ "error": 'User ID required' });
        }
    } catch (error) {
        //catching errors 
        console.error(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }

})

// Delete a user by ADMIN
router.delete('/', isAdmin, async (req, res) => {
    try {
        userID = req.body.user_id;
        //deleting photo
        let photo_url = await User.findById(userID).select('photo_url');
        uploadPath = './public/uploads/profile/';
        // console.log('photourl',photo_url);
        if (photo_url.photo_url) {
            let url = `./public/uploads/profile/${photo_url.photo_url}`
            if (fs.existsSync(url)) {
                // console.log('value of existsSync : ',fs.existsSync(url))
                fs.unlinkSync(url);
            }
        }
        user = await User.findByIdAndDelete(userID);
        console.log(user);
        res.json({ "success": "User Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ "message": "Server Error Occured" });
    }
})

// POST : Get All Users
router.post('/getallusers', async (req, res) => {
    console.log('inside getAll Users');
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        //catching errors 
        console.log(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }
})

module.exports = router;