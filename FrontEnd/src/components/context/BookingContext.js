import React from "react";

const BookingContext = React.createContext();
export default BookingContext;

// Booking context to contain all the information about the booking process
/* booking, setbooking in app.js with default as 
{
    queryParams: object to be passed to results
    selectedFlight: array of selected flights
    passengerInfo: array of passenger info 
    seatSelection: array of seat selection 
    payment: ?
}

*/
