"use strict";
// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const Bookings = require("./model/bookings");
const Flights = require("./model/flights");
const connectDB = require("./db/db");
connectDB(process.env.ATLAS_URI_RW);
// CONFIGURATION
const app = express();
app.use(cors());
app.use(express.json()); //input parser for JSON
app.use(express.urlencoded({ extended: false }));
// ROUTER/CONTROLLER
// app.use("/", controller);
// CONST
//FUNCTIONS
const fetchDestinations = require("./SQ_API/fetchDestinations");
const fetchFlights = require("./SQ_API/fetchFlights");
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
// ROUTES
app.get("/bookings", async (req, res) => {
  const createBooking = new Bookings({
    details: [
      {
        title: "Miss",
        firstname: "Haha",
        lastname: "Hehe",
        mobile: 91820120,
        email: "haha@gmail.com",
      },
    ],
    flightdetails: [{ flightnumber: 712 }, { seatnumber: "1A" }],
    flyerNumber: 123,
    bookingRef: "45A6",
  });
  await createBooking.save((err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send({ msg: "Inserted to DB" });
    }
  });
});

// Flights
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
// Listener
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
