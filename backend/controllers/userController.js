const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require("nodemailer");
const { deleteUserSubmissions } = require('./submissionController.js');
const { deleteUserFeedbacks } = require('./feedbackController.js');
const { deleteUserVotes } = require('./voteController.js');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'lazydesigner54@gmail.com', // generated ethereal user
        pass: process.env.APP_PASS, // generated ethereal password
    },
});

// GET : Get a User by authToken
exports.getUserByAuthtoken = async (req, res) => {
    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        if(user){
            res.json(user);
        }else{
            res.status(404).json({"message":"User not found"});
        }
    } catch (error) {
        //catching errors 
        console.log(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }
}

// GET : Get a User by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        res.json(user);
    } catch (error) {
        //catching errors 
        console.log(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }
}

// GET : Get a User by ID
exports.getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({username:req.params.username}).select("-password");
        res.json(user);
    } catch (error) {
        //catching errors 
        console.log(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }
}

// POST : Create a User
exports.createUser = async (req, res) => {
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
        const secretKey = process.env.SECRET_KEY;
        let authToken = await jwt.sign(payload, secretKey);

        res.json({ authToken });
        let mail = this.sendMail(user.name, user.email, user._id);
        // console.log(mail);
    } catch (error) {
        res.json({ error });
    }
}

//Send Mail after User Creation
exports.sendMail = async (username, email, user_id) => {
    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Digifinch" <alhabibi@dubai.com>', // sender address
            to: email, // list of receivers
            subject: "Verification Mail", // Subject line
            text: "Verification mail", // plain text body
            html: "<b>Hi " + username + "</b><p>Thank you for joining us, please verify your email,<a href='" + process.env.HOST + "/users/verify/" + user_id + "'>Click Here</a></p > ",
            // html: "<b>Hi " + username + "</b><p>Thank you for joining us, please verify your email,<a href='http://localhost:5000/users/verify/" + user_id + "'> Click Here</a></p > ", 
        });
        return info;
    } catch (error) {
        console.log( error )
    }
}

//Send Custommail : /sendmail
exports.sendCustomMail = async (req,res) => {
    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Digifinch" <alhabibi@dubai.com>', // sender address
            to: req.body.email, // list of receivers
            subject: req.body.subject, // Subject line
            text: req.body.message, // plain text body
            
        });
        // console.log(info);
        if(info.accepted){
            res.send({"message":"Mail sent"})
        }else{
            res.send({"message":"Something is wrong, mail not sent"})
        }
    } catch (error) {
        console.log( error )
        res.send({"message":"Something is wrong, mail not sent"})
    }
}

// Reset Password
exports.resetPassword = async(req,res)=>{
    console.log('inside reset password');
    try {
        let user = await User.findOne({email:req.body.email})
        if(user){
           let info= this.sendResetMail(user.name, user.email, user._id)
           res.send({"message":"Please check your mailbox"});
        }else{
            res.send({"message":"User not found with this email"});
        }

    } catch (error) {
        console.log( error )
        res.send({"message":"Something is wrong, mail not sent"})
    }
}

//Send Mail to RESET password
exports.sendResetMail = async (username, email, user_id) => {
    console.log('inside sending RESET Mail');
    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"DigiFinch" <alhabibi@dubai.com>', // sender address
            to: email, // list of receivers
            subject: "Reset Password", // Subject line
            text: "", // plain text body
            html: "<b>Hi " + username + "</b><p>Click on the given link to reset your password ,<a href='" + process.env.CLIENT + "/reset-password/" + user_id + "'>Click Here</a></p > ",
            // html: "<b>Hi " + username + "</b><p>Thank you for joining us, please verify your email,<a href='http://localhost:5000/users/verify/" + user_id + "'> Click Here</a></p > ", 
        });
        return info;
    } catch (error) {
        console.log( error )
    }
}

//set new password
exports.setNewPassword = async(req,res)=>{
    console.log('inside Set NEW password');
    try {
        userID = req.params.id;
        let salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.findByIdAndUpdate(userID,{
            password: secPass
        });
        res.send({"message":"Password Changed"});
    } catch (error) {
        console.log( error )
        res.send({"message":"Something is wrong, mail not sent"})
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if(user){
            console.log('agya user',user);
            await User.findByIdAndUpdate(id,{is_verified:1})
        }
        res.send('Email Verified Successfully');
    } catch (error) {
        res.json({error})
    }
}

// POST : Authenticate a User
exports.loginUser = async (req, res) => {
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
            const secretKey = process.env.SECRET_KEY;
            let authToken = await jwt.sign(payload, secretKey);
            res.json({ authToken });
        } else {
            res.json({ "error": "Please login with correct credentials" });
        }

    } catch (error) {
        res.json({ error });
    }
}

// POST : Authenticate an ADMIN
exports.loginAdmin = async (req, res) => {
    const errors = validationResult(req);
    //validation check post
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            if (user.role === 1) {
                console.log('user role OK');
                let hash = user.password;
                let verified = bcrypt.compareSync(req.body.password, hash);

                const payload = {
                    id: user.id
                }
                if (verified) {
                    const secretKey = process.env.SECRET_KEY;
                    let authToken = await jwt.sign(payload, secretKey);
                    res.json({ authToken });
                } else {
                    res.json({ "error": "Please login with correct credentials" });
                }

            } else {
                res.status(401).send({ "error": "Unauthorized : Access Denied" });
            }
        } else {
            res.status(400).json({ "error": "Please login with correct credentials" });
        }
    } catch (error) {
        res.json({ error });
    }
}

// PUT : Update a User
exports.updateUser = async (req, res) => {
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

}

// DELETE : Delete a User (self)
exports.deleteUser = async (req, res) => {
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
        await deleteUserSubmissions(userID);
        await deleteUserFeedbacks(userID);
        await deleteUserVotes(userID);
        console.log(user);
        res.json({ "success": "User Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ "message": "Server Error Occured" });
    }
}

// PUT : Update a User by Admin
exports.updateUserByAdmin = async (req, res) => {
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

}

// Delete a user by ADMIN
exports.deleteUserByAdmin = async (req, res) => {
    try {
        userID = req.params.id;
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
        await deleteUserSubmissions(userID);
        await deleteUserFeedbacks(userID);
        await deleteUserVotes(userID);
        console.log(user);
        res.json({ "success": "User Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ "message": "Server Error Occured" });
    }
}

// POST : Get All Users
exports.getAllUsers = async (req, res) => {
    // console.log('inside getAll Users');
    try {
        const users = await User.find().select("-password");
        // console.log('users : ',users)
        res.json(users);
    } catch (error) {
        //catching errors 
        console.log(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }
}

// Delete Profile Photo
exports.deleteProfilePhoto = async (req, res) => {
    try {
        userID = req.user.id;
        if (req.body.photo_url) {
            let photo_url = `./public/uploads/profile/${req.body.photo_url}`
            if (fs.existsSync(photo_url)) {
                // console.log('value of existsSync : ',fs.existsSync(url))
                fs.unlinkSync(photo_url);
            }
            const user = await User.findByIdAndUpdate(userID, {
                photo_url: ''
            }, { new: true });
            res.send(user);
        } else {
            res.status(401).json({ "message": "Please provide Photo Url" });
        }
    } catch (error) {
        //catching errors 
        console.log(error);
        res.status(500).json({ "message": "Server Error Occured" });
    }
}

// Set Profile Photo
exports.setProfilePhoto = async (req, res) => {
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

}