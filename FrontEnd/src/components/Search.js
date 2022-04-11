import React, { useState, useEffect } from "react";
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
// import "@date-io/date-fns";
// import { Grid } from "@mui/material";
// import DateFnsUtils from "@date-io/date-fns/build/date-fns-utils";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { KeyboardDatePicker } from "@material-ui/pickers";

const Search = () => {
  // USESTATES
  const [paxClass, setPaxClass] = useState("");
  const [paxNum, setPaxNum] = useState("");
  const [paxFrom, setPaxFrom] = useState([]);
  const [paxFromValue, setPaxFromValue] = useState(null);
  const [destinationValue, setDestinationValue] = useState(null);
  const [departDateValue, setdepartDateValue] = useState(
    new Date("2022-05-05")
  );

  console.log(paxFromValue); // selected Departure Destination
  console.log(destinationValue); //selectedDestinationValue
  console.log(departDateValue); // selected Depart

  //HANDLECHANGE
  const handleChangePax = (event) => {
    setPaxNum(event.target.value);
    console.log(event.target.value);
  };
  const handleChangeClass = (event) => {
    setPaxClass(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeDepartDate = (date) => {
    setdepartDateValue(date);
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
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker"
                label="Date Picker"
                value={departDateValue}
                onChange={handleChangeDepartDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider> */}

          {/* <CardMedia
        component="img"
        height="500"
        image="https://photos.mandarinoriental.com/is/image/MandarinOriental/kuala-lumpur-2013-exterior-dusk-2?wid=2880&hei=1280&fmt=jpeg&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72&fit=crop"
      /> */}

          {/* FROM */}
          <FormControl sx={{ m: 2, minWidth: 100 }}>
            <Autocomplete
              id="From Destinations"
              options={allAirportCode}
              renderInput={(text) => (
                <TextField {...text} label="From" variant="outlined" />
              )}
              style={{ width: 200 }}
              value={paxFromValue}
<<<<<<< HEAD
              onChange={(_event, newValue) => {
                setPaxFromValue(newValue);
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
=======
              onChange={(_event, newTeam) => {
                // setSelectedTeam(newTeam);
>>>>>>> 0542355e770bbd6c34ec152989707be531234a2a
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
              <MenuItem value="F">First Class</MenuItem>
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

          <Button variant="contained">SEARCH</Button>
        </div>
      </Card>
    </>
  );
};

export default Search;
