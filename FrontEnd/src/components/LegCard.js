import React, { useContext } from "react";
import { Typography, Container, Stack } from "@mui/material";
import BookingContext from "./context/BookingContext";
import { nanoid } from "nanoid";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const LegCard = ({ leg }) => {
  const bookingContext = useContext(BookingContext);

  const getAirportName = (airportCode) => {
    bookingContext.booking.airports.map((airport) => {
      if (airport.airportCode == airportCode) {
        return airport.airportName;
      }
    });
  };

  return (
    <Container sx={{ display: "flex" }}>
      <Container>
        <Typography variant="h4">{leg.originAirportCode}</Typography>
        <Typography variant="h5">{leg.departureDateTime}</Typography>
        {bookingContext.booking.airports.map((airport) => {
          if (airport.airportCode == leg.originAirportCode) {
            return (
              <Typography key={nanoid()}>{airport.airportName}</Typography>
            );
          }
        })}

        {leg.departureTerminal && (
          <Typography>Terminal: {leg.departureTerminal}</Typography>
        )}
      </Container>
      <Stack display="block">
        <FlightTakeoffIcon
          fontSize="large"
          sx={{ display: "flex", margin: "auto" }}
        />
      </Stack>
      <Container>
        <Typography variant="h4">{leg.destinationAirportCode}</Typography>
        <Typography variant="h5">{leg.arrivalDateTime}</Typography>
        {bookingContext.booking.airports.map((airport) => {
          if (airport.airportCode == leg.destinationAirportCode) {
            return (
              <Typography key={nanoid()}>{airport.airportName}</Typography>
            );
          }
        })}

        {leg.arrivalTerminal && (
          <Typography>Terminal: {leg.arrivalTerminal}</Typography>
        )}
      </Container>
    </Container>
  );
};

export default LegCard;
