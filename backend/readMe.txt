we made (req, res) an async function and thus there was no use of '.then' and '.catch' so removed it.
added
    let user = await User.findOne({email: req.body.email})
to find the user and if the user exists, an error will be provided with status 404
    if(user){
        return res.status(404).json({error: "a user with this email already exists."})
    }
if no errors are found, a new user is created.
NOTE: it is important to add 
    res.json()
after creating the user so that we can send back information about our newly-created resource (the user in this case)

we made our localhost port to 5000 because react app will  be running in port 3000

we created a new thunderClient collection named inotebook and created a new folder in which all the request will be saved.


added try catch functon to handle errors.