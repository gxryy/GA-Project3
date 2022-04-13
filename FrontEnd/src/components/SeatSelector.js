import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookingContext from "./context/BookingContext";
import {
  Typography,
  Tabs,
  Box,
  Tab,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { nanoid } from "nanoid";
import SeatDisplay from "./SeatDisplay";
import axios from "axios";
import { LegendToggleSharp } from "@mui/icons-material";

const SeatSelector = () => {
  const bookingContext = useContext(BookingContext);
  const navigate = useNavigate();

  const [legs, setLegs] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [seatMap, setSeatMap] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [passengerSelected, setPassengerSelected] = useState(0);
  const [seatSelection, setSeatSelection] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Initial effect to set legs and passenger states from context
  useEffect(() => {
    let legs = [];
    for (let flight of bookingContext.booking.selectedFlight) {
      legs.push(...flight.legs);
    }
    setLegs(legs);
    setPassengers(bookingContext.booking.passengerInfo);
  }, []);

  // useEffect to update seatMap upon change in seatSelection
  useEffect(() => {
    if (seatSelection.length > 0) {
      setSeatMap((prev) => {
        let newSeatMap = JSON.parse(JSON.stringify(prev));
        // remove previous seats
        let newIndexMap = newSeatMap[tabIndex].map((seat) => {
          let newSeat = seat;
          if (seat.source == "selected") {
            newSeat.source = "";
            newSeat.isVacant = true;
          }
          return newSeat;
        });
        newSeatMap[tabIndex] = newIndexMap;

        //  reselect seats based on seatSelection
        let seatsSelected = [];
        for (let person of seatSelection) {
          if (person[tabIndex]) seatsSelected.push(person[tabIndex]);
        }
        for (let i of seatsSelected) {
          let seatIndex = newSeatMap[tabIndex].findIndex((seat) => {
            if (seat.seat == i) return true;
          });
          newSeatMap[tabIndex][seatIndex].isVacant = false;
          newSeatMap[tabIndex][seatIndex].source = "selected";
        }

        return newSeatMap;
      });
    }
  }, [seatSelection]);

  // Effect to get the initial seatMap from BE
  useEffect(() => {
    if (legs.length > 0) getSeatMap(0);
  }, [legs]);

  const handleChange = (event, newIndex) => {
    if (!seatMap[newIndex]) {
      getSeatMap(newIndex);
    }

    setTabIndex(newIndex);
  };

  // function to request seatmap from the backend.. then update the seatmap state
  const getSeatMap = (index) => {
    let data = JSON.stringify({
      leg: legs[index],
    });
    let config = {
      method: "post",
      url: "http://127.0.0.1:5001/getSeats",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        setSeatMap((prev) => {
          let newSeatMap = JSON.parse(JSON.stringify(prev));
          newSeatMap[index] = response.data;
          return newSeatMap;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // function for rendering of tabs
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div hidden={value !== index}>
        <Stack
          direction="row"
          justifyContent={"center"}
          spacing={10}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {passengers.map((passenger, index) => {
            return (
              <>
                <Button
                  style={{ display: "block" }}
                  onClick={() => passengerHandler(index)}
                >
                  <Typography variant="p">Passenger {index + 1}</Typography>
                  <Typography variant="h6">
                    {passenger.firstName + " " + passenger.lastName}
                  </Typography>
                  <Typography variant="h6">
                    {seatSelection[index] && seatSelection[index][tabIndex]}
                  </Typography>
                </Button>
              </>
            );
          })}
        </Stack>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  // Handler to set selected passenger
  const passengerHandler = (index) => {
    setPassengerSelected(index);
  };

  // Handler to update seat selection upon selection of seats
  const selectionHandler = (seatSelected, tabIndex) => {
    // update seat selection
    setSeatSelection((prev) => {
      let newSeatSelection = JSON.parse(JSON.stringify(prev));
      let seatArray = prev[passengerSelected] || [];
      seatArray[tabIndex] = seatSelected;
      newSeatSelection[passengerSelected] = seatArray;
      return newSeatSelection;
    });
  };

  const nextHandler = () => {
    bookingContext.booking.seatSelection = seatSelection;
    let newlegs = JSON.parse(JSON.stringify(legs));

    for (let index in legs) {
      console.log(seatMap[index]);
      newlegs[index].seatMap = seatMap[index];
    }
    console.log(newlegs);
    bookingContext.booking.legs = newlegs;
    let farePerPax = 0;
    bookingContext.booking.selectedFlight.map(
      (flight) => (farePerPax += flight.fare)
    );
    farePerPax = Math.round(farePerPax * 100) / 100;
    bookingContext.booking.farePerPax = farePerPax;
    navigate("/summary");
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
                    leg.originAirportCode + ` → ` + leg.destinationAirportCode
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
              <SeatDisplay
                flightNumber={leg.flightNumber}
                cabinClass={bookingContext.booking.queryParams.cabinClass}
                seatMap={seatMap[index]}
                seatSelection={(seat) => selectionHandler(seat, index)}
              />
            </TabPanel>
          );
        })}
      </Box>
      <Box>
        <Button disabled={buttonDisabled} onClick={nextHandler}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default SeatSelector;
