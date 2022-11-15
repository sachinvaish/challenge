const express = require('express');
const app = express();
const connectToMongo = require('./db');
app.use(express.json());

connectToMongo();

app.get('/',(req,res)=>{
    res.send("Hi, this is Challenge website");
})

app.use('/users',require('./routes/users'));
app.use('/feedbacks',require('./routes/feedbacks'));

app.listen(80,()=>{
    console.log("listening on port 80");
})