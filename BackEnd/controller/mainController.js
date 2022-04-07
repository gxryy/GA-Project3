const express = require("express");

const router = express.Router();

const fetchDestinations = require("../SQ_API/fetchDestinations");
const fetchFlights = require("../SQ_API/fetchFlights");
const Bookings = require("../model/bookings");
const Flights = require("../model/flights");

router.get("/bookings", async (req, res) => {
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
router.get("/flights", async (req, res) => {
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

router.get("/getDestinations", (req, res) => {
  fetchDestinations().then((response) => {
    // Parsing destination information
    let destinations = [];
    for (element of response.data.destinationList) {
      console.log(element);
      destinations.push({
        airportCode: element.airportCode,
        airportName: element.airportName,
        cityName: element.cityName,
        countryName: element.countryName,
      });
    }
    res.json(destinations);
  });
});

router.get("/getFlights", (req, res) => {
  fetchFlights().then((response) => {
    // to do the functions here
    res.json(response);
  });
});

module.exports = router;
