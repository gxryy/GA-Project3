import { Typography, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import ParticularsForm from "./ParticularsForm";
import BookingContext from "./context/BookingContext";

const PassengerDetails = () => {
  const bookingContext = useContext(BookingContext);
  const [details, setDetails] = useState([]);
  const [formDisplay, setFormDisplay] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let display = [];
    for (let i = 0; i < bookingContext.booking.queryParams.adultCount; i++) {
      display.push(
        <Typography variant="h4" key={nanoid()}>
          Passenger {i + 1}
        </Typography>
      );
      display.push(
        <ParticularsForm
          index={i}
          setForm={setDetails}
          key={nanoid()}
        ></ParticularsForm>
      );
    }
    setFormDisplay(display);
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(details);
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
        <Button type="submit"> Next</Button>
      </form>
    </div>
  );
};

export default PassengerDetails;
