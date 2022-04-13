import React, { useState, useEffect } from "react";
import FlightCard from "./FlightCard";
import { Box, Typography, Card, Button } from "@mui/material";
import { nanoid } from "nanoid";

const FlightSection = ({
  flightDetails,
  flightIndex,
  setSelectedFlight,
  selectedFlight,
}) => {
  return (
    <div>
      <Typography align="left" variant="h3">
        From {flightDetails.originAirportCode} To{" "}
        {flightDetails.destinationAirportCode}
      </Typography>
      <div>
        {flightDetails.segments.map((segments) => {
          let id = nanoid();
          return (
            <FlightCard
              flightSegments={segments}
              key={id}
              id={id}
              setSelectedFlight={setSelectedFlight}
              selectedFlight={selectedFlight}
              flightIndex={flightIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FlightSection;
