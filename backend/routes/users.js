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
const { getUserByAuthtoken, getUserById, createUser, loginUser, loginAdmin, updateUser, deleteUser, updateUserByAdmin, deleteUserByAdmin, getAllUsers, deleteProfilePhoto, setProfilePhoto, sendMail, verifyEmail, getUserByUsername, sendCustomMail, setNewPassword, resetPassword } = require('../controllers/userController.js');

// Set Profile Photo
router.put('/setphoto', fetchuser, setProfilePhoto)

// Delete Profile Photo
router.delete('/deletephoto', fetchuser, deleteProfilePhoto)

// GET : Get a User by authToken
router.get('/', fetchuser, getUserByAuthtoken);

// GET : Get a User by ID
router.get('/id/:id', getUserById);

// GET : Get a User by Username
router.get('/:username', getUserByUsername);

// POST : Create a User
router.post('/signup', [
    body('username', 'Name cannot be Empty').notEmpty(),
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Password must be min 8 characters').isLength(8)
], createUser)

//GET : Verify Email
router.get('/verify/:id', verifyEmail);

// POST : Authenticate a User
router.post('/login', [
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Password must be min 8 characters').isLength(8)
], loginUser)

// PUT : Update a User
router.put('/', fetchuser, [
    body('username', 'username cannot be Empty').notEmpty()
], updateUser)

// DELETE : Delete a User (self)
// router.delete('/', fetchuser, deleteUser)


// ADMIN ROUTES

// POST : Authenticate an ADMIN
router.post('/admin/login', [
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Password must be min 8 characters').isLength(8)
], loginAdmin)

// PUT : Update a User by Admin
router.put('/admin', fetchuser, isAdmin, updateUserByAdmin)

// Delete a user by ADMIN
router.delete('/admin/:id', fetchuser, isAdmin, deleteUserByAdmin);

// POST : Get All Users
router.post('/getallusers', getAllUsers)

// POST : Reset Password
router.post('/resetpassword', resetPassword)

//POST : Set New Passwor
router.post('/setnewpassword/:id', setNewPassword);

//POST : Send Custom Email
router.post('/sendmail',fetchuser, isAdmin, sendCustomMail);

module.exports = router;