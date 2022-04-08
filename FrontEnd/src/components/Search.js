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
import LocationOnIcon from "@mui/icons-material/LocationOnTwoTone";

const Search = () => {
  // USESTATES
  const [paxClass, setPaxClass] = useState("");
  const [paxNum, setPaxNum] = useState("");
  const [paxFrom, setPaxFrom] = useState([]);
  const [paxFromValue, setPaxFromValue] = useState(null);

  //HANDLECHANGE
  const handleChange = (event) => {
    setPaxClass(event.target.value);
    console.log(event.target.value);
  };

  const handleChangePax = (event) => {
    setPaxNum(event.target.value);
    console.log(event.target.value);
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
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="on"
        >
          <div>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <Autocomplete
                id="From Destinations"
                options={allAirportCode}
                renderInput={(text) => (
                  <TextField {...text} label="From" variant="outlined" />
                )}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 150 }}></FormControl>
            <Autocomplete
              id="From Destinations"
              options={allAirportCode}
              renderInput={(text) => (
                <TextField {...text} label="To" variant="outlined" />
              )}
              value={paxFromValue}
              onChange={(_event, newTeam) => {
                setSelectedTeam(newTeam);
              }}
            />
            <FormControl />
            <TextField
              id="outlined-input"
              label="Depart Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-input"
              label=" Return Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="select-autowidth-label">Class</InputLabel>
              <Select
                labelId="select-autowidth-label"
                id="select-autowidth"
                value={paxClass}
                onChange={handleChange}
                autoWidth
                label="Class"
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="Y">Economy</MenuItem>
                <MenuItem value="J">Business</MenuItem>
                <MenuItem value="F">First Class</MenuItem>
              </Select>
            </FormControl>
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
        </Box>
      </Card>
    </>
  );
};

export default Search;
