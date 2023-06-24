const express = require('express')
const { body, validationResult } = require('express-validator'); // validationResult will return the errors in the input data

const User = require('../models/User')
const router = express.Router()

// Create a user using: POST "/api/auth/createuser"
router.post('/createuser',[
    body('name', "please enter minimum of 3 character").isLength({min: 3}),//provide an error if length of name is below 3 characters, we can also set max property
    body('email', 'Please enter valid email address!').isEmail(),// provide an error if the provided input is not appropriate email
    body('password', 'Enter atleast 5 characters').isLength({min: 5})
],  async (req, res) => {
    const error = validationResult(req) // will store all the results in the variable 'error'
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()}) // returns the errors as a json file if the error variable is not empty
    }
    try{
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(404).json({error: "a user with this email already exists."})
    }
    user = await User.create({ //will run if there is no error 
        name: req.body.name, // declaring name of the user
        email: req.body.email, //declaring email of the user
        password: req.body.password //declaring password of the user
    })
    // .then(user=> res.json(user)) //will send the input data to the database ('user' is defined in User)
    // .catch(err=> {console.log(err) //when the same json file is send again, it will lead to an error as it no longer sends a unique data (unique email). Thus .catch will print the error in the console
    // res.json({error: "please enter a unique value for email"})}) // even when the error in printed in the console, server will continue to load as it cannot find any unique value. Thus res.json will print the error and resolve the problem
    res.json(user);
    } catch(error){
        console.log(error.message);
        res.status(500).send("some error occured.")
    }
})

module.exports=router;


