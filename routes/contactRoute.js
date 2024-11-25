const express = require("express");
const { getContact, deleteContact, createContact, getContacts, updateContact } = require("../controllers/contactController");
const router = express.Router();

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;