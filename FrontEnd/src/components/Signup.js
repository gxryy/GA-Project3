import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import ParticularsForm from "./ParticularsForm";

const Signup = (props) => {
  const [details, setDetails] = useState([]);
  console.log(details);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target.Username.value);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "connect.sid=s%3Ak5A6KQpir_yJ176C9CY9RDi5Mile5ERx.QIl%2FgYgYyDYKnDhCH22tEfWon46%2BXN4OGOCmuN4AaWw"
    );

    var raw = JSON.stringify({
      username: e.target.Username.value,
      password: e.target.Password.value,
      title: details[0].title,
      firstName: details[0].firstName,
      lastName: details[0].lastName,
      email: details[0].email,
      mobile: details[0].mobile,
      countryCode: details[0].countryCode,
      passportNumber: details[0].passportNumber,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5001/create", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <form name="form" onSubmit={submitHandler}>
        <Typography variant="h5">Sign up with your details</Typography>
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
          maxWidth="lg"
        >
          <TextField
            name="Username"
            required
            label="username"
            margin="normal"
            sx={{ width: "40%" }}
          ></TextField>
          <TextField
            name="Password"
            label="Password"
            margin="normal"
            sx={{ width: "30%" }}
          ></TextField>
        </Container>
        <ParticularsForm index={0} setForm={setDetails} />

        <Button
          sx={{ m: 2, minHeight: 40, minWidth: 150 }}
          type="submit"
          variant="contained"
        >
          SIGN UP
        </Button>
      </form>
    </>
  );
};

export default Signup;
