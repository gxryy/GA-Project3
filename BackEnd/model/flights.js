import mongoose from "mongoose";
const { Schema } = mongoose;

const flightSchema = new Schema({
  flightnumber: Number,
  departuredate: Date,
  origin: String,
  destination: String,
  numofseats: Number,
});

const Flights = mongoose.model("Flights", flightSchema);

module.exports = Flights;
