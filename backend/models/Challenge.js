const mongoose = require('mongoose');
const { Schema } = mongoose;
// 
const ChallengeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  due_date: Date,
  first_prize: Number,
  second_prize: Number,
  feedback_prize: Number,
  first_winner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  second_winner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  feedback_winner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'feedback'
  }
});

module.exports = mongoose.model('challenge', ChallengeSchema);