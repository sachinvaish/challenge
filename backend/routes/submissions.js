const express = require('express');
const fs = require('fs');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission.js');
const fetchuser = require('../middleware/fetchuser');
const multer = require('multer');
const path = require('path');
const isAdmin = require('../middleware/isAdmin.js');
const { createSubmission, getSubmissionsByChallengeId, getSubmissionById, getSubmissionsByUser, deleteUserSubmissions, deleteSubmissionByAdmin, getSubmissionsCountByUser, getAllSubmissions } = require('../controllers/submissionController.js');

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

// POST : Create a Submission
router.post('/', [upload, fetchuser], [
    body('description', 'Description cannot be Empty').notEmpty()
], createSubmission)

//Get List of submissions by Challenge ID
router.get('/contest/:challenge_id', getSubmissionsByChallengeId)

//Get SINGLE submission by Submission ID
router.get('/:id', getSubmissionById)

//Get All Submissions
router.get('/', getAllSubmissions)

//Get List of submissions by user ID
router.get('/user/:user_id',getSubmissionsByUser)

// delete all Submissions for a user
// when a user account is deleted, this API should be hit
// router.delete('/user/:user_id', deleteUserSubmissions)

// Delete a submission by ADMIN
router.delete('/:id', fetchuser, isAdmin, deleteSubmissionByAdmin)

module.exports = router;