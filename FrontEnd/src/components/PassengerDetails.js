import { Typography, Button, Container } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import ParticularsForm from "./ParticularsForm";
import BookingContext from "./context/BookingContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PassengerDetails = () => {
  const bookingContext = useContext(BookingContext);
  const [details, setDetails] = useState([]);
  const [formDisplay, setFormDisplay] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let display = [];
    for (let i = 0; i < bookingContext.booking.queryParams.adultCount; i++) {
      display.push(
        <Container mt="1em">
          <Typography variant="h4" key={nanoid()}>
            Passenger {i + 1}
          </Typography>
        </Container>
      );
      display.push(
        <Container sx={{ marginTop: "1em" }}>
          <ParticularsForm
            index={i}
            setForm={setDetails}
            key={nanoid()}
          ></ParticularsForm>
        </Container>
      );
    }
    setFormDisplay(display);
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    bookingContext.setBooking((prev) => {
      let updated = { ...prev, passengerInfo: details };
      return updated;
    });
    navigate("/SeatSelector");
  };

  return (
    <div>
      <Typography variant="h1">Passenger Details</Typography>
      <form onSubmit={submitHandler}>
        {formDisplay}
        <Button
          type="submit"
          size="large"
          endIcon={<ArrowForwardIosIcon />}
          sx={{ marginY: "2em" }}
        >
          {" "}
          Next
        </Button>
      </form>
    </div>
  );
};

export default PassengerDetails;
