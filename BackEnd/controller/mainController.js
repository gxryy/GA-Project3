const express = require("express");

const router = express.Router();
const cors = require("cors");
const fetchDestinations = require("../SQ_API/fetchDestinations");
const fetchFlights = require("../SQ_API/fetchFlights");
const Bookings = require("../model/bookings");
const Flights = require("../model/flights");
const Users = require("../model/users");
const { nanoid, customAlphabet } = require("nanoid");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
const refGenerator = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
const bcrypt = require("bcrypt");

// creating new User
router.post("/create", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    res.json({ status: "ok", message: "user created" });
  } catch (error) {
    console.log(error);
    res.status(401).json("Error");
  }
  const newUsers = new Users({
    username: req.body.username,
    password: req.body.password,
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
    countryCode: req.body.countryCode,
    passportNumber: req.body.passportNumber,
  });

  await newUsers.save();
});

// see all Users
router.get("/allUsers", async (req, res) => {
  const allUsers = await Users.find();
  res.json(allUsers);
});

//ROUTES
//Endpoint for getting a booking, verifies the booking reference and last name
router.post("/getBooking", (req, res) => {
  Bookings.findOne(
    { bookingRef: req.body.bookingRef.toUpperCase() },
    (err, data) => {
      if (err) console.log(error);
      if (data) {
        // check if the last name is correct
        let authenticated = false;
        for (passenger of data.booking.passengerInfo) {
          if (
            req.body.lastName.toUpperCase() == passenger.lastName.toUpperCase()
          )
            authenticated = true;
        }
        if (authenticated) res.json(data);
        else res.json(`error`);
      }
    }
  );
});

//Endpoint for stripe payment and stores the booking context into db, with paymentSuccess false.
//creates 2 uid for payment and fail respectively. stripe to redirect to the Express url that captires the ref and id before res send a redirect to success/failure route in react
router.post("/makePayment", async (req, res) => {
  let booking = req.body;
  let bookingRef = booking.bookingRef || refGenerator();
  let pSuccessID = nanoid();
  let pFailID = nanoid();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "grabpay", "paynow", "alipay"],
      mode: "payment",
      line_items: booking.selectedFlight.map((flight) => {
        return {
          price_data: {
            currency: "sgd",
            product_data: {
              name: `Flight: ${flight.originAirportCode} to ${flight.destinationAirportCode}`,
            },
            unit_amount: Math.floor(flight.fare) * 100,
          },
          quantity: booking.passengerInfo.length,
        };
      }),
      success_url: `http://localhost:5001/paymentCheck/${bookingRef}/${pSuccessID}`,
      cancel_url: `http://localhost:5001/paymentCheck/${bookingRef}/${pFailID}`,
    });
    res.json({ url: session.url });
    createBooking(booking, bookingRef, pSuccessID, pFailID);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/paymentCheck/:bookingRef/:id", (req, res) => {
  // get id and check against DB for payment fail or success..
  // if fail then redirect to failure route in frontend
  // if success then show booking reference

  Bookings.findOne({ bookingRef: req.params.bookingRef }, (err, data) => {
    if (data) {
      if (req.params.id == data.pSuccessID) {
        Bookings.findOneAndUpdate(
          { _id: data._id },
          { paymentSuccess: true },
          (err, data) => {
            if (err) console.log(err);
            else {
              // successfully updated payment in DB

              addToFlight(data.booking).then(() =>
                res.redirect(
                  `http://localhost:3000/manage/${req.params.bookingRef}/${data.booking.passengerInfo[0].lastName}`
                )
              );
            }
          }
        );
      } else {
        console.log(`payment fail`);
        res.redirect(
          `http://localhost:3000/paymentfail/${req.params.bookingRef}/${data.booking.passengerInfo[0].lastName}`
        );
      }
    } else console.log(`Booking Reference Not Found in DB!`);
    if (err) console.log(err);
  });

  // res.json(`checking`);
});

router.get("/bookings", async (req, res) => {
  const createBooking = new Bookings({
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
  Flights.findOne(
    {
      $and: [
        { flightNumber: req.body.leg.flightNumber },
        { departureDateTime: req.body.leg.departureDateTime },
      ],
    },
    (err, data) => {
      if (err) {
        console.log(err);
        res.json(`ERROR`);
      } else {
        if (data) res.json(data.seatMap);
        else {
          generatedSeatMap = seatMapGenerator();

          Flights.create(
            { ...req.body.leg, passengers: [], seatMap: generatedSeatMap },
            (err, data) => {
              if (err) console.log(`flight db create fail`);
            }
          );
          res.json(generatedSeatMap);
        }
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

const createBooking = (booking, bookingRef, pSuccessID, pFailID) => {
  Bookings.findOne({ bookingRef: booking.bookingRef }, (err, data) => {
    if (data) {
      Bookings.findOneAndUpdate(
        { _id: data._id },
        { pSuccessID, pFailID },
        (err, data) => {
          if (err) console.log(`error in updating new ids`);
          if (data) console.log(`successul update`);
        }
      );
    } else {
      const newBooking = new Bookings({
        bookingRef,
        flyerNumber: 0,
        booking,
        paymentSuccess: false,
        pSuccessID,
        pFailID,
      });
      newBooking.save((err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`inserted to DB`);
        }
      });
    }
  });
};

const addToFlight = (booking) => {
  return new Promise((resolve, reject) => {
    for (let legIndex in booking.legs) {
      Flights.findOne(
        {
          flightNumber: booking.legs[legIndex].flightNumber,
          departureDateTime: booking.legs[legIndex].departureDateTime,
        },
        (err, data) => {
          if (err) console.log(`error in finding flight in db`);
          if (data) {
            console.log(`there is flight in db`);
            // update SeatMap
            let newseatmap = JSON.parse(JSON.stringify(data.seatMap));
            for (seatIndex in newseatmap) {
              for (passenger of booking.seatSelection) {
                if (newseatmap[seatIndex].seat == passenger[legIndex]) {
                  newseatmap[seatIndex].isVacant = false;
                  newseatmap[seatIndex].source = "booked";
                }
              }
            }

            let passengers = JSON.parse(JSON.stringify(data.passengers));
            passengers.push(...booking.passengerInfo);

            Flights.findByIdAndUpdate(
              data._id,
              {
                seatMap: newseatmap,
                passengers: passengers,
              },
              (err, data) => {
                if (err) console.log(`error in updating`);
                if (data) console.log(`updated`);
                if (legIndex == booking.legs.length - 1)
                  resolve("stuff worked!");
              }
            );
          } else {
            // no flights in flights db: to create
            console.log(`no existing flights`);
          }
        }
      );
    }
  });
};

module.exports = router;
