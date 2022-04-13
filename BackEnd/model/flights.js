const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightSchema = new Schema({
  flightNumber: Number,
  departureDateTime: String, // Date format is "2022-05-11 23:30:00"
  arrivalDateTime: String,
  destinationAirportCode: String,
  originAirportCode: String,
  aircraft: { code: String, name: String },
  flightDuration: Number, // number in seconds
  marketingAirline: { code: String, name: String },
  layoverDuration: Number, // in seconds
  stops: Array,
  seatMap: Array,
  passengers: Array,
});

const Flights = mongoose.model("Flights", flightSchema);

module.exports = Flights;
