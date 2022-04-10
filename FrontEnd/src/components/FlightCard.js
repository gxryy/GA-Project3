import React from "react";
import { Box, Typography, Card, Grid, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

const FlightCard = ({ flightSegments, id, setSelectedFlight, flightIndex }) => {
  const clickHandler = () => {
    setSelectedFlight((prev) => {
      let updated = JSON.parse(JSON.stringify(prev));
      updated[flightIndex] = flightSegments;
      return updated;
    });
  };

  // console.log(flightSegments);
  return (
    <div className="resultspage">
      <Card
        variant="outlined"
        sx={{ border: "1px solid", padding: 2, margin: 2, width: 1100 }}
        align="left"
      >
        <Grid container>
          <Grid xs={4}>
            <Typography variant="h4">
              {flightSegments.departureDateTime}
            </Typography>
            <Typography sx={{ marginTop: 2, marginLeft: 16 }} variant="h5">
              {flightSegments.originAirportCode}
            </Typography>
          </Grid>
          <Grid xs={1}>
            <FlightTakeoffIcon fontSize="large" sx={{ marginTop: 4 }} />
          </Grid>
          <Grid xs={4}>
            <Typography variant="h4">
              {flightSegments.legs[0].arrivalDateTime}
            </Typography>
            <Typography
              align="left"
              sx={{ marginTop: 2, marginLeft: 16 }}
              variant="h5"
            >
              {flightSegments.destinationAirportCode}
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>
              trip duration: {flightSegments.tripDuration / 60}mins
            </Typography>
            <Typography>price: ${flightSegments.fare}</Typography>
            <Typography>
              aircraft name: {flightSegments.legs[0].aircraft.name}
            </Typography>
          </Grid>
          <Button onClick={clickHandler}>Select</Button>
        </Grid>
      </Card>
    </div>
  );
};

export default FlightCard;
