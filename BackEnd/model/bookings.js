const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingsSchema = Schema({
  bookingRef: String,
  flyerNumber: Number,
  booking: Object,
  paymentSuccess: Boolean,
  pSuccessID: String,
  pFailID: String,
});

const Bookings = mongoose.model("Bookings", bookingsSchema);

module.exports = Bookings;
