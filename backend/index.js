const express = require('express');
const dotenv = require('dotenv').config({path: __dirname + '/config.env'})
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const connectToMongo = require('./db');
const path = require('path');
const port = process.env.PORT;

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json({limit: '100mb'}));

app.use(cors());
app.use(express.json());

connectToMongo(process.env.DB_URI);

app.get('/',(req,res)=>{
    res.send("Hi, this is Challenge website");
})

app.use('/users',require('./routes/users'));
app.use('/challenges',require('./routes/challenges'));
app.use('/submissions',require('./routes/submissions'));
app.use('/votes',require('./routes/votes'));
app.use('/feedbacks',require('./routes/feedbacks'));

app.listen(port,()=>{
    console.log("listening on port ",port);
})