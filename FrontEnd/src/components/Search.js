import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Button,
  TextField,
  Box,
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
    return data.airportCode;
  });
  console.log(allAirportCode);

  //RETURN
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <div>
          {/* FROM */}
          <FormControl sx={{ m: 2, minWidth: 100 }}>
            <Autocomplete
              id="From Destinations"
              options={allAirportCode}
              renderInput={(text) => (
                <TextField {...text} label="From" variant="outlined" />
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
                <TextField {...text} label="To" variant="outlined" />
              )}
              style={{ width: 200 }}
              value={destinationValue}
              onChange={(_event, newDestination) => {
                setDestinationValue(newDestination);
              }}
            />
          </FormControl>
          {/* DEPART DATE */}
          <FormControl sx={{ m: 2, minWidth: 150 }}>
            <TextField
              id="outlined-input"
              label=" Depart Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeDepartDate}
            />
          </FormControl>
          {/* RETURN DATE */}
          <FormControl sx={{ m: 2, minWidth: 150 }}>
            <TextField
              id="outlined-input"
              label=" Return Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeReturnDate}
            />
          </FormControl>
          <br></br>
          {/*  PAX CLASS */}
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="select-autowidth-label">Class</InputLabel>
            <Select
              labelId="select-autowidth-label"
              id="select-autowidth"
              value={paxClass}
              onChange={handleChangeClass}
              autoWidth
              label="Class"
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="Y">Economy</MenuItem>
              <MenuItem value="J">Business</MenuItem>
            </Select>
          </FormControl>
          {/*  NUM OF PAX */}
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="select-autowidth-label">Passengers</InputLabel>
            <Select
              labelId="simple-select-autowidth-label"
              id="simple-select-autowidth"
              value={paxNum}
              onChange={handleChangePax}
              autoWidth
              label="Passengers"
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value={1}>1 adult</MenuItem>
              <MenuItem value={2}>2 adults</MenuItem>
              <MenuItem value={3}>3 adults</MenuItem>
              <MenuItem value={4}>4 adults</MenuItem>
              <MenuItem value={5}>5 adults</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleSubmit}>
            SEARCH
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Search;
