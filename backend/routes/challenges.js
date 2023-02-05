const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser.js");
const isAdmin = require("../middleware/isAdmin.js");
const Challenge = require("../models/Challenge.js");
const { createChallenge, getChallengeById, getLastChallenge, getCurrentChallenge, getAllChallenges, updateChallenge, removeFeedbackWinner, setWinner, deleteChallenge } = require("../controllers/challengeController.js");

// POST : Create a Challenge
router.post(
  "/",
  fetchuser,
  isAdmin,
  [
    body("title", "Name cannot be Empty").notEmpty(),
    body("description", "Description cannot be Empty").notEmpty(),
    body("first_prize", "Specify First Prize in Number").isNumeric(),
    body("second_prize", "Specify Second Prize in Number").isNumeric(),
    body("feedback_prize", "Specify Feedback Prize in Number").isNumeric(),
  ],
  createChallenge
);

// GET : Get a Challenge by ID
router.get("/:id", getChallengeById);

//GET : Get last finished challenge
router.get("/getchallenge/last", getLastChallenge);

//GET : Get Current nearest challenge
router.get("/getchallenge/current", getCurrentChallenge);

// GET : Get All Challenges
router.get("/", getAllChallenges);

// PUT : Update a Challenge
router.put(
  "/:id",
  fetchuser,
  isAdmin,
  [
    body("title", "Name cannot be Empty").notEmpty(),
    body("description", "Description cannot be Empty").notEmpty(),
    body("first_prize", "Specify First Prize in Number").isNumeric(),
    body("second_prize", "Specify Second Prize in Number").isNumeric(),
    body("feedback_prize", "Specify Feedback Prize in Number").isNumeric(),
  ],
  updateChallenge
);

//PUT : Remove Feedback Winner
router.put("/unsetfeedbackwinner/:id", fetchuser, isAdmin, removeFeedbackWinner);

// PUT : Set Winner
router.put("/setwinner/:id", fetchuser, isAdmin, setWinner);

//Delete Delete a challenge by ID
router.delete("/:id", fetchuser, isAdmin, deleteChallenge);

module.exports = router;
