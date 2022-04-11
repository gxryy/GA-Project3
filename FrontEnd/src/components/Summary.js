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
        <Typography variant="h4" key={nanoid()}>
          Passenger {i + 1}
        </Typography>
      );

      summary.push(
        <Typography variant="h7" key={nanoid()}>
          Title First Name
        </Typography>,
    
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
        <Typography variant="h3">Confirm Passengers</Typography><br/>
        {summaryDisplay}

        {/* PAX DETAILS:  bookingContext.booking.passengerInfo */}
        {/* PAX FLIGHT:  bookingContext.booking.selectedFlight */}
        {/* PAX SEAT:  bookingContext.booking.seatSelection */}
        <br />
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
