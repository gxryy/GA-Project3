import React, { useContext, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, cyan } from "@mui/material/colors";
import { Route, Routes } from "react-router";
import SearchFlight from "./components/SearchFlight";
import Search from "./components/Search";
import Test from "./components/Test";
import Results from "./components/Results";
import ParticularsForm from "./components/ParticularsForm";
import PassengerDetails from "./components/PassengerDetails";
import SeatDisplay from "./components/SeatDisplay";
import BookingContext from "./components/context/BookingContext";
import SeatSelector from "./components/SeatSelector";
import Summary from "./components/Summary";
import AllDestinations from "./components/AllDestinations";
import Success from "./components/Success";
import NewsPage from "./components/NewsPage";

// stripe stuff
import "@stripe/stripe-js";
import Checkout from "./components/Checkout";
// import Summary from "./components/Summary";

const theme = createTheme({
  palette: {
    primary: cyan,
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
    queryParams: {
      originAirportCode: "SIN",
      destinationAirportCode: "XRY",
      departureDate: "2022-05-11",
      returnDate: "2022-05-19",
      cabinClass: "Y",
      adultCount: 2,
    },
    selectedFlight: [],
    passengerInfo: [
      {
        countryCode: "+994",
        email: "garysohjy@gmail.com",
        firstName: "Gary",
        lastName: "Soh",
        mobile: "92235903",
        title: "Mr.",
      },
      {
        countryCode: "+886",
        email: "hebe@gmail.com",
        firstName: "Hebe",
        lastName: "Tien",
        mobile: "9999",
        title: "Miss",
      },
    ],
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
            <Route path="/payment" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </BookingContext.Provider>
        <Routes>
          <Route path="/manage" element={<h1>Manage Booking route</h1>} />
          <Route path="/signup" element={<h1>Signup route</h1>} />
          <Route path="/booking" element={<h1>Booking route</h1>} />{" "}
          <Route path="/ParticularsForm" element={<ParticularsForm />} />{" "}
          <Route path="/SeatDisplay" element={<SeatDisplay />} />
          <Route path="/alldestinations" element={<AllDestinations />} />
          <Route path="/news" element={<NewsPage />} />
          {/* <Route path="/summary" element={<Summary />} /> */}
          {/* <Route
            path="/bookingSummary"
            element={<h1>bookingSummary route</h1>}
          /> */}
          <Route
            path="/seatSelection"
            element={<h1>seat Selection route</h1>}
          />
          <Route path="/test" element={<Test />} />
        </Routes>

        {/* <Search />
        <Results /> */}
      </div>
    </ThemeProvider>
  );
}
