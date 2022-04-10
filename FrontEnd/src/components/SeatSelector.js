import React, { useState, useEffect } from "react";
import { Typography, Container, Grid, Box } from "@mui/material";
import axios from "axios";
import { nanoid } from "nanoid";

const SeatSelector = () => {
  // mock props/context
  let propsflightNumber = 710;
  let propsdepartureDateTime = "2022-06-01 12:50:00";
  let propscabinClass = "Y";
  let propsnumberOfPax = 3;

  // States for seatMap
  const [seatMap, setSeatMap] = useState([]);
  const [JSeatDisplay, setJSeatDisplay] = useState(<></>);
  const [YSeatDisplay, setYSeatDisplay] = useState(<></>);

  // Calls the BE for seatmap
  useEffect(async () => {
    let data = JSON.stringify({
      flightNumber: propsflightNumber,
      departureDateTime: propsdepartureDateTime,
    });
    let config = {
      method: "post",
      url: "http://127.0.0.1:5001/getSeats",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        setSeatMap(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // do create render when there is seatMap
    let JSeatArray = [];
    let YSeatArray = [];

    for (let seat of seatMap) {
      seat.cabinClass == "J" ? JSeatArray.push(seat) : YSeatArray.push(seat);
    }

    let Jdisplay = [
      <>
        <Typography variant="h6">BUSINESS</Typography>
      </>,
    ];
    let Ydisplay = [
      <>
        <Typography variant="h6">ECONOMY</Typography>
      </>,
    ];

    for (let i = 0; i < JSeatArray.length; i += 4) {
      let column = [];
      let row = (
        <Grid container spacing={0} justifyContent="center">
          {column}
        </Grid>
      );

      for (let j = 0; j < 4; j++) {
        if (j == 1 || j == 3) {
          column.push(aisle);
        }
        column.push(
          <Grid item>
            <Box
              sx={
                JSeatArray[i + j].isVacant
                  ? { ...enabled }
                  : JSeatArray[i + j].source == "selected"
                  ? { ...selected }
                  : { ...disabled }
              }
              onClick={clickHandler}
              display="flex"
              justifyContent={"space-around"}
            >
              <Typography variant="h6">{JSeatArray[i + j].seat}</Typography>
            </Box>
          </Grid>
        );
      }

      Jdisplay.push(row);
    }

    for (let i = 0; i < YSeatArray.length; i += 9) {
      let column = [];
      let row = (
        <Grid container spacing={0} justifyContent="center" wrap="nowrap">
          {column}
        </Grid>
      );

      for (let j = 0; j < 9; j++) {
        if (j == 3 || j == 6) {
          column.push(aisle);
        }
        column.push(
          <Grid item>
            <Box
              sx={
                YSeatArray[i + j].isVacant
                  ? { ...enabled }
                  : YSeatArray[i + j].source == "selected"
                  ? { ...selected }
                  : { ...disabled }
              }
              onClick={clickHandler}
              display="flex"
              justifyContent={"center"}
            >
              <Typography variant="h6">{YSeatArray[i + j].seat}</Typography>
            </Box>
          </Grid>
        );
      }

      Ydisplay.push(row);
    }

    setJSeatDisplay(Jdisplay);
    setYSeatDisplay(Ydisplay);
  }, [seatMap]);

  const clickHandler = (event) => {
    console.log(event.target.innerText);
    setSeatMap((prev) => {
      let newSeatMap = JSON.parse(JSON.stringify(prev));
      let index = prev.findIndex(
        (seat) => seat.seat === event.target.innerText
      );
      newSeatMap[index].isVacant = false;
      newSeatMap[index].source = "selected";

      return newSeatMap;
    });
  };

  // Variables for render
  let enabled = {
    border: "2px solid blue",
    borderRadius: "1em",
    height: "60px",
    width: "60px",
    margin: "8px 3px",
    alignItems: "center",
  };

  let disabled = {
    border: "2px solid grey",
    borderRadius: "1em",
    backgroundColor: "gray",
    height: "60px",
    width: "60px",
    margin: "8px 3px",
    alignItems: "center",
  };

  let selected = {
    border: "5px solid lightgreen",
    borderRadius: "1em",
    backgroundColor: "white",
    height: "60px",
    width: "60px",
    margin: "8px 3px",
    alignItems: "center",
  };

  let aisle = <Box width={"40px"}></Box>;

  return (
    <div>
      <Container>
        <Typography variant="h2">Seat Selection</Typography>
        <Typography variant="h4">{"SQ" + propsflightNumber}</Typography>
      </Container>
      <Container>
        {propscabinClass === "J" ? JSeatDisplay : YSeatDisplay}
      </Container>
    </div>
  );
};

export default SeatSelector;
