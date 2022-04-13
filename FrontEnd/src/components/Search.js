import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AllDestinations from "./AllDestinations";
import {
  Card,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  MenuItem,
  Box,
  Typography,
  Link,
  Grid,
  Divider,
  Grow,
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
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);
  useEffect(() => {
    console.log(typeof FromValue);
  }, [FromValue]);
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
    // +
    // " " +
    // data.airportName +
    // " " +
    // data.cityName +
    // " " +
    // data.countryName
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
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const currentDate = yyyy + "-" + mm + "-" + dd;
  //RETURN
  // Getting current date

  return (
    <>
      <Box sx={{ backgroundColor: "whitesmoke" }}>
        <Typography>
          Important:
          <AnnouncementIcon
            style={{ color: "orange", marginRight: 30, marginLeft: 5 }}
          />
          <Link
            underline="hover"
            style={{
              color: "black",
            }}
            href="http://localhost:3000/news"
          >
            Relaxation of Singapore's border measures from 1 April 2022
          </Link>
        </Typography>
      </Box>
      <img
        src="https://www.travel-associates.co.nz/sites/v2.travel-associates.co.nz/files/Flights-large-1920x450_0.jpg"
        alt="mainbanner"
        style={{ width: "100%", maxHeight: "600px" }}
      />
      <Grid container justifyContent="center">
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Card
            alignItems="center"
            sx={{
              border: "solid 1px",
              minWidth: 275,
              minHeight: 300,
              position: "absolute",
              marginTop: -20,
            }}
          >
            <Typography
              align="left"
              sx={{ marginLeft: 3, marginTop: 2, color: "darkblue" }}
              variant="h5"
            >
              Hi, where would you like to go?
            </Typography>
            <br />
            <Divider variant="middle" />
            <br />
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
                      <TextField
                        required
                        {...text}
                        label="To"
                        variant="outlined"
                      />
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
                      inputProps: { min: currentDate },
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
                      inputProps: { min: departDateValue },
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
                <Grid container>
                  <Grid item xs={5}>
                    <FormControl
                      sx={{
                        marginLeft: -3,
                        marginTop: 1,
                        minWidth: 150,
                        width: 300,
                      }}
                    >
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
                  </Grid>
                  {/*  NUM OF PAX */}
                  <Grid item xs={5}>
                    <FormControl
                      sx={{
                        marginLeft: -7,
                        marginTop: 1,
                        minWidth: 150,
                        width: 300,
                      }}
                    >
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
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      sx={{
                        marginTop: 1,
                        marginLeft: -5,
                        minHeight: 40,
                        minWidth: 150,
                        height: "55px",
                      }}
                      type="submit"
                      variant="contained"
                    >
                      SEARCH
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Card>
        </Grow>
        <AllDestinations />
      </Grid>
    </>
  );
};

export default Search;
