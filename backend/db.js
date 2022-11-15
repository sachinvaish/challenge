const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/challenge";
const connectToMongo = ()=>{
    mongoose.connect(URI,()=>{
        console.log("Connected to Database successfully");
    })
}

module.exports = connectToMongo;