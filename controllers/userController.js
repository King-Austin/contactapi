const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {userValidationSchema} = require ("../validation/userValidation")


//@desc register a User
//@route POST /api/user
//@access public
const registerUser = asyncHandler(async(req, res) => {
    // Validate the request body
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error (error.details[0].message );
    }
    const userAvailable = await User.findOne(email);
    if (userAvailable){
        throw new Error ("User already registered!");
    }

    /** Hash the hell outta the password, 
     * as we dont malicious devs to sniff around it, hahaha... **/
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password:", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log("New User created Success ", user);

    if {user}{
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
        })
    }

});


//@desc LOGIN a user for the app
//@route POST /api/user
//@access public
const loginUser = asyncHandler(async(req, res) => {

    res.status(200).json({message:"Login the user"});
});


//@desc Current user info
//@route POST /api/user/current
//@access private
const currentUser = asyncHandler(async(req, res) => {

    res.status(200).json({message:"User is Current"});
});



module.exports = {
    registerUser,
    loginUser,
    currentUser,
};