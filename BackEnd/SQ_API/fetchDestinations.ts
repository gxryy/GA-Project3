export {};
module.exports = async () => {
  //DEPENDANCIES
  const axios = require("axios");
  const { createHash } = require("crypto");

  //CONSTANTS
  const API_KEY = process.env.Destinations_KEY!;
  const API_SECRET = process.env.Destinations_SECRET!;
  const url = "https://apigw.singaporeair.com/api/uat/v1/destinations/get";

  //FUNCTIONS
  function hash(string: String) {
    return createHash("sha256").update(string).digest("hex");
  }

  //MAIN
  const signature = hash(
    API_KEY.concat(API_SECRET, Math.round(Date.now() / 1000).toString())
  );

  const params = {
    headers: {
      "Content-Type": "application/json",
      "x-csl-client-uuid": `testing`,
      "x-signature": signature,
      api_key: API_KEY,
    },
    method: "POST",
  };

  const response = await axios({
    method: "post",
    url,
    headers: {
      "Content-Type": "application/json",
      "x-csl-client-uuid": `testing`,
      "x-signature": signature,
      api_key: API_KEY,
    },
  });

  return response.data;
};
