import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookingContext from "./context/BookingContext";
import { Typography, Tabs, Box, Tab } from "@mui/material";
import { nanoid } from "nanoid";
import SeatDisplay from "./SeatDisplay";

const SeatSelector = () => {
  const bookingContext = useContext(BookingContext);
  const navigate = useNavigate();

  const [legs, setLegs] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [query, setQuery] = useState({});

  useEffect(() => {
    let legs = [];
    for (let flight of bookingContext.booking.selectedFlight) {
      legs.push(...flight.legs);
    }
    setLegs(legs);
    setPassengers(bookingContext.booking.passengerInfo);
    console.log(legs);
    console.log(bookingContext.booking.passengerInfo);
  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div hidden={value !== index}>
        <Box>
          <Typography variant="h3">Passenger selection info here?</Typography>
        </Box>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <>
      <Typography variant="h1">Seat Selection</Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleChange}>
            {legs.map((leg) => {
              return (
                <Tab
                  label={
                    leg.originAirportCode + `-` + leg.destinationAirportCode
                  }
                  key={nanoid()}
                />
              );
            })}
          </Tabs>
        </Box>
        {legs.map((leg, index) => {
          return (
            <TabPanel value={tabIndex} index={index}>
              {leg.originAirportCode}
              <SeatDisplay
                flightNumber={leg.flightNumber}
                departureDateTime={leg.departureDateTime}
                cabinClass={bookingContext.booking.queryParams.cabinClass}
              />
            </TabPanel>
          );
        })}
      </Box>
    </>
  );
};

export default SeatSelector;
