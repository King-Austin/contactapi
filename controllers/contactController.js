//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = (req, res) => {
    res.status(200).json({
        message: `Get contact for fucking person`
    });
};

//@desc Get a contact
//@route GET /api/contacts
//@access private
const getContact = (req, res) => {
    res.status(200).json({
        message: `Get contact for ${req.params.id}`
    });
};

//@desc POST a contact for saving
//@route POST /api/contact
//@access private
const postContact = (req, res) => {
    console.log(req.body);
    res.status(200).json({
        message: `POST contact for`
    });
};

//@desc Delete a contact
//@route DELETE /api/contact
//@access private
const deleteContact = (req, res) => {
    res.status(200).json({
        message: `Delete contact for ${req.params.id}`
    });
};

//@desc Put a contact
//@route PUT /api/contact
//@access private
const putContact = (req, res) => {
    res.status(200).json({
        message: `PUT contact for ${req.params.id}`
    });
};

module.exports = {
    getContact,
    getContacts,
    deleteContact,
    postContact,
    putContact,
}