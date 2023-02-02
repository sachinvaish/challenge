const mongoose = require('mongoose');
const connectToMongo = (DB_URI)=>{
    mongoose.connect(DB_URI,()=>{
        console.log("Connected to Database successfully");
    })
}

module.exports = connectToMongo;