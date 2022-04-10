import React, { useState, useEffect } from "react";
import { Box, Typography, Card, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import MockKL from "../mockResponse/KL.json";
import MockXRY from "../mockResponse/XRY.json";
import FlightCard from "./FlightCard";
import FlightSection from "./FlightSection";
const Results = () => {
  const [selectedFlight, setSelectedFlight] = useState([]);

  useEffect(() => {
    console.log(selectedFlight);
  }, [selectedFlight]);

  // KL test
  // const flightList = MockKL.flights.map((details, flightIndex) => (
  //   <FlightSection
  //     flightDetails={details}
  //     flightIndex={flightIndex}
  //     setSelectedFlight={setSelectedFlight}
  //   ></FlightSection>
  // ));

  // XRY test
  const flightList = MockXRY.flights
    .map((details, flightIndex) => (
      <FlightSection
        flightDetails={details}
        flightIndex={flightIndex}
        setSelectedFlight={setSelectedFlight}
      ></FlightSection>
    ))
    .filter(Boolean);
  return (
    <div>
      {flightList}

      <Button size="lg">Next</Button>
    </div>
  );
};

export default Results;
