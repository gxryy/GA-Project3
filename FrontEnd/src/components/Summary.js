import React, { useState, useEffect, useContext } from "react";
import BookingContext from "./context/BookingContext";
import { Button, Card, Typography, Container, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import FlightCard from "./FlightCard";

const Summary = () => {
  const bookingContext = useContext(BookingContext);
  console.log(bookingContext.booking);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [flightDetails, setFlightDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(bookingContext.booking);
    let summary = [];
    for (let i = 0; i < bookingContext.booking.passengerInfo.length; i++) {
      summary.push(
        <Container>
          <Typography variant="h4" key={nanoid()}>
            Passenger {i + 1}
          </Typography>
          <Typography variant="h6" key={nanoid()}>
            Passenger Details
          </Typography>
          <Typography variant="p" key={nanoid()}>
            <strong>Name: </strong>
            {bookingContext.booking.passengerInfo[i].title +
              " " +
              bookingContext.booking.passengerInfo[i].firstName +
              " " +
              bookingContext.booking.passengerInfo[i].lastName}
          </Typography>
          <Typography>
            <strong>Email: </strong>
            {bookingContext.booking.passengerInfo[i].email}
          </Typography>
          <Typography>
            <strong> Contact: </strong>
            {bookingContext.booking.passengerInfo[i].mobile}
          </Typography>

          {bookingContext.booking.seatSelection && (
            <>
              <Typography>
                <strong>Seat Selection: </strong>
              </Typography>
              {bookingContext.booking.legs.map((leg, index) => {
                return (
                  <Container>
                    <Typography>
                      SQ {leg.flightNumber}:{" "}
                      {bookingContext.booking.seatSelection[i][index]}
                    </Typography>
                  </Container>
                );
              })}
            </>
          )}
        </Container>
      );
    }
    setPassengerDetails(summary);

    let flightSummary = [];
    for (let segment of bookingContext.booking.selectedFlight) {
      flightSummary.push(
        <FlightCard flightSegments={segment} displaySelect={false}></FlightCard>
      );
    }

    setFlightDetails(flightSummary);
  }, []);

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    navigate("/PassengerDetails");
  };

  const paymentHandler = () => {
    fetch("http://localhost:5001/makePayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingContext.booking),
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
        <Typography variant="h2">Booking Summary</Typography>
        <Typography variant="h4">Passenger Details</Typography>
        <Stack direction="row">{passengerDetails}</Stack>
        <Typography variant="h4">Flight Details</Typography>
        <Container>{flightDetails}</Container>
        <Container>
          <Typography variant="h5">
            Fare per passenger: ${bookingContext.booking.farePerPax}
          </Typography>
          <Typography variant="h4">
            Grand Total: $
            {bookingContext.booking.farePerPax *
              bookingContext.booking.passengerInfo.length}
          </Typography>
        </Container>

        <Button type="submit" onClick={handleSubmitEdit}>
          Edit
        </Button>
        <Button type="submit" onClick={paymentHandler}>
          {" "}
          Make Payment
        </Button>
      </Card>
    </>
  );
};

export default Summary;
