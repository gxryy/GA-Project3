const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingsSchema = Schema({
  details: [
    {
      title: { type: String, required: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      mobile: { type: String, required: true },
      email: { type: String, required: true },
    },
  ],
  flightdetails: [
    { flightnumber: { type: String }, required: true },
    { seatnumber: { type: String }, required: true },
  ],
  hasCheckedIn: Boolean,
  flyerNumber: Number,
  bookingRef: Number,
});

const Bookings = mongoose.model("Bookings", bookingsSchema);

module.exports = Bookings;
