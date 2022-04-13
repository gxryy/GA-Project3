import React, { useState, useEffect } from "react";
import { Typography, Container, Grid, Box } from "@mui/material";
import { nanoid } from "nanoid";

const SeatDisplay = (props) => {
  const [JSeatDisplay, setJSeatDisplay] = useState(<></>);
  const [YSeatDisplay, setYSeatDisplay] = useState(<></>);

  const seatMap = props.seatMap;

  useEffect(() => {
    // do create render when there is seatMap
    let JSeatArray = [];
    let YSeatArray = [];
    if (seatMap) {
      for (let seat of seatMap) {
        seat.cabinClass === "J" ? JSeatArray.push(seat) : YSeatArray.push(seat);
      }

      let Jdisplay = [
        <>
          <Typography variant="h3">BUSINESS</Typography>
        </>,
      ];
      let Ydisplay = [
        <>
          <Typography variant="h3">ECONOMY</Typography>
        </>,
      ];
      for (let i = 0; i < JSeatArray.length; i += 4) {
        let column = [];
        let row = (
          <Grid container spacing={0} justifyContent="center" key={nanoid()}>
            {column}
          </Grid>
        );

        for (let j = 0; j < 4; j++) {
          if (j === 1 || j === 3) {
            column.push(<Box width={"40px"} key={nanoid()}></Box>);
          }
          column.push(
            <Grid item key={nanoid()}>
              <Box
                sx={
                  JSeatArray[i + j].isVacant
                    ? { ...enabled }
                    : JSeatArray[i + j].source === "selected"
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
          <Grid
            container
            spacing={0}
            justifyContent="center"
            wrap="nowrap"
            key={nanoid()}
          >
            {column}
          </Grid>
        );

        for (let j = 0; j < 9; j++) {
          if (j === 3 || j === 6) {
            column.push(<Box width={"40px"} key={nanoid()}></Box>);
          }
          column.push(
            <Grid item key={nanoid()}>
              <Box
                sx={
                  YSeatArray[i + j].isVacant
                    ? { ...enabled }
                    : YSeatArray[i + j].source === "selected"
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
    }
  }, [seatMap]);

  const clickHandler = (event) => {
    props.seatMap.map((seat) => {
      if (seat.seat === event.target.innerText && seat.isVacant)
        props.seatSelection(event.target.innerText);
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

  return (
    <>
      <Container>
        {/* <Typography variant="h2">Seat Selection</Typography> */}
        <Typography variant="h4">{"SQ" + props.flightNumber}</Typography>
      </Container>
      <Container>
        {props.cabinClass === "J" ? JSeatDisplay : YSeatDisplay}
      </Container>
    </>
  );
};

export default SeatDisplay;
