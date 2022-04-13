import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, Button } from "@mui/material";
import FlightSection from "./FlightSection";
import BookingContext from "./context/BookingContext";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { nanoid } from "nanoid";

const Results = () => {
  const bookingContext = useContext(BookingContext);
  const [selectedFlight, setSelectedFlight] = useState([]);
  const [apiData, setApiData] = useState({ airports: [], flights: [] });
  const [flightDisplay, setFlightDisplay] = useState(<></>);
  const navigate = useNavigate();

  useEffect(() => {
    let data = JSON.stringify(bookingContext.booking.queryParams);

    let config = {
      method: "post",
      url: "http://127.0.0.1:5001/getFlights",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    bookingContext.booking.airports = apiData.airports;
    let display = apiData.flights.map((details, flightIndex) => (
      <FlightSection
        flightDetails={details}
        flightIndex={flightIndex}
        setSelectedFlight={setSelectedFlight}
        selectedFlight={selectedFlight}
        key={nanoid()}
      ></FlightSection>
    ));
    setFlightDisplay(display);
  }, [apiData]);

  const nextHandler = () => {
    let selectedFlightCounter = 0;
    for (let flight in selectedFlight) {
      if (flight) selectedFlightCounter++;
    }
    if (selectedFlightCounter === 2) {
      bookingContext.setBooking((prev) => {
        let updated = { ...prev, selectedFlight };
        return updated;
      });
      navigate("/passengerDetails");
    } else console.log(`Missing flight selection`);
  };

  const loading = <img src={require("../Media/loading.gif")}></img>;

  return (
    <div>
      {apiData.airports.length > 0 ? flightDisplay : loading}
      {apiData.airports.length > 0 && (
        <Button
          onClick={nextHandler}
          size="large"
          endIcon={<ArrowForwardIosIcon />}
          sx={{ marginY: "2em" }}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default Results;
