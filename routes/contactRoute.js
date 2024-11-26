const express = require("express");
const { getContact, deleteContact, createContact, getContacts, updateContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();


// Apply the validateToken middleware to all routes that require it
router.use(validateToken); // All subsequent routes require token validation
// Handle requests to the root route for contacts
router.route("/")
    .get(getContacts) // Fetch all contacts, because we need to know who we’re ignoring.
    .post(createContact); // Create a new contact—just what we need, another person to message us!

// Handle requests for specific contacts by ID
// Let's hope you remember which ID you need!

router.route("/:id")
    .get(getContact) // Fetch a single contact; hope you know who you're looking for!
    .put(updateContact) // Update a contact; time for a glow-up!
    .delete(deleteContact); // Delete a contact; goodbye, old friend!

module.exports = router; // Export the router so we can use it elsewhere—like a well-organized toolbox!