const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightSchema = new Schema({
  flightnumber: Number,
  departuredate: Date, // Date format is 'yyyy-mm-dd'
  origin: String,
  destination: String,
  numofseats: Number,
});

const Flights = mongoose.model("Flights", flightSchema);

module.exports = Flights;
