import React, { useContext } from "react";
import BookingContext from "./context/BookingContext";

const Success = () => {
  const bookingContext = useContext(BookingContext);

  console.log(bookingContext.booking);
  return (
    <div>
      <h1>Ticket bought successfuly</h1>
    </div>
  );
};

export default Success;
