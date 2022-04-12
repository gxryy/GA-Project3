import React, { useContext } from "react";
import { Box, Typography, Stack, Button, Container } from "@mui/material";
import { nanoid } from "nanoid";
import FlightLeg from "./FlightLeg";
import BookingContext from "./context/BookingContext";

const FlightCard = ({ flightSegments, id, setSelectedFlight, flightIndex }) => {
  const bookingContext = useContext(BookingContext);

  const clickHandler = () => {
    setSelectedFlight((prev) => {
      let updated = JSON.parse(JSON.stringify(prev));
      updated[flightIndex] = flightSegments;
      return updated;
    });
  };

  return (
    <>
      <Stack
        direction="row"
        border="1px solid black"
        maxWidth={"xl"}
        justifyContent="center"
        marginX={"1em"}
      >
        <Container maxWidth="xl" display="flex">
          {console.log(flightSegments)}
          {flightSegments.legs.map((leg, idx) => {
            console.log(`in leg ${idx}`);
            return <FlightLeg leg={leg} key={nanoid()}></FlightLeg>;
          })}
        </Container>
        <Box
          sx={{ width: "110px" }}
          display="flex"
          alignItems="center"
          justifyItems="center"
        >
          <Typography variant="h5">${flightSegments.fare}</Typography>
        </Box>
        <Button
          onClick={clickHandler}
          size="large"
          sx={{ marginRight: "2em" }}
          variant="outlined"
        >
          Select
        </Button>
      </Stack>
    </>
  );
};

export default FlightCard;
