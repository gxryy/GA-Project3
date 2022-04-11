import React, { useContext } from "react";
import { Box, Typography, Card, Stack, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightLeg from "./FlightLeg";
import FlightLeg2 from "./FlightLeg2";
import FlightStop from "./FlightStop";
import FlightStop2 from "./FlightStop2";
import FlightStop3 from "./FlightStop3";
import BookingContext from "./context/BookingContext";

const FlightCard = ({ flightSegments, id, setSelectedFlight, flightIndex }) => {
  const bookingContext = useContext(BookingContext);

  const clickHandler = () => {
    console.log(`se`);
    console.log(bookingContext.booking);
    console.log(bookingContext.booking.airports);
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
        sx={{
          border: "1px solid",
          padding: 2,
          margin: 2,
          width: 1300,
          height: "auto",
          display: "flex",
        }}
        align="left"
      >
        {/* Box 1 */}
        <Stack spacing={2}>
          <Box sx={{ border: "0.5px solid", display: "flex" }}>
            <div>
              <Typography sx={{}} variant="h4">
                {flightSegments.originAirportCode}
              </Typography>
              <Typography sx={{}} variant="h5">
                {flightSegments.departureDateTime}
              </Typography>
              <Typography>
                {bookingContext.booking.airports.map((deets) => {
                  console.log(deets);
                  if (deets.airportCode == flightSegments.originAirportCode) {
                    return <Typography>{deets.airportName}</Typography>;
                  }
                })}
                {flightSegments.legs[0] && (
                  <Typography>
                    Terminal: {flightSegments.legs[0]?.departureTerminal}
                  </Typography>
                )}
              </Typography>
            </div>
            <div>
              <FlightTakeoffIcon
                fontSize="large"
                sx={{ display: "flex", marginTop: 6, marginLeft: 6 }}
              />
            </div>
            <Typography align="left" sx={{ marginLeft: 6 }} variant="h5">
              {flightSegments.legs.map((legs, index) => {
                return <FlightLeg key={index} flightLegs={legs} />;
              })}
            </Typography>
            {/* flight number and airline for box 1 */}
            <Box sx={{ marginLeft: 6 }}>
              <Typography>
                {flightSegments.legs[0].marketingAirline.name}
                <br></br>
                {flightSegments.legs[0].flightNumber}
              </Typography>
            </Box>
          </Box>
          {/* Box 2 */}
          <Box sx={{ border: "0.5px solid", display: "flex" }}>
            <Typography align="left" sx={{}} variant="h5">
              {flightSegments.legs.map((legs, index) => {
                return <FlightLeg2 key={index} flightLegs={legs} />;
              })}
            </Typography>
            <Typography></Typography>
            <div>
              <FlightTakeoffIcon
                fontSize="large"
                sx={{ display: "flex", marginTop: 5, marginLeft: 6 }}
              />
            </div>
            <div>
              <Box sx={{ marginLeft: 6 }}>
                <Typography variant="h4">
                  {flightSegments.legs[0].destinationAirportCode}
                </Typography>
                <Typography variant="h5">
                  {flightSegments.legs[0].arrivalDateTime}
                </Typography>
                <Typography>
                  {bookingContext.booking.airports.map((deets) => {
                    if (
                      deets.airportCode ==
                      flightSegments.legs[0].destinationAirportCode
                    ) {
                      return (
                        <Typography>
                          {deets.airportName}
                          <br />
                          {flightSegments.legs[0] && (
                            <Typography>
                              Terminal: {flightSegments.legs[0].arrivalTerminal}
                            </Typography>
                          )}
                        </Typography>
                      );
                    }
                  })}
                </Typography>
              </Box>
            </div>
            <div>
              {/* flight number and airline for box 2 */}
              <Box sx={{ marginLeft: 6 }}>
                <Typography>
                  {flightSegments.legs[0].marketingAirline.name}
                  <br></br>
                  {flightSegments.legs[0].flightNumber}
                </Typography>
                <Typography>
                  Layover Duration:{" "}
                  {Math.floor(flightSegments.legs[0].layoverDuration / 60 / 60)}
                  hrs{(flightSegments.legs[0].layoverDuration % 3600) / 60}
                  mins
                </Typography>
              </Box>
            </div>
          </Box>
          {/* Box 3 */}
          <Box sx={{ border: "0.5px solid", display: "flex" }}>
            <div>
              {/* Second stop departure */}
              <Typography variant="h4">
                {flightSegments.legs[0].destinationAirportCode}
              </Typography>
              <Typography variant="h5">
                {flightSegments.legs[1].departureDateTime}
              </Typography>
              <Typography>
                {bookingContext.booking.airports.map((deets) => {
                  if (
                    deets.airportCode ==
                    flightSegments.legs[0].destinationAirportCode
                  ) {
                    return (
                      <Typography>
                        {deets.airportName}
                        <br />
                        {flightSegments.legs[0] && (
                          <Typography>
                            Terminal: {flightSegments.legs[0]?.arrivalTerminal}
                          </Typography>
                        )}
                        {/* // Terminal: {flightSegments.legs[0]?.arrivalTerminal} */}
                      </Typography>
                    );
                  }
                })}
              </Typography>
            </div>
            <div>
              <FlightTakeoffIcon
                fontSize="large"
                sx={{ display: "flex", marginTop: 5, marginLeft: 6 }}
              />
            </div>
            {/* Destination arrival */}
            <div>
              <Box sx={{ marginLeft: 6 }}>
                <Typography variant="h4">
                  {flightSegments.legs[1].destinationAirportCode}
                </Typography>
                <Typography variant="h5">
                  {flightSegments.legs[1].arrivalDateTime}
                </Typography>
                <Typography>
                  {bookingContext.booking.airports.map((deets) => {
                    if (
                      deets.airportCode == flightSegments.destinationAirportCode
                    ) {
                      return (
                        <Typography>
                          {deets.airportName}
                          <br />
                          {flightSegments.legs[1].arrivalTerminal && (
                            <Typography>
                              Terminal:{" "}
                              {flightSegments.legs[1]?.arrivalTerminal}
                            </Typography>
                          )}
                        </Typography>
                      );
                    }
                  })}
                </Typography>
              </Box>
            </div>
            <Box sx={{ marginLeft: 6 }}>
              {/* flight number and airline for 3rd box */}
              <Typography>
                {flightSegments.legs[1].marketingAirline.name}
                <br />
                {flightSegments.legs[1].flightNumber}
              </Typography>
            </Box>
          </Box>
        </Stack>
        {/* Details of flight (trip duration, price, airplane model) */}
        <div>
          <Typography>
            {/* Time in hours and minutes */}
            trip duration: {Math.floor(
              flightSegments.tripDuration / 60 / 60
            )}{" "}
            Hr {Math.floor((flightSegments.tripDuration % 3600) / 60)} Min
          </Typography>
          <Typography>price: ${flightSegments.fare}</Typography>
          <Typography>{flightSegments.legs[0].aircraft.name}</Typography>
        </div>
        <Button onClick={clickHandler}>Select</Button>
      </Card>
    </div>
  );
};

export default FlightCard;
