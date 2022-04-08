import React from "react";
import {
  Card,
  Typography,
  CardActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOnTwoTone";

const Search = () => {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField id="outlined-input" label="From" />
            <TextField id="outlined-input" label="To" />
            <TextField id="outlined-input" label="Depart Date" />
            <TextField id="outlined-input" label="Return Date" />
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
            />
            <TextField
              id="outlined-number"
              label="Passengers"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained">SEARCH</Button>

          </div>
        </Box>
      </Card>
    </>
  );
};

export default Search;
