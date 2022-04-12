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
    for (let i = 0; i < bookingContext.booking.passengerInfo.length; i++) {
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
            {bookingContext.booking.passengerInfo[i].title}
            {bookingContext.booking.passengerInfo[i].firstName}
            {bookingContext.booking.passengerInfo[i].lastName}
            <br />
            <strong>Email</strong>:
            {bookingContext.booking.passengerInfo[i].email}
            <strong> Contact Number</strong>:
            {bookingContext.booking.passengerInfo[i].mobile}
          </Typography>
          <br />
          <br />
          {/* <Typography variant="h6" key={nanoid()}>
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
          </Typography> */}
        </>
      );
    }
    setSummaryDisplay(summary);
  }, []);

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    navigate("/PassengerDetails");
  };

  const nextHandler = () => {
    fetch("http://localhost:5001/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 1 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
        console.log(url);
      })
      .catch((e) => {
        console.log(e.error);
      });
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
        <Button type="submit" onClick={nextHandler}>
          {" "}
          Make Payment
        </Button>
      </Card>
    </>
  );
};

export default Summary;
