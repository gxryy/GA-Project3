import React from "react";
import { Typography, Container, Button, Link } from "@mui/material";

const PaymentFail = () => {
  return (
    <Container>
      <Typography variant="h3">OOPS.. Booking Failed.. </Typography>
      <img src={require("../Media/sadmonkey.gif")}></img>
      <Link href="/">
        <Typography variant="h4">Try again</Typography>
      </Link>
    </Container>
  );
};

export default PaymentFail;
