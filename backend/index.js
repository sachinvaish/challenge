const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hi, this is Challenge website");
})

app.get('/home',(req,res)=>{
    res.send("Hi, this is Home Page");
})

app.listen(80,()=>{
    console.log("listening on port 80");
})