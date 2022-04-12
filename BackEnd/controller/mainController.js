const express = require("express");

const router = express.Router();
const cors = require("cors");
const fetchDestinations = require("../SQ_API/fetchDestinations");
const fetchFlights = require("../SQ_API/fetchFlights");
const Bookings = require("../model/bookings");
const Flights = require("../model/flights");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

const storeItems = new Map([
  [1, { priceInCents: 80000, name: "Ticket to Jerez" }],
  [2, { priceInCents: 30000, name: "Ticket to KL" }],
]);
// creating a session
router.post("/create-checkout-session", async (req, res) => {
  console.log(`hehehe`);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "sgd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/summary`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

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
    aircraft: {
      code: "359",
      name: "Airbus A350-900",
    },
    arrivalDateTime: "2022-06-01 14:20:00",
    departureDateTime: "2022-06-01 12:50:00",
    departureTerminal: "3",
    destinationAirportCode: "BKK",
    originAirportCode: "SIN",
    flightDuration: 9000,
    flightNumber: "710",
    marketingAirline: {
      code: "SQ",
      name: "Singapore Airlines",
    },
    layoverDuration: 0,
    stops: [],
    seatMap: seatMapGenerator(),
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

router.post("/getFlights", (req, res) => {
  fetchFlights(req.body)
    .then((APIresponse) => {
      console.log(APIresponse);
      console.log(`debug`);
      console.log(APIresponse.response);
      if (
        APIresponse.status == "FAILURE" ||
        APIresponse.response.flights == undefined
      ) {
        res.status(400).json(`no flights`);
      } else {
        let endpointResponse = {};
        // Parsing flight information
        endpointResponse.airports = APIresponse.response.airports;
        endpointResponse.flights = [];

        for (let flights of APIresponse.response.flights) {
          let flightResponse = {};
          flightResponse.originAirportCode = flights.originAirportCode;
          flightResponse.destinationAirportCode =
            flights.destinationAirportCode;
          flightResponse.departureDate = flights.departureDate;
          flightResponse.segments = [];

          for (let segment of flights.segments) {
            let segmentResponse = {};
            segmentResponse.originAirportCode = segment.originAirportCode;
            segmentResponse.destinationAirportCode =
              segment.destinationAirportCode;
            segmentResponse.departureDateTime = segment.departureDateTime;
            segmentResponse.tripDuration = segment.tripDuration;
            segmentResponse.fare = fareCalculator(
              segment.tripDuration,
              req.body.cabinClass,
              segment.legs.length
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
      }
    })
    .catch((error) => {
      console.log(` error: ${error}`);
      res.json(`something went wrong..`);
    });
});

router.post("/getSeats", (req, res) => {
  console.log(`in getseats backend`);
  console.log(req.body);
  Flights.findOne(
    {
      $and: [
        { flightNumber: req.body.flightNumber },
        { departureDateTime: req.body.departureDateTime },
      ],
    },
    (err, data) => {
      if (err) {
        console.log(err);
        res.json(`ERROR`);
      } else {
        console.log(data);
        if (data) res.json(data.seatMap);
        else res.json(seatMapGenerator());
      }
    }
  );
});

const fareCalculator = (tripDuration, cabinClass, legs) => {
  //
  let hrs = tripDuration / 3600;
  let baseFare = hrs * 45 + 120 + Math.random() * 60;
  let legFactor =
    1 - (legs - 1) * 0.08 < 0.75 ? 1 - (legs - 1) * 0.08 < 0.75 : 0.75;
  let classFactor = 1;
  switch (cabinClass) {
    case "Y":
      classFactor = 1;
      break;
    case "J":
      classFactor = 2.1 + Math.random() * 0.5;
      break;
    case "F":
      classFactor = 3.1 + Math.random() * 0.5;
      break;
  }
  fare = Math.floor(baseFare * legFactor * classFactor * 10) / 10;

  return fare;
};

const seatMapGenerator = () => {
  let seatmap = [];
  let JclassCol = 4;
  let JclassOccupancyRate = 0.18;
  let YclassCol = 9;
  let YclassOccupancyRate = 0.2;
  let col = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];
  // seat for J class
  for (let i = 1; i <= 10; i++) {
    for (let j = 0; j < JclassCol; j++) {
      let isVacant = Math.random() > JclassOccupancyRate ? true : false;
      let seat = {
        seat: `${i + col[j]}`,
        cabinClass: "J",
        row: i,
        column: col[j],
        isVacant,
        source: isVacant ? "" : "default",
      };
      seatmap.push(seat);
    }
  }
  // seat for Y class
  for (let i = 11; i <= 35; i++) {
    for (let j = 0; j < YclassCol; j++) {
      let isVacant = Math.random() > YclassOccupancyRate ? true : false;
      let seat = {
        seat: `${i + col[j]}`,
        cabinClass: "Y",
        row: i,
        column: col[j],
        isVacant,
        source: isVacant ? "" : "default",
      };
      seatmap.push(seat);
    }
  }

  return seatmap;
};

module.exports = router;
