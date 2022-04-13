import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Link } from "@mui/material";

const PaymentFail = () => {
  const params = useParams();

  return (
    <Container>
      <Typography variant="h3">OOPS.. Booking Failed.. </Typography>
      <img src={require("../Media/sadmonkey.gif")}></img>

      <Link href={`/manage/${params.id}/${params.lastName}`}>
        <Typography variant="h4">Try again</Typography>
      </Link>
    </Container>
  );
};

export default PaymentFail;
