const express = require('express')
const { body, validationResult } = require('express-validator'); // validationResult will return the errors in the input data
const bcrypt = require("bcryptjs")// including bcrypt package
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')// including jsonwebtoken package

const JWT_SECRET = "karthikIsAGoodBOY" // a token will be generated for this secret message

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

    // both genSalt() and hash() are promises. Thus we will have to use async await function.
    const salt = await  bcrypt.genSalt(10); // creating salt to the password
    const secPass = await bcrypt.hash(req.body.password, salt); //adding salt to the password

    // creating a new user
    user = await User.create({ //will run if there is no error 
        name: req.body.name, // declaring name of the user
        email: req.body.email, //declaring email of the user
        password:  secPass,
    })
    const data = {
        user: {
        id : user.id //as id is the index of the database, it is easy to create token using id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET); // creating token
    res.json({authtoken}); // returning token 
    } catch(error){
        console.log(error.message);
        res.status(500).send("some error occured.")
    }
})

// Authenticating a user using: POST "/api/auth/login"-- to check if the credentials are right or wrong
router.post('/login',[
    body('email', 'Please enter valid email address!').isEmail(),
    body('password', 'Enter the password').exists(),
],  async (req, res) => {
    const error = validationResult(req) // will store all the results in the variable 'error'
    if(!error.isEmpty()){
        return res.status(500).json({error: error.array()}) // returns the errors as a json file if the error variable is not empty
    }
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(500).json({error: "Enter the correct credentials."})
        }

        const passwordCompare = await bcrypt.compare(password, user.password); // compare the given password with the hash of password from database
        if(!passwordCompare){
            return res.status(500).json({error: "Enter the correct credentials."})
        }
        const data = {
            user: {
            id : user.id //as id is the index of the database, it is easy to create token using id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET); // creating token
        res.json({authtoken}); // returning token 
        
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured.")
    }
})
module.exports=router;


