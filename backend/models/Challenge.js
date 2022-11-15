import mongoose from 'mongoose';
const {Schema} = mongoose;

const ChallengeSchema = new Schema ({
    title :{
        type : String,
        required : [true, "Title is required"]
    },
    description : {
        type : String,
        required :[true, "Description is required"]
    },
    date_created : {
        type : Date,
        default : Date.now
      },
    due_date : Date,
    winner_prize : number,
    runner_prize : number,
    winner_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'users'
      },
    runner_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'user'
      }
});

module.exports = mongoose.model('challenge',ChallengeSchema);