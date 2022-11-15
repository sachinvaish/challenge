const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("GET FEEDBACK Method called");
})

router.post('/',(req,res)=>{
    console.log("POST Method called");
})

router.put('/',(req,res)=>{
    console.log("PUT Method called");
})

router.delete('/',(req,res)=>{
    console.log("DELETE Method called");
})

module.exports = router;