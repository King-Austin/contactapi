const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",

    },
    name: {
        type: String,
        required: [true, "Please give in a valid name"],
    },

    email: {
        type: String,
        required: [true, "Please add the contact email address"],
    },    

    phone: {
        type: String,
        required: [true, "Please add the contact Phone number"],
    },
},
    {
        timestamps: true
    }

);

module.exports = mongoose.model("Contact", contactSchema);
