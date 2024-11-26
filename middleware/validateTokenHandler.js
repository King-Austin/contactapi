const asyncHandler = require("express-async-handler"); // Import async handler for error handling
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token verification

// Middleware function to validate JWT
const validateToken = asyncHandler(async (req, res, next) => {
    let token; // Variable to hold the token
    // Retrieve the Authorization header from the request
    let authHeader = req.headers.Authorization || req.headers.authorization;

    // Check if the Authorization header is present and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
        // Extract the token from the Authorization header
        token = authHeader.split(" ")[1]; // Get the token part after "Bearer"

        // Verify the token using the secret key
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If token verification fails, respond with unauthorized status
                res.status(401);
                throw new Error("User is Unauthorized"); // Throw an error to be caught by asyncHandler
            }

            // Attach the decoded user information to the request object
            req.user = decoded.user; // Store user info for later use in the request lifecycle
            console.log(decoded.user)
;            next(); // Call next middleware or route handler
        });
    } else {
        // If the token is not present, respond with unauthorized status
        res.status(401);
        throw new Error("User not Authorized or Missing Token"); // Error for missing token
    }
});

module.exports = validateToken; // Export the middleware for use in other parts of the application


