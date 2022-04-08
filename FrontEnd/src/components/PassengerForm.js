import React, { useState, useEffect } from "react";
import ParticularsForm from "./ParticularsForm";

const PassengerForm = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <div>
      <h1>Testing state</h1>
      <form onSubmit={submitHandler}>
        <ParticularsForm index={0} setForm={setData}></ParticularsForm>
        <ParticularsForm index={1} setForm={setData}></ParticularsForm>
        <input type="submit" />
      </form>
    </div>
  );
};

export default PassengerForm;
