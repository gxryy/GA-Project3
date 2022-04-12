import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import BookingContext from "./context/BookingContext";

const Search = () => {
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);

  // USESTATES
  const [paxClass, setPaxClass] = useState("");
  const [paxNum, setPaxNum] = useState("");
  const [paxFrom, setPaxFrom] = useState([]);
  const [FromValue, setFromValue] = useState(null);
  const [destinationValue, setDestinationValue] = useState(null);
  const [departDateValue, setdepartDateValue] = useState("");
  const [returnDateValue, setReturnDateValue] = useState("");

  //HANDLECHANGE
  const handleChangePax = (event) => {
    setPaxNum(event.target.value);
  };
  const handleChangeClass = (event) => {
    setPaxClass(event.target.value);
  };

  const handleChangeDepartDate = (event) => {
    let departDate = event.target.value;
    setdepartDateValue(departDate);
  };

  const handleChangeReturnDate = (e) => {
    let returnDate = e.target.value;
    setReturnDateValue(returnDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bookingContext.booking.queryParams = {
      originAirportCode: FromValue,
      destinationAirportCode: destinationValue,
      departureDate: departDateValue,
      returnDate: returnDateValue,
      cabinClass: paxClass,
      adultCount: paxNum,
    };
    console.log(bookingContext.booking.queryParams);
    navigate("/results");
  };

  //FETCH DATA GETDESTINATIONS
  const fetchPost = async () => {
    const res = await fetch("http://localhost:5001/getdestinations");
    const data = await res.json();
    setPaxFrom(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // LIST OF ALL AIRPORT CODES
  const allAirportCode = paxFrom.map((data, index) => {
    return (
      data.airportName +
      " " +
      data.airportCode +
      " " +
      data.cityName +
      " " +
      data.countryName
    );
  });
  console.log(allAirportCode);
  console.log(paxFrom);
  // disable past dates
  // const yesterday = new Date().subtract(1, 'day');
  // const disablePastDt = current => {
  //   return current.isAfter(yesterday);
  // };
  //disable past dates
  // function disablePrevDates(date) {
  //   return date.getDay() === 0;
  // }

  const today = new Date();
  console.log(today);
  //RETURN
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <div>
          <form onSubmit={handleSubmit}>
            {/* FROM */}
            <FormControl sx={{ m: 2, minWidth: 100 }}>
              <Autocomplete
                required
                id="From Destinations"
                options={allAirportCode}
                renderInput={(text) => (
                  <TextField
                    required
                    {...text}
                    label="From"
                    variant="outlined"
                  />
                )}
                style={{ width: 200 }}
                value={FromValue}
                onChange={(_event, newValue) => {
                  setFromValue(newValue);
                }}
              />
            </FormControl>
            {/* TO */}
            <FormControl sx={{ m: 2, minWidth: 100 }}>
              <Autocomplete
                id="To Destinations"
                options={allAirportCode}
                renderInput={(text) => (
                  <TextField required {...text} label="To" variant="outlined" />
                )}
                style={{ width: 200 }}
                value={destinationValue}
                onChange={(_event, newDestination) => {
                  setDestinationValue(newDestination);
                }}
                required
              />
            </FormControl>
            {/* DEPART DATE */}
            <FormControl sx={{ m: 2, minWidth: 150 }}>
              <TextField
                required
                id="outlined-input"
                label=" Depart Date"
                type="date"
                // minDate={"2022-04-11"}
                InputProps={{
                  inputProps: { min: "2022-04-11" },
                }}
                // isValidDate = {disablePastDt}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChangeDepartDate}
              />
              {/* <TextField
              type="date"
              inputProps={{
                min: "2020-10-10",
              }}
            /> */}
            </FormControl>
            {/* RETURN DATE */}
            <FormControl sx={{ m: 2, minWidth: 150 }}>
              <TextField
                id="outlined-input"
                label=" Return Date"
                type="date"
                InputProps={{
                  inputProps: { min: "2022-04-11" },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChangeReturnDate}
                required
              />
            </FormControl>
            <br></br>
            {/*  PAX CLASS */}
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="input-label">Class</InputLabel>
              <Select
                id="select-autowidth"
                value={paxClass}
                onChange={handleChangeClass}
                required
                label="Class"
              >
                <MenuItem value="Y">Economy</MenuItem>
                <MenuItem value="J">Business</MenuItem>
              </Select>
            </FormControl>
            {/*  NUM OF PAX */}
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="input-label"></InputLabel>
              <TextField
                select
                required
                id="simple-select-autowidth"
                value={paxNum}
                onChange={handleChangePax}
                label="Passengers"
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={1}>1 adult</MenuItem>
                <MenuItem value={2}>2 adults</MenuItem>
                <MenuItem value={3}>3 adults</MenuItem>
                <MenuItem value={4}>4 adults</MenuItem>
                <MenuItem value={5}>5 adults</MenuItem>
              </TextField>
            </FormControl>

            <Button
              sx={{ m: 2, minHeight: 40, minWidth: 150 }}
              type="submit"
              variant="contained"
            >
              SEARCH
            </Button>
          </form>
        </div>
      </Card>
    </>
  );
};

export default Search;
