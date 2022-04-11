import React from "react";
import { Box, Typography, Card, Grid, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightLeg from "./FlightLeg";
import FlightStop from "./FlightStop";
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
    // <div className="resultspage">
    //   <Card
    //     variant="outlined"
    //     sx={{ border: "1px solid", padding: 2, margin: 2, width: 1100 }}
    //     align="left"
    //   >
    //     <Grid container>
    //       <Grid xs={4}>
    //         <Typography variant="h4">
    //           {flightSegments.departureDateTime}
    //         </Typography>
    //         <Typography sx={{ marginTop: 2, marginLeft: 16 }} variant="h5">
    //           {flightSegments.originAirportCode}
    //         </Typography>
    //       </Grid>
    //       <Grid xs={1}>
    //         <FlightTakeoffIcon fontSize="large" sx={{ marginTop: 4 }} />
    //       </Grid>
    //       <Grid xs={4}>
    //         <Typography variant="h4">
    //           {flightSegments.legs[0].arrivalDateTime}
    //         </Typography>
    //         <Typography
    //           align="left"
    //           sx={{ marginTop: 2, marginLeft: 16 }}
    //           variant="h5"
    //         >
    //           {flightSegments.destinationAirportCode}
    //         </Typography>
    //       </Grid>
    //       <Grid xs={2}>
    //         <Typography>
    //           {/* Time in hours and minutes */}
    //           trip duration: {Math.floor(
    //             flightSegments.tripDuration / 60 / 60
    //           )}{" "}
    //           Hr {Math.floor(flightSegments.tripDuration % 60)} Min
    //         </Typography>
    //         <Typography>price: ${flightSegments.fare}</Typography>
    //         <Typography>{flightSegments.legs[0].aircraft.name}</Typography>
    //       </Grid>
    //       <Button onClick={clickHandler}>Select</Button>
    //     </Grid>
    //   </Card>
    // </div>
    // With stops
    <div className="resultspage">
      <Card
        variant="outlined"
        sx={{ border: "1px solid", padding: 2, margin: 2, width: 1100 }}
        align="left"
      >
        <Grid container>
          <Grid xs={4}>
            <Typography variant="h4">
              {/* Departure date/time from origin country */}
              {flightSegments.departureDateTime}
            </Typography>
            {/* Origin country code */}
            <Typography sx={{ marginTop: 2, marginLeft: 16 }} variant="h5">
              {flightSegments.originAirportCode}
            </Typography>
          </Grid>
          <Grid xs={1}>
            <FlightTakeoffIcon fontSize="large" sx={{ marginTop: 4 }} />
          </Grid>
          <Grid xs={4}>
            <Typography variant="h4">
              {flightSegments.legs[1].arrivalDateTime}
            </Typography>
            <Typography
              align="left"
              sx={{ marginTop: 2, marginLeft: 16 }}
              variant="h5"
            >
              {/* render out all stops of a flight */}
              {flightSegments.legs.map((legs, index) => {
                // console.log(legs);
                return <FlightLeg key={index} flightLegs={legs} />;
              })}
              <FlightStop />
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>
              {/* Time in hours and minutes */}
              trip duration: {Math.floor(
                flightSegments.tripDuration / 60 / 60
              )}{" "}
              Hr {Math.floor(flightSegments.tripDuration % 60)} Min
            </Typography>
            <Typography>price: ${flightSegments.fare}</Typography>
            <Typography>{flightSegments.legs[0].aircraft.name}</Typography>
          </Grid>
          <Button onClick={clickHandler}>Select</Button>
        </Grid>
      </Card>
    </div>
  );
};

export default FlightCard;
