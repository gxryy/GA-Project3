import React from "react";
import {
  TextField, Button,
  Container,
  Typography,
} from "@mui/material";
import ParticularsForm from "./ParticularsForm";

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
          name="Username"
          required
          label="username"
          margin="normal"
          sx={{ width: "40%" }}
          onChange={changeHandler}
        ></TextField>
        <TextField
          name="Password"
          label="Password"
          margin="normal"
          sx={{ width: "30%" }}
          onChange={changeHandler}
        ></TextField>
      </Container>
     <ParticularsForm/>
     
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
