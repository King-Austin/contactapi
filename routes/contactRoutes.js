const express = require("express");
const { getContact, putContact, deleteContact, createContact, getContacts } = require("../controllers/contactController");
const router = express.Router();

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(putContact).delete(deleteContact);


module.exports = router;