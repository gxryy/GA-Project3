import { Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LegCard from "./LegCard";
const FlightLeg = ({ leg }) => {
  const [display, setDisplay] = useState(<></>);

  useEffect(() => {
    let display = [];
    if (leg) {
      display.push(
        leg.stops.length > 0 ? stopHandler(leg) : noStopHandler(leg)
      );
      if (leg.layoverDuration > 0) {
        display.push(
          <Typography variant="h5">
            Layover Duration:{" "}
            {Math.floor(leg.layoverDuration / 3600) +
              "hrs " +
              (leg.layoverDuration % 3600) / 60 +
              "mins"}
          </Typography>
        );
      }
    }

    setDisplay(display);
  }, [leg]);

  const stopHandler = (leg) => {
    let stopDisplay = [];
    for (let i = 0; i < leg.stops.length; i++) {
      let firstleg = JSON.parse(JSON.stringify(leg));
      firstleg.arrivalDateTime = firstleg.stops[i].arrivalDateTime;
      firstleg.destinationAirportCode = firstleg.stops[i].airportCode;
      firstleg.arrivalTerminal = "";
      firstleg.flightDuration = 0;
      stopDisplay.push(<LegCard leg={firstleg} />);
      stopDisplay.push(
        <Typography variant="h5">
          Layover Duration:{" "}
          {Math.floor(leg.stops[i].layoverDuration / 3600) +
            "hrs " +
            (leg.stops[i].layoverDuration % 3600) / 60 +
            "mins"}{" "}
        </Typography>
      );
      let secondleg = JSON.parse(JSON.stringify(leg));
      secondleg.departureDateTime = secondleg.stops[i].arrivalDateTime;
      secondleg.originAirportCode = secondleg.stops[i].airportCode;
      secondleg.departureTerminal = "";
      // secondleg.flightDuration = 0;
      stopDisplay.push(<LegCard leg={secondleg} />);
    }

    return stopDisplay;
  };

  const noStopHandler = (leg) => {
    return <LegCard leg={leg} />;
  };

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={10}>
          {display}
        </Grid>
        <Grid item display="block" alignItems="center">
          <Typography variant="h5">SQ{leg.flightNumber}</Typography>
          <Typography>{leg.aircraft.name}</Typography>
          <Typography>
            {Math.floor(leg.flightDuration / 3600) +
              "hrs " +
              (leg.flightDuration % 3600) / 60 +
              "mins"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default FlightLeg;
