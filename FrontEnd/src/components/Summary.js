import React, { useState, useEffect, useContext } from "react";
import BookingContext from "./context/BookingContext";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const Summary = () => {
  const bookingContext = useContext(BookingContext);
  const [summaryDisplay, setSummaryDisplay] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let summary = [];
    for (let i = 0; i < bookingContext.booking.queryParams.adultCount; i++) {
      summary.push(
        <>
          <Typography variant="h3" key={nanoid()}>
            Passenger {i + 1}
          </Typography>
          <Typography variant="h6" key={nanoid()}>
            Passenger Details
          </Typography>
          <Typography variant="p" key={nanoid()}>
            <strong>Name</strong>:
            {bookingContext.booking.passengerInfo[i].title}{" "}
            {bookingContext.booking.passengerInfo[i].firstName}{" "}
            {bookingContext.booking.passengerInfo[i].lastName}
            <br />
            <strong>Email</strong>:
            {bookingContext.booking.passengerInfo[i].email}
            <strong> Contact Number</strong>:
            {bookingContext.booking.passengerInfo[i].mobile}
          </Typography>
          <br />
          <br />
          <Typography variant="h6" key={nanoid()}>
            Flight Details
          </Typography>
          <Typography>
            <strong>Depart Flight:</strong>
            {bookingContext.booking.selectedFlight[i]}
            <br />
            <strong>Return Flight:</strong>
            {bookingContext.booking.selectedFlight[i]}
            <br />
            <strong>Selected Seat:</strong>
            {bookingContext.booking.seatSelection[i]}
          </Typography>
        </>
      );
    }
    setSummaryDisplay(summary);
  }, []);

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    navigate("/PassengerDetails");
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <Typography variant="h2">Confirm Passengers</Typography>
        <br />
        {summaryDisplay}
        <br />
        <Button type="submit" onClick={handleSubmitEdit}>
          Edit
        </Button>
        <Button type="submit"> Next</Button>
      </Card>
    </>
  );
};

export default Summary;
