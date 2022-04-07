"use strict";
// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const Bookings = require("./model/bookings");

const connectDB = require("./db/db");
connectDB(process.env.ATLAS_URI);

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
const Booking = require("./model/bookings");
const destinationData = fetchDestinations();
console.log(destinationData);
//DATA
//MAIN

//ROUTES
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
    bookingRef: 456,
  });
  await createBooking.save((err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send({ msg: "Inserted to DB" });
    }
  });
});

////////////////////////////////////////this works
// app.get("/bookings", (req, res) => {
//   const newBookings = new Booking({

//   });
//   newBookings.title = "Mr";
//   newBookings.firstname = "Hoho";
//   newBookings.lastname = "Haha";
//   newBookings.mobile = 12345678;
//   newBookings.email = "hoho@gmail.com"

//   newBookings.flightnumber = 721;
//   newBookings.seatnumber = "10A";
//   newBookings.flyerNumber = 999;
//   newBookings.bookingRef = 456;

//   newBookings.save((err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       res.status(200).send({ msg: "Inserted to DB" });
//     }
//   });
//});
// Listener
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
