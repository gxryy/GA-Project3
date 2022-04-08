import React from "react";

const FlightSection = (props) => {
  console.log(props);
  return (
    <div>
      <h1>From {props.flightDetails.originAirportCode}</h1>
    </div>
  );
};

export default FlightSection;
