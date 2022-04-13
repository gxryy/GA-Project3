"use strict";
// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const Bookings = require("./model/bookings");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// DB CONNECTION
const connectDB = require("./db/db");
connectDB(process.env.ATLAS_URI_RW);

mongoose.connect(process.env.ATLAS_URI_RW);


// CONFIGURATION
const app = express();
app.use(cors());
app.use(express.json()); //input parser for JSON
app.use(express.urlencoded({ extended: false }));
// ROUTER/CONTROLLER
const mainController = require("./controller/mainController");
app.use("/", mainController);
// CONST
//FUNCTIONS
const fetchDestinations = require("./SQ_API/fetchDestinations");
const fetchFlights = require("./SQ_API/fetchFlights");

//store sessions in mongoDB
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
// static files middleware
app.use(express.static("public"));
app.use(
  session({
    secret: "123456789", //some random string
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// fetchDestinations().then((response: object) => {
//   // to do the functions here
//   console.log(response);
// });
// fetchFlights().then((response: object) => {
//   // to do the functions here
//   console.log(response);
// });
//DATA
//MAIN
// // ROUTES
// Listener
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
