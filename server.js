const express =  require("express");
const dotenv =  require("dotenv").config();


const app = express();

const port = process.env.PORT || 5000;

/* Applying the middleware for the contact api */
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes") );

app.listen(port, () => {
    console.log (`Server running on port ${port}`);
})