import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Manage = () => {
  const params = useParams();
  console.log(params.id);

  const [bookings, setBookings] = useState([
    {
      bookingRef: "",
      flyerNumber: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:3000/manage")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setBookings(jsonRes));
  }, []);
  return (
    <div>
      <h1>The booking ref is {params.id}</h1>
      <h1>Manage component</h1>
      {bookings.map((booking) => (
        <h1>{booking.bookingRef}</h1>
      ))}
    </div>
  );
};

export default Manage;
