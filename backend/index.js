const express = require('express');
const cors = require('cors')
const app = express();
const connectToMongo = require('./db');

app.use(cors());
app.use(express.json());

connectToMongo();

app.get('/',(req,res)=>{
    res.send("Hi, this is Challenge website");
})

app.use('/users',require('./routes/users'));
app.use('/challenges',require('./routes/challenges'));
app.use('/submissions',require('./routes/submissions'));
app.use('/votes',require('./routes/votes'));
app.use('/feedbacks',require('./routes/feedbacks'));

app.listen(80,()=>{
    console.log("listening on port 80");
})