const mongoose = require('mongoose');
const {Schema} = mongoose;

const SubmissionSchema = new Schema ({
    challenge_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'challenge'
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    photo_url : String,
    description : {
        type : String,
        min : [20, "Description must be of 20 Characters"]
    },
    tags : [String]
});

module.exports = mongoose.model('submission', SubmissionSchema);