import React from "react";
import { MenuItem, TextField, Container, Divider } from "@mui/material";
import countryCode from "../lists/countryCode";

const ParticularsForm = (props) => {
  // to have a prop that is a lifting state to parent component
  const titleOptions = ["Mr.", "Mrs.", "Miss", "Mdm", "Dr."];

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

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
        maxWidth="lg"
      >
        <TextField
          name="title"
          select
          required
          label="Title"
          defaultValue=""
          variant="filled"
          margin="normal"
          sx={{ width: "12ch" }}
          onChange={changeHandler}
          name="title"
        >
          {titleOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="firstName"
          required
          label="First/Given Name"
          variant="filled"
          margin="normal"
          sx={{ width: "40%" }}
          onChange={changeHandler}
        ></TextField>
        <TextField
          name="lastName"
          required
          label="Last/Family Name"
          sx={{ width: "40%" }}
          variant="filled"
          margin="normal"
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
          variant="filled"
          margin="normal"
          sx={{ width: "40%" }}
          onChange={changeHandler}
        ></TextField>
        <TextField
          name="passportNumber"
          label="Passport Number"
          variant="filled"
          margin="normal"
          sx={{ width: "30%" }}
          onChange={changeHandler}
        ></TextField>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        maxWidth="lg"
      >
        <TextField
          name="countryCode"
          required
          select
          label="Country Code"
          variant="filled"
          defaultValue=""
          margin="normal"
          sx={{ width: "20%", marginRight: "1em" }}
          onChange={changeHandler}
        >
          {countryCode.map((option) => (
            <MenuItem key={option.name} value={option.dial_code}>
              {option.name + " " + option.dial_code}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="mobile"
          required
          label="Mobile Number"
          variant="filled"
          margin="normal"
          sx={{ width: "30%" }}
          onChange={changeHandler}
        ></TextField>
      </Container>
      <Divider />
    </>
  );
};

export default ParticularsForm;
