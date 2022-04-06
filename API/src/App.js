import React, { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import FetchAPI from "./components/FetchAPI";
import destinationList from "./Response/destinationList";
import flightAvailResponse from "./Response/flightAvail";

export default function App() {
  const [apiData, setApiData] = useState("");

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);

  // Destinations

  const API_KEY = process.env.REACT_APP_Destinations_KEY;
  const API_SECRET = process.env.REACT_APP_Destinations_SECRET;

  console.log(`The Destinations Response:`);
  const url = "https://apigw.singaporeair.com/api/uat/v1/destinations/get";
  const signature = hash(
    API_KEY.concat(API_SECRET, Math.round(Date.now() / 1000).toString())
  );
  console.log(signature);

  function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, "0"))
        .join("");
      return hashHex;
    });
  }

  const params = {
    headers: {
      "Content-Type": "application/json",
      "x-csl-client-uuid": `${nanoid()}`,
      "x-signature": signature,
      api_key: API_KEY,
    },
    method: "POST",
  };

  // FetchAPI(url, params, setApiData);

  console.log(destinationList);
  console.log(flightAvailResponse);
  return (
    <>
      <h1>Test</h1>
    </>
  );
}
