const express =  require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv =  require("dotenv").config();
const cors = require('cors'); // Import the cors package
const corsOptions = require('./corsOptions'); // Import the CORS options



connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors(corsOptions));

/* Applying the middleware for the contact api */

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute") );

app.use("/api/users", require("./routes/userRoute") );
app.use(errorHandler);



app.listen(port, () => {
    console.log (`Server running on port ${port}`);
})


