import React, { useContext, useEffect } from "react";
import { Box, Typography, Stack, Button, Container } from "@mui/material";
import { nanoid } from "nanoid";
import FlightLeg from "./FlightLeg";
import BookingContext from "./context/BookingContext";

const FlightCard = ({
  flightSegments,
  setSelectedFlight,
  flightIndex,
  selectedFlight,
  displaySelect = true,
}) => {
  useEffect(() => {
    console.log(selectedFlight);
  }, [selectedFlight]);

  const clickHandler = () => {
    setSelectedFlight((prev) => {
      let updated = JSON.parse(JSON.stringify(prev));
      updated[flightIndex] = flightSegments;
      return updated;
    });
  };

  const borderSelected = "3px solid orange";
  const borderDefault = "1px solid grey";

  return (
    <>
      <Stack
        direction="row"
        border={borderDefault}
        maxWidth={"xl"}
        justifyContent="center"
        marginX={"1em"}
        marginY={"5px"}
      >
        <Container maxWidth="xl" display="flex">
          {flightSegments.legs.map((leg, idx) => {
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
        {displaySelect && (
          <Button
            onClick={clickHandler}
            size="large"
            sx={{ marginRight: "2em" }}
            variant="outlined"
          >
            Select
          </Button>
        )}
      </Stack>
    </>
  );
};

export default FlightCard;
