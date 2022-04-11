"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (details) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //DEPENDANCIES
    const axios = require("axios");
    //CONSTANTS
    const API_KEY = process.env.flightSearch_KEY;
    console.log(API_KEY);
    const url =
      "https://apigw.singaporeair.com/api/uat/v1/commercial/flightavailability/get";
    //FUNCTIONS
    //MAIN
    console.log(details);
    const data = JSON.stringify({
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
    const response = yield axios(config);
    return response.data;
  });
