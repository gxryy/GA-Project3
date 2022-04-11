import React, { useContext } from "react";
import { Typography } from "@mui/material";
import BookingContext from "./context/BookingContext";

const FlightStop = ({ flightStops }) => {
  const bookingContext = useContext(BookingContext);
  console.log(flightStops?.airportCode);

  return (
    <>
      <div>
        <Typography sx={{}} variant="h4">
          {flightStops?.airportCode}
        </Typography>
        <Typography sx={{}} variant="h5">
          {flightStops?.arrivalDateTime}
        </Typography>
        <Typography>
          {bookingContext.booking.airports.map((deets) => {
            if (deets.airportCode == flightStops?.airportCode) {
              return <Typography>{deets.airportName}</Typography>;
            }
          })}
          <Typography>{}</Typography>
        </Typography>
      </div>
      <div>
        <Typography>
          Layover Duration: {Math.floor(flightStops.layoverDuration / 60 / 60)}
          hr {Math.floor(flightStops.layoverDuration % 3600) / 60}mins
        </Typography>
      </div>
    </>
  );
};
export default FlightStop;
