// DEPENDENCIES
require('dotenv').config()
const express = require("express");
const axios = require("axios");
const path = require("path");
const { createHash } = require('crypto');
const PORT = process.env.PORT || 5001;

// CONFIGURATION
const app = express();

// CONST
const API_KEY=process.env.Destinations_KEY
const API_SECRET=process.env.Destinations_SECRET
const url ='https://apigw.singaporeair.com/api/uat/v1/destinations/get';


//FUNCTIONS
function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}



//DATA


//MAIN
const signature = hash(API_KEY.concat(API_SECRET,(Math.round(Date.now()/1000)).toString()))

console.log(signature)
const params = {
  headers: {
    "Content-Type": "application/json",
    "x-csl-client-uuid": `testing`,
    "x-signature":signature,
    api_key: API_KEY,
  },
  method: "POST",
};

const data = axios({
  method: 'post',
  url,
  headers: {
    "Content-Type": "application/json",
    "x-csl-client-uuid": `testing`,
    "x-signature":signature,
    api_key: API_KEY,
  },
  })

// ROUTES
app.get("/", (req, res) => {
res.json(data)
});


// Listener
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
