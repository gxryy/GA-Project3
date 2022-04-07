export {};
module.exports = async (details: object) => {
  //DEPENDANCIES
  const axios = require("axios");

  //CONSTANTS
  const API_KEY = process.env.flightSearch_KEY!;
  const url =
    "https://apigw.singaporeair.com/api/uat/v1/commercial/flightavailability/get";

  //FUNCTIONS

  //MAIN

  const data: String = JSON.stringify({
    clientUUID: "05b2fa78-a0f8-4357-97fe-d18506618c3f",
    request: {
      itineraryDetails: [
        {
          originAirportCode: "SIN",
          destinationAirportCode: "XRY",
          departureDate: "2022-05-11",
          returnDate: "2022-05-19",
        },
      ],
      cabinClass: "Y",
      adultCount: 1,
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
