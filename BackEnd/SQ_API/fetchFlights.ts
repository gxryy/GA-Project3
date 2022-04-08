export {};
module.exports = async (details: {
  originAirportCode: String;
  destinationAirportCode: String;
  departureDate: String;
  returnDate: String;
  cabinClass: String;
  adultCount: Number;
}) => {
  //DEPENDANCIES
  const axios = require("axios");

  //CONSTANTS
  const API_KEY = process.env.flightSearch_KEY!;
  const url =
    "https://apigw.singaporeair.com/api/uat/v1/commercial/flightavailability/get";

  //FUNCTIONS

  //MAIN

  console.log(details);

  const data: String = JSON.stringify({
    clientUUID: "05b2fa78-a0f8-4357-97fe-d18506618c3f",
    request: {
      itineraryDetails: [
        {
          originAirportCode: details.originAirportCode,
          destinationAirportCode: details.destinationAirportCode,
          departureDate: details.departureDate,
          returnDate: details.returnDate,
        },
      ],
      cabinClass: details.cabinClass,
      adultCount: details.adultCount,
      childCount: 0,
      infantCount: 0,
    },
  });

  const config = {
    method: "post",
    url: "https://apigw.singaporeair.com/api/uat/v1/commercial/flightavailability/get",
    headers: {
      accept: "application/json",
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios(config);
  return response.data;
};
