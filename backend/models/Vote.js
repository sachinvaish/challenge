const mongoose = require('mongoose');
const {Schema} = mongoose;

const VoteSchema = new Schema ({
    submission_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'submission'
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
});

module.exports = mongoose.model('vote', VoteSchema);