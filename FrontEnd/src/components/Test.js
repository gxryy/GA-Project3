import React, { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    try {
      console.log(`fetching API`);
      const response = await fetch("http://127.0.0.1:5001/getFlights");
      if (response.status !== 200) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>HEllo</h1>
    </div>
  );
};

export default Test;
