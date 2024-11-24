const asyncHandler = require("express-async-handler");


//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: `Get contact for fucking person`
    });
});

//@desc Get a contact
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: `Get contact for ${req.params.id}`
    });
});

//@desc POST a contact for saving
//@route POST /api/contact
//@access private
const createContact = asyncHandler(async(req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) { 
        res.status(400);
        throw new Error("All fields are mandatory young one");
    }

    res.status(200).json({
        message: `Create contact `
    });
});

//@desc Delete a contact
//@route DELETE /api/contact
//@access private
const deleteContact = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: `Delete contact for ${req.params.id}`
    });
});

//@desc Put a contact
//@route PUT /api/contact
//@access private
const putContact = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: `PUT contact for ${req.params.id}`
    });
});

module.exports = {
    getContact,
    getContacts,
    deleteContact,
    createContact,
    putContact,
}