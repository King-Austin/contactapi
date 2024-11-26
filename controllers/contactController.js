const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { contactValidationSchema } = require("../validation/contactValidation");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
        res.status(401);
        throw new Error ("User is not authorized")
    }
    const contacts = await Contact.find({user_id: req.user.id });
    res.status(200).json(contacts);
    console.log("Contact record fetched successfully"); // Because logging is how we prove we did something.
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found"); // Shocking revelation: the contact doesn't exist!
    }

    res.status(200).json(contact);
    console.log("Single contact record fetched"); // Because one is clearly not enough.
});

//@desc POST a contact for saving
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    // Validate the request body
    const { error } = contactValidationSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message); // Because who doesn't love cryptic validation errors?
    }

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory, young one"); // Yes, even the phone number—no skipping!
    }

    const contact = await Contact.create({
        user_id: req.user.id, // Attach the user_id from the authenticated user
        name, 
        email, 
        phone
    });
    res.status(200).json(contact);
    console.log("Contact creation success"); // Another one bites the dust!
});

//@desc Delete a contact
//@route DELETE /api/contact/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not Found"); // It’s like playing hide and seek, but not as fun.
    }

    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("User don't have permission to update other user contact");
    }
    await contact.deleteOne();
    res.status(200).json(contact);
    console.log("Deleted successfully"); // Because deleting things is always satisfying!
});

//@desc Put a contact
//@route PUT /api/contact/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not Found"); // Surprise! The contact is still missing.
    }

    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("User don't have permission to update other user contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
    console.log("Contact updated successfully"); // Because who doesn't love a good makeover?
});

module.exports = {
    getContact,
    getContacts,
    deleteContact,
    createContact,
    updateContact,
};