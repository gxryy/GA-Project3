import React, { useEffect } from "react";
import FlightStop from "./FlightStop";

const FlightLeg = ({ flightLegs }) => {
  useEffect(() => {
    // console.log(flightLegs);
  }, []);

  return (
    <div>
      {/* {flightLegs.stops.length > 0
        ? flightLegs.stops.map((stops) => {
            <FlightStop flightStops={stops} />;
          })
        : console.log("no stops for this leg")} */}
      {flightLegs.stops.map((stops, index) => {
        return <FlightStop key={index} flightStops={stops} />;
      })}
      <p>{flightLegs.flightNumber}</p>
    </div>
  );
};

export default FlightLeg;
