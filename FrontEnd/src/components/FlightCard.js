import React from "react";
import { Box, Typography, Card, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import MockKL from "../mockResponse/KL.json";
import MockXRY from "../mockResponse/XRY.json";

const FlightCard = ({ detail }) => {
  const flightDetails = [];
  flightDetails.push(MockKL);
  // console.log(detail);
  return (
    <div className="resultspage">
      <Box
        sx={{ marginLeft: 5, marginBottom: 5 }}
        display="flex"
        justifyContent="left"
      >
        <Typography variant="h5">
          {flightDetails.map((detail, index) => ({ detail }))}
        </Typography>
      </Box>
    </div>

    // Origin -> destination flight details
    // <div className="resultspage">
    //   <Box
    //     sx={{ marginLeft: 5, marginBottom: 5 }}
    //     display="flex"
    //     justifyContent="left"
    //   >
    //     <Typography variant="h5">
    //       1. {MockKL.flights[0].originAirportCode} to{" "}
    //       {MockKL.flights[0].destinationAirportCode}
    //     </Typography>
    //   </Box>

    //   <Card
    //     sx={{
    //       marginBottom: 5,
    //       marginLeft: 5,
    //       border: "1px solid",
    //       width: 1000,
    //       padding: 5,
    //       height: 250,
    //     }}
    //     variant="outlined"
    //   >
    //     <Box
    //       sx={{ marginBottom: 6, marginTop: 2 }}
    //       display="flex"
    //       justifyContent="left"
    //     >
    //       <div className="origindetails">
    //         {/* <Typography variant="h4">Origin</Typography> */}
    //         <Typography
    //           sx={{ marginTop: -3, marginLeft: 0, marginBottom: 2 }}
    //           align="left"
    //         >
    //           Two-stops: 21hrs 25mins
    //         </Typography>
    //         <Typography variant="h4">
    //           {MockKL.flights[0].originAirportCode}{" "}
    //           {MockKL.flights[0].segments[0].departureDateTime}
    //         </Typography>
    //         <Typography>{MockKL.airports[1].cityName}</Typography>
    //         {/* <Typography>19 Apr (Tue)</Typography> */}
    //       </div>
    //       <div>
    //         <FlightTakeoffIcon
    //           sx={{ marginLeft: 15, marginTop: 4 }}
    //           fontSize="large"
    //         />
    //       </div>
    //       <div>
    //         <Box sx={{ marginLeft: 15, marginTop: 2 }}>
    //           {/* <Typography variant="h4">Destination</Typography> */}
    //           <Typography variant="h4">
    //             {MockKL.flights[0].destinationAirportCode}{" "}
    //             {MockKL.flights[0].segments[0].legs[0].arrivalDateTime}
    //           </Typography>
    //           <Typography>{MockKL.airports[0].cityName}</Typography>
    //           {/* <Typography>20 Apr (Wed)</Typography> */}
    //         </Box>
    //       </div>
    //       <div className="flightInfo">
    //         <Box
    //           sx={{ border: "none", marginLeft: 8, marginTop: 2 }}
    //           align="left"
    //           justifyContent="left"
    //         >
    //           <Typography align="left" fontWeight="600">
    //             Nyna Airlines
    //           </Typography>
    //           <Typography align="left">
    //             {MockKL.flights[0].segments[0].legs[0].aircraft.code}
    //           </Typography>
    //           <Typography align="left">
    //             {MockKL.flights[0].segments[0].legs[0].aircraft.name}
    //           </Typography>
    //           <Typography align="left">Economy</Typography>
    //         </Box>
    //         <Button
    //           display="flex"
    //           align="right"
    //           variant="outlined"
    //           size="large"
    //         >
    //           Economy
    //         </Button>
    //       </div>
    //     </Box>
    //     <Box className="flightfare"></Box>
    //   </Card>

    //   {/* // Return flight details */}

    //   <Box
    //     sx={{ marginLeft: 5, marginBottom: 5 }}
    //     display="flex"
    //     justifyContent="left"
    //   >
    //     <Typography variant="h5">2. Jerez to Singapore</Typography>
    //   </Box>
    //   <Card
    //     sx={{
    //       marginBottom: 5,
    //       marginLeft: 5,
    //       border: "1px solid",
    //       width: 1000,
    //       padding: 5,
    //       height: 250,
    //     }}
    //     variant="outlined"
    //   >
    //     <Box
    //       sx={{ marginBottom: 6, marginTop: 2 }}
    //       display="flex"
    //       justifyContent="left"
    //     >
    //       <div className="origindetails">
    //         {/* <Typography variant="h4">Origin</Typography> */}
    //         <Typography
    //           sx={{ marginTop: -3, marginLeft: 0, marginBottom: 2 }}
    //           align="left"
    //         >
    //           Two-stops: 34hrs 20mins
    //         </Typography>
    //         <Typography variant="h4">XRY 15:30</Typography>
    //         <Typography>Jerez</Typography>
    //         <Typography>28 Apr (Thu)</Typography>
    //       </div>
    //       <div>
    //         <FlightLandIcon
    //           sx={{ marginLeft: 15, marginTop: 4 }}
    //           fontSize="large"
    //         />
    //       </div>
    //       <div>
    //         <Box sx={{ marginLeft: 15, marginTop: 2 }}>
    //           {/* <Typography variant="h4">Destination</Typography> */}
    //           <Typography variant="h4">SIN 07:50</Typography>
    //           <Typography>Singapore</Typography>
    //           <Typography>30 Apr (Sat)</Typography>
    //         </Box>
    //       </div>
    //       <div className="flightInfo">
    //         <Box
    //           sx={{ border: "none", marginLeft: 8, marginTop: 2 }}
    //           align="left"
    //           justifyContent="left"
    //         >
    //           <Typography align="left" fontWeight="600">
    //             Nyna Airlines
    //           </Typography>
    //           <Typography align="left">SQ 378</Typography>
    //           <Typography align="left">Airbus A350-900</Typography>
    //           <Typography align="left">Economy</Typography>
    //         </Box>
    //       </div>
    //     </Box>
    //   </Card>
    // </div>
  );
};

export default FlightCard;
