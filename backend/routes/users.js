const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

// GET : Get a User
router.get('/',async (req,res)=>{
    res.send("GET Method called");
})

// POST : Create a User
router.post('/',[
    body('name','Name cannot be Empty').notEmpty(),
    body('email','Please enter a valid Email').isEmail(),
    body('password','Password must be min 8 characters').isLength(8)
],async(req,res)=>{
    const errors = validationResult(req);
   //validation check post
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let user = await User.findOne({ email : req.body.email})
    if (user) {
        return res.status(400).json({ "error": "User already exists with this email" });
     }

    let salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);

    user = User.create({
        name : req.body.name,
        email : req.body.email,
        password : secPass,
        photo_url : req.body.photo_url,
        portfolio_url : req.body.portfolio_url,
        instagram_id : req.body.instagram_id
    });
   
    res.send("User Created Successfully");
})


// PUT : Update a User
router.put('/',(req,res)=>{
    console.log("PUT Method called");
})

// DELETE : Delete a User
router.delete('/',(req,res)=>{
    console.log("DELETE Method called");
})

module.exports = router;