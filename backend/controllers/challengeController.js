const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser.js");
const isAdmin = require("../middleware/isAdmin.js");
const Challenge = require("../models/Challenge.js");
const { deleteChallengeSubmissions } = require("./submissionController.js");

// POST : Create a Challenge
exports.createChallenge = async (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);
  //validation check post
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let challenge = await Challenge.create({
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      first_prize: req.body.first_prize,
      second_prize: req.body.second_prize,
      feedback_prize: req.body.feedback_prize,
    });
    console.log("successfull", challenge);
    res.json({ challenge });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

// GET : Get a Challenge by ID
exports.getChallengeById = async (req, res) => {
  try {
    challengeID = req.params.id;
    const challenge = await Challenge.findById(challengeID);
    res.json(challenge);
  } catch (error) {
    //catching errors
    console.error(error);
    res.status(500).json({ message: "Server Error Occured" });
  }
}

//GET : Get last finished challenge
exports.getLastChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findOne({due_date: { $lte: dayjs() },}).sort({ due_date: "desc" });
    if(challenge){
      res.send(challenge);
    }else{
      res.send({"message":"No Challenges available right now"});
    }
  } catch (error) {
    //catching errors
    console.error(error);
    res.status(500).json({ message: "Server Error Occured" });
  }
}

//GET : Get all past challenges
exports.getPastChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({
      due_date: { $lte: dayjs() },
    }).sort({ due_date: "desc" });
      res.send(challenges);
  } catch (error) {
    //catching errors
    console.error(error);
    res.status(500).json({ message: "Server Error Occured" });
  }
}

//GET : Get Current nearest challenge
exports.getCurrentChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findOne({
      due_date: { $gte: dayjs() },
    }).sort({ due_date: "asc" });
    if(challenge){
      res.send(challenge);
    }else{
      res.send({"message":"No Challenges available right now"});
    }
  } catch (error) {
    //catching errors
    console.error(error);
    res.status(500).json({ message: "Server Error Occured" });
  }
}

// GET : Get All Challenges
exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    if(challenges){
      res.send(challenges);
    }else{
      res.send({"message":"No Challenges available right now"});
    }
  } catch (error) {
    //catching errors
    console.error(error);
    res.status(500).json({ message: "Server Error Occured" });
  }
}

// POST : Update a Challenge
exports.updateChallenge = async (req, res) => {
  const errors = validationResult(req);
  //validation check post
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    challengeID = req.params.id;
    const challenge = await Challenge.findByIdAndUpdate(
      challengeID,
      {
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        first_prize: req.body.first_prize,
        second_prize: req.body.second_prize,
        feedback_prize: req.body.feedback_prize,
      },
      { new: true }
    );
    console.log("challeng aya", challenge);
    res.json({ challenge });
  } catch (error) {
    //catching errors
    console.error("error aya", error);
    res.status(500).json({ message: "Server Error Occured" });
  }
}

//PUT : Remove Feedback Winner
exports.removeFeedbackWinner = async (req, res) => {
  try {
    challengeID = req.params.id;
    //removing Feedback Winner
    const challenge = await Challenge.findByIdAndUpdate(
      challengeID,
      {
        feedback_winner_id: null,
      },
      { new: true }
    );
    console.log("Feedback winner removed", challenge);
    res.json(challenge);
  } catch (error) {
    //catching errors
    console.error("error aya", error);
    res.status(500).json({ error: "Server Error Occured" });
  }
}

// PUT : Set Winner
exports.setWinner = async (req, res) => {
  try {
    challengeID = req.params.id;
    //Removing (submission) Winner
    if (!req.body.first_winner_id && !req.body.second_winner_id && !req.body.feedback_winner_id) {
      let challenge = await Challenge.findByIdAndUpdate(challengeID,
        { $set: { first_winner_id: null, second_winner_id: null } },
        { new: true }
      );
      console.log("removed", challenge);
      res.json(challenge);
    }

    //setting First Winner
    if (req.body.first_winner_id) {
      const secondWinner = await Challenge.findById(challengeID).select(
        "second_winner_id"
      );
      if (String(secondWinner.second_winner_id) === String(req.body.first_winner_id)) {
        console.log("hogi match");
        let secondWinner = await Challenge.findByIdAndUpdate(challengeID, {
          $set: { second_winner_id: null },
        });
        console.log("result", secondWinner);
      }
      const challenge = await Challenge.findByIdAndUpdate(
        challengeID,
        {
          first_winner_id: req.body.first_winner_id,
        },
        { new: true }
      );
      console.log("1st winner ghoshit");
      res.json(challenge);
    }

    //setting Second Winner
    if (req.body.second_winner_id) {
      const firstWinner = await Challenge.findById(challengeID).select(
        "first_winner_id"
      );
      if (
        String(firstWinner.first_winner_id) ===
        String(req.body.second_winner_id)
      ) {
        console.log("hogi match");
        let secondWinner = await Challenge.findByIdAndUpdate(challengeID, {
          $set: { first_winner_id: null },
        });
        console.log("result", secondWinner);
      }
      const challenge = await Challenge.findByIdAndUpdate(
        challengeID,
        {
          second_winner_id: req.body.second_winner_id,
        },
        { new: true }
      );
      console.log("2nd winner ghoshit");
      res.json(challenge);
    }
    //setting Feedback Winner
    if (req.body.feedback_winner_id) {
      const challenge = await Challenge.findByIdAndUpdate(
        challengeID,
        {
          feedback_winner_id: req.body.feedback_winner_id,
        },
        { new: true }
      );
      console.log("Feedback winner ghoshit", challenge);
      res.json(challenge);
    }
  } catch (error) {
    //catching errors
    console.error("error aya", error);
    res.status(500).json({ error: "Server Error Occured" });
  }
}

//Delete Delete a challenge by ID
exports.deleteChallenge = async (req, res) => {
  try {
    let challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).send({ error: "Not Found" });
    }
    await Challenge.findByIdAndDelete(req.params.id);
    await deleteChallengeSubmissions(req.params.id);
    return res.json({ Success: "Challenge Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Some Error Occured");
  }
}