const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingsSchema = Schema({
  details: [
    {
      title: { type: String},
      firstname: { type: String },
      lastname: { type: String, },
      mobile: { type: Number, minLength: 8 },
      email: { type: String },
    },
  ],

  flightdetails: [
    {
      flightnumber: { type: String},
      seatnumber: { type: String },
    },
  ],
  flyerNumber: Number,
  bookingRef: String,
});

const Bookings = mongoose.model("Bookings", bookingsSchema);

module.exports = Bookings;
