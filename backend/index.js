const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const connectToMongo = require('./db');
const path = require('path');

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json({limit: '100mb'}));

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

app.listen(5000,()=>{
    console.log("listening on port 5000");
})