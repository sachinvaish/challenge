const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name : {
    type : String
    // required : [true,"User Name is rquired"]
  },
  email : {
    type : String,
    required :[true, "Email is required"],
    unique : true
  },
  username : {
    type : String,
    required :[true, "Username is required"],
    unique : true
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
  role :{
    type : Number,
    default : 0
  },
  is_verified :{
    type : Number,
    default : 0
  },
  photo_url : String,
  portfolio_url : String,
  facebook_url : String,
  instagram_url : String,
  twitter_url : String,
  linkedin_url : String,
  about : String,
  designation : String,
  location : String
});

module.exports = mongoose.model('user',UserSchema);