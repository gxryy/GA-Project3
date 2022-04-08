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
  console.log(`fetching destinations`);
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
  fetchFlights(req.body)
    .then((APIresponse) => {
      let endpointResponse = {};
      // Parsing flight information
      endpointResponse.airports = APIresponse.response.airports;
      endpointResponse.flights = [];

      for (let flights of APIresponse.response.flights) {
        let flightResponse = {};
        flightResponse.originAirportCode = flights.originAirportCode;
        flightResponse.destinationAirportCode = flights.destinationAirportCode;
        flightResponse.departureDate = flights.departureDate;
        flightResponse.segments = [];

        for (let segment of flights.segments) {
          console.log(segment);
          let segmentResponse = {};
          segmentResponse.originAirportCode = segment.originAirportCode;
          segmentResponse.destinationAirportCode =
            segment.destinationAirportCode;
          segmentResponse.departureDateTime = segment.departureDateTime;
          segmentResponse.tripDuration = segment.tripDuration;
          segmentResponse.fare = fareCalculator(
            segment.tripDuration,
            req.body.cabinClass
          );
          segmentResponse.legs = [];

          for (let legs of segment.legs) {
            let legResponse = {};
            legResponse.aircraft = legs.aircraft;
            legResponse.arrivalDateTime = legs.arrivalDateTime;
            legResponse.arrivalTerminal = legs.arrivalTerminal;
            legResponse.departureDateTime = legs.departureDateTime;
            legResponse.departureTerminal = legs.departureTerminal;
            legResponse.destinationAirportCode = legs.destinationAirportCode;
            legResponse.originAirportCode = legs.originAirportCode;
            legResponse.flightDuration = legs.flightDuration;
            legResponse.flightNumber = legs.flightNumber;
            legResponse.marketingAirline = legs.marketingAirline;
            legResponse.layoverDuration = legs.layoverDuration;
            legResponse.stops = legs.stops;

            segmentResponse.legs.push(legResponse);
          }
          flightResponse.segments.push(segmentResponse);
        }
        endpointResponse.flights.push(flightResponse);
      }

      res.json(endpointResponse);
    })
    .catch((error) => {
      console.log(`API error`);
      throw new Error(error);
    });
});

const fareCalculator = (tripDuration, cabinClass, stops) => {
  return "420";
};

module.exports = router;
