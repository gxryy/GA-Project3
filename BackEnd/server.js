"use strict";
// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5001;
// CONFIGURATION
const app = express();
app.use(cors());
app.use(express.json()); //input parser for JSON
app.use(express.urlencoded({ extended: false }));
// ROUTER/CONTROLLER
// app.use("/", controller);
// CONST
//FUNCTIONS
const fetchDestinations = require("./fetchDestinations.js");
fetchDestinations().then((response) => {
    // to do the functions here
    console.log(response);
});
//DATAç
//MAIN
// ROUTES
// Listener
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
