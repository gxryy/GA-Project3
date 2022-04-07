"use strict";
// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const Flights = require("./model/flights.js");

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
const { default: mongoose } = require("mongoose");
const destinationData = fetchDestinations();
console.log(destinationData);

//DATA
app.get("/flights", async (req, res) => {
  const createFlights = new Flights({
    flightnumber: 714,
    departuredate: "2022-04-10",
    origin: "Singapore",
    destination: "BangKok",
    numofseats: 2,
  });
  await createFlights.save((err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send({ msg: "Inserted to DB" });
    }
  });
});

//MAIN
// ROUTES
// Listener
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

mongoose.connect(
  `mongodb+srv://${process.env.username}:${process.env.password}@airline.hpdbd.mongodb.net/test`,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("connected to mongoDB Atlas");
});
