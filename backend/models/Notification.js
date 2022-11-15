import mongoose from 'mongoose';
const {Schema} = mongoose;

const NotificationSchema = new Schema ({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : String,
    seen : Boolean,
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('notification',NotificationSchema);