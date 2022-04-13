import React from "react";
import {
  TextField, Button,
  Container,
  Typography,
} from "@mui/material";

const Signup = (props) => {
  const changeHandler = (event) => {
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    props.setForm((prev) => {
      let p = prev;
      p[props.index] = { ...prev[props.index], [fieldName]: fieldValue };
      // console.log(p);
      return p;
      // return { ...prev, [fieldName]: fieldValue };
    });
  };

  const submitHandler=(e)=>{
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={submitHandler}>
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
            name="firstName"
            required
            label="First/Given Name(as in passport)"
            margin="normal"
            sx={{ width: "45%" }}
            onChange={changeHandler}
          ></TextField>
          <TextField
            name="lastname"
            required
            label="Last/Family Name(as in passport)"
            margin="normal"
            sx={{ width: "45%" }}
            onChange={changeHandler}
          ></TextField>
        </Container>
        <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
        maxWidth="lg"
      >
        <TextField
          name="email"
          required
          label="Email"
          margin="normal"
          sx={{ width: "45%" }}
          onChange={changeHandler}
        ></TextField>
        <TextField
          name="passportNumber"
          label="Passport Number"
          margin="normal"
          sx={{ width: "45%" }}
          onChange={changeHandler}
        ></TextField></Container>
          <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
        maxWidth="lg"
      >
        <TextField
          name="password"
          required
          label="Password"
          margin="normal"
          sx={{ width: "45%" }}
          onChange={changeHandler}
        ></TextField>
        <TextField
          name="password"
          label="Confirm Password"
          margin="normal"
          sx={{ width: "45%" }}
          onChange={changeHandler}
        ></TextField></Container><Button
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
