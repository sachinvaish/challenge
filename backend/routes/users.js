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
const { getUserByAuthtoken, getUserById, createUser, loginUser, loginAdmin, updateUser, deleteUser, updateUserByAdmin, deleteUserByAdmin, getAllUsers, deleteProfilePhoto, setProfilePhoto } = require('../controllers/userController.js');

// Set Profile Photo
router.put('/setphoto', fetchuser, setProfilePhoto)

// Delete Profile Photo
router.delete('/deletephoto', fetchuser, deleteProfilePhoto)

// GET : Get a User by authToken
router.get('/', fetchuser, getUserByAuthtoken);

// GET : Get a User by ID
router.get('/:id', getUserById);

// POST : Create a User
router.post('/signup', [
    body('username', 'Name cannot be Empty').notEmpty(),
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Password must be min 8 characters').isLength(8)
], createUser)


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
router.delete('/', fetchuser, deleteUser)


// ADMIN ROUTES

// POST : Authenticate an ADMIN
router.post('/admin/login', [
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Password must be min 8 characters').isLength(8)
], loginAdmin)

// PUT : Update a User by Admin
router.put('/admin', fetchuser, isAdmin, updateUserByAdmin)

// Delete a user by ADMIN
router.delete('/', isAdmin, deleteUserByAdmin)

// POST : Get All Users
router.post('/getallusers', getAllUsers)

module.exports = router;