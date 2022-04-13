import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { useNavigate } from "react-router-dom";
import BookingContext from "./context/BookingContext";
import axios from "axios";
import {
  Card,
  Button,
  TextField,
  FormControl,
  Box,
  Typography,
  Link,
  Grid,
  Divider,
  Grow,
} from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
const ManageBookings = () => {
  const [checked, setChecked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);
  const params = useParams();
  const GreyTextTypography = withStyles({
    root: {
      color: "grey",
    },
  })(Typography);

  useEffect(() => {
    setChecked(true);
    if (params.id) {
      console.log(`there is ID`);
      console.log(params.id);
      setBookingRef(params.id);
      setLastName(params.lastName);
    } else {
      console.log(`no id`);
    }
  }, []);

  useEffect(() => {
    console.log(`booking ref changed`);
    console.log(bookingRef);
    if (params.id) handleSubmit();
  }, [bookingRef]);

  const handleChangeBookingRef = (event) => {
    let bookingRef = event.target.value;
    setBookingRef(bookingRef);
  };

  const handleChangeLastName = (event) => {
    let lastName = event.target.value;
    setLastName(lastName);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    let data = JSON.stringify({
      bookingRef: bookingRef,
      lastName: lastName,
    });
    console.log(data);
    console.log(bookingRef);

    let config = {
      method: "post",
      url: "http://127.0.0.1:5001/getBooking",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        if (response.data == "error") alert("BOOKING NOT FOUND");
        else {
          console.log(response.data);
          bookingContext.booking = response.data.booking;
          bookingContext.booking.type = "manage";
          bookingContext.booking.paymentSuccess = response.data.paymentSuccess;
          bookingContext.booking.bookingRef = response.data.bookingRef;
          navigate("/summary");
        }
      })
      .catch((error) => {
        navigate("/manage");
        console.log(error);
      });
  };

  return (
    <div>
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
            sx={{
              border: "solid 1px",
              minWidth: 852,
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
              Enter your Booking Reference and Last name
            </Typography>
            <br />
            <Divider variant="middle" />
            <br />
            <GreyTextTypography sx={{ marginLeft: 3 }} align="left">
              Booking reference number should be 8 characters, e.g "LXS0MZQT"
              <br />
            </GreyTextTypography>
            <div>
              <form onSubmit={handleSubmit}>
                <Grid sx={{ marginTop: 1 }} container spacing={3}>
                  <Grid item xs={5}>
                    <FormControl
                      sx={{
                        marginLeft: 1,
                        minWidth: 100,
                        width: 300,
                      }}
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="Booking Reference Num."
                        defaultValue=""
                        onChange={handleChangeBookingRef}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl
                      sx={{ marginLeft: -7, minWidth: 100, width: 300 }}
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="Last Name"
                        defaultValue=""
                        onChange={handleChangeLastName}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      sx={{
                        marginLeft: -6,
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
      </Grid>
    </div>
  );
};

export default ManageBookings;
