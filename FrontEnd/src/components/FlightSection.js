import React from "react";
import FlightCard from "./FlightCard";
import { Box, Typography, Card, Button } from "@mui/material";
const FlightSection = ({ flightDetails }) => {
  //   console.log(flightDetails.segments);
  return (
    <div>
      <Typography align="left" variant="h3">
        From {flightDetails.originAirportCode} To{" "}
        {flightDetails.destinationAirportCode}
      </Typography>
      <div>
        {flightDetails.segments.map((segments) => (
          <FlightCard flightSegments={segments} />
        ))}
      </div>
    </div>
  );
};

export default FlightSection;
