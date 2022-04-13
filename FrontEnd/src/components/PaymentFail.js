import React from "react";
import { Typography, Container } from "@mui/material";

const PaymentFail = () => {
  return (
    <Container>
      <Typography variant="h3">OOPS.. Booking Failed.. </Typography>
      <img src={require("../Media/sadmonkey.gif")}></img>
      <Typography variant="h5">Try Again </Typography>
    </Container>
  );
};

export default PaymentFail;
