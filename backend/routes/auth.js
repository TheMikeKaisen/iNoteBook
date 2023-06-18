const express = require('express')
const User = require('../models/User')
const router = express.Router()

// Create a user using: POST "/api/auth/"
router.post('/', (req, res) => {
    console.log(req.body)//print the body at the server
    //res.send("Hello World")//will send the message to the server
    const user = User(req.body)
    user.save()
    res.send(req.body) // will send the body at the database
})

module.exports=router;


