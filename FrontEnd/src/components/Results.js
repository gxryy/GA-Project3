import React, { useState } from "react";
import { Box, Typography, Card, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import MockKL from "../mockResponse/KL.json";
import MockXRY from "../mockResponse/XRY.json";
import FlightCard from "./FlightCard";
import FlightSection from "./FlightSection";
const Results = () => {
  // KL test
  // const flightList = MockKL.flights.map((details) => (
  //   <FlightSection flightDetails={details}></FlightSection>
  // ));

  // XRY test
  const flightList = MockXRY.flights.map((details) => (
    <FlightSection flightDetails={details}></FlightSection>
  ));
  return <div>{flightList}</div>;
};

export default Results;
