import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name : {
    type : String,
    required : [true,"User Name is rquired"]
  },
  email : {
    type : String,
    required :[true, "Email is required"]
  },
  password : {
    type : String,
    required : [true, "Password is required"],
    min : [8, "Password must be minimum 8 Characters"]
  },
  date : {
    type : Date,
    default : Date.now
  },
  photo_url : String,
  portfolio_url : String,
  instagram_url : String
});

module.exports = mongoose.model('user',UserSchema);