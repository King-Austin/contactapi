const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a user name"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
    },    

    password: {
        type: String,
        required: [true, "Please add the use password"],
    },
},
    {
        timestamps: true
    }

);

module.exports = mongoose.model("User", userSchema);
