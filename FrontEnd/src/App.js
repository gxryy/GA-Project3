import React, { useContext, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router";
import Search from "./components/Search";
import Results from "./components/Results";
import ParticularsForm from "./components/ParticularsForm";
import PassengerDetails from "./components/PassengerDetails";
import SeatDisplay from "./components/SeatDisplay";
import BookingContext from "./components/context/BookingContext";
import SeatSelector from "./components/SeatSelector";
import Summary from "./components/Summary";
import AllDestinations from "./components/AllDestinations";
import Signup from "./components/Signup";
import ManageBookings from "./components/ManageBookings";
import NewsPage from "./components/NewsPage";
// stripe stuff
import "@stripe/stripe-js";
import PaymentFail from "./components/PaymentFail";
// import Summary from "./components/Summary";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00266b",
    },
    secondary: {
      main: "#fefefe",
    },
  },
  typography: {
    fontFamily: "Quicksand,Roboto,Arial",
  },
});

export default function App() {
  const [booking, setBooking] = useState({
    queryParams: {},
    selectedFlight: [],
    passengerInfo: [],
    seatSelection: [],
    airports: [],
  });

  useEffect(() => {
    console.log(booking);
  }, [booking]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar></NavBar>
        <BookingContext.Provider value={{ booking, setBooking }}>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/results" element={<Results />} />
            <Route path="/passengerDetails" element={<PassengerDetails />} />
            <Route path="/seatSelector" element={<SeatSelector />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/paymentfail" element={<PaymentFail />} />
            <Route path="/manage" element={<ManageBookings />} />
            <Route path="/manage/:id/:lastName" element={<ManageBookings />} />
          </Routes>
        </BookingContext.Provider>
        <Routes>
          <Route path="/news" element={<NewsPage />} />
          <Route path="/booking" element={<h1>Booking route</h1>} />{" "}
          <Route path="/ParticularsForm" element={<ParticularsForm />} />{" "}
          <Route path="/SeatDisplay" element={<SeatDisplay />} />
          <Route path="/alldestinations" element={<AllDestinations />} />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/seatSelection"
            element={<h1>seat Selection route</h1>}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
