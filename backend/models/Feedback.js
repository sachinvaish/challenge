import mongoose from 'mongoose';
const {Schema} = mongoose;

const FeedbackSchema = new Schema ({
    submission_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'submission'
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    description : {
        type : String,
        required : [true, "Cannot be empty"]
    },
    date : {
        type : Date,
        default : Date.now
    },
    like : Number,
    reply_count : Number,
    head_submission_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'submission'
    }
});

module.exports = mongoose.model('feedback',FeedbackSchema);