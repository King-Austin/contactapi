const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userValidationSchema } = require("../validation/userValidation");

//@desc register a User
//@route POST /api/user
//@access public
// Registration endpoint
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, phone, password } = req.body;
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }

    // Save begins

    // Check for existing user by username
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
        res.status(400);
        throw new Error("Username already taken"); // Because originality is overrated.
    }

    // Check for existing user by email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
        res.status(400);
        throw new Error("Email already exists."); // Who knew there were so many users?
    }

    // Hash the hell outta the password
    // Malicious devs nowadays can't be trusted.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        username,
        email,
        phone,
        password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
});

//@desc LOGIN a user for the app
//@route POST /api/user
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory"); // Because, of course, we can’t remember our own requirements.
    }

    // Check for existing user by email
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        // Sign a web token for the user
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id, // Use user._id for MongoDB IDs
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.EXPIRY_TIME }
        );

        // Send the access token in the response
        console.log("New User Loggedin")
        return res.status(200).json({ accessToken }); // Use return to avoid further execution
    } else {
        res.status(401);
        throw new Error("Invalid email or password"); // Shocking, I know! Someone typed something wrong.
    }
});

//@desc Current user info
//@route POST /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user); 
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
};