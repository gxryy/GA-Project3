import React, { useContext } from "react";
import { Typography, Grid } from "@mui/material";
import BookingContext from "./context/BookingContext";

const FlightStop2 = ({ flightStops }) => {
  const bookingContext = useContext(BookingContext);
  //   console.log(flightStops?.airportCode);
  return (
    <div>
      <Typography sx={{}} variant="h4">
        {flightStops?.airportCode}
      </Typography>
      <Typography sx={{}} variant="h5">
        {flightStops?.departureDateTime}
      </Typography>
      <Typography>
        {bookingContext.booking.airports.map((deets) => {
          if (deets.airportCode == flightStops?.airportCode) {
            return deets.airportName;
          }
        })}
      </Typography>
    </div>
  );
};

export default FlightStop2;
