const mongoose = require('mongoose');
const {Schema} = mongoose;
// 
const FeedbackSchema = new Schema ({
    submission_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'submission'
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    feedback : {
        type : String,
        required : [true, "Cannot be empty"]
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('feedback',FeedbackSchema);