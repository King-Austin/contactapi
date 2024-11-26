const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// Handle user registration
// Because signing up is just too mainstream!
router.post("/register", registerUser);

// Handle user login
// Let's hope you remember your credentials this time!
router.post("/login", loginUser);

// Get current user information
// We know you’re curious, but let’s make sure you’re actually logged in first.
router.get("/current", validateToken, currentUser);

module.exports = router; // Export the router for use in the main app—like a trusty sidekick!