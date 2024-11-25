const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const {contactValidationSchema} = require ("../validation/contactValidation")


//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
    console.log("Contact recored fetched success")
});

//@desc Get a contact
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(400);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
    console.log("single contact record fetched")
});

//@desc POST a contact for saving
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async(req, res) => {
    // Validate the request body
    const { error } = contactValidationSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error (error.details[0].message );
    }
    
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) { 
        res.status(400);
        throw new Error("All fields are mandatory young one");
    };
    const contact = await Contact.create({
        name, email, phone
    });
    res.status(200).json(contact)
    console.log("Contact creation success")
    

});

//@desc Delete a contact
//@route DELETE /api/contact 
//@access private
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(400);
        throw new Error ("Contact not Found");
        }
    await contact.deleteOne();
    res.status(200).json(contact);
    console.log ("Deleted success")
});

//@desc Put a contact
//@route PUT /api/contact
//@access private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(400);
        throw new Error ("Contact not Found");
        }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
    
    });

module.exports = {
    getContact,
    getContacts,
    deleteContact,
    createContact,
    updateContact,
}