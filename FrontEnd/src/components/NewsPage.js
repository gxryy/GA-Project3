import React from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
const NewsPage = () => {
  return (
    <div>
      <Box sx={{ marginTop: 7 }}>
        <img
          style={{ height: "500px", width: "700px" }}
          src="https://images.unsplash.com/photo-1467007849282-42dad96c2312?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
          alt="news_photo"
        />
      </Box>
      <Box
        display="flex"
        sx={{
          backgroundColor: "whitesmoke",
          marginTop: 7,
          minHeight: "500px",
        }}
      >
        <Grid container justifyContent="center">
          <Stack
            direction="column"
            justifyContent="left"
            alignItems="stretch"
            spacing={5}
          >
            <Typography
              sx={{ marginTop: 3, fontWeight: "bold" }}
              variant="h5"
              alignItems="center"
            >
              Relaxation of Singapore's border measures from 1 April 2022
            </Typography>
            <Box alignItems="center" sx={{ maxWidth: "700px" }}>
              <Typography sx={{}} align="left">
                From 1 April 2022, fully vaccinated travellers on all Nyna
                Airlines (NA) flights will enjoy quarantine-free entry into
                Singapore, without the need for any on-arrival test. They must
                still take a pre-departure test within two days of flight
                departure, and meet prevailing visa requirements.
                <br />
                <br />
                As a result, NA will no longer designate Vaccinated Travel Lane
                (VTL) flights from 1 April 2022. Travellers who are not fully
                vaccinated will be subject to prevailing quarantine and testing
                requirements. Long-Term Pass holders and short-term visitors who
                are not fully vaccinated must also{" "}
                <a
                  style={{ textDecoration: "none" }}
                  href="https://safetravel.ica.gov.sg/arriving/general-travel/non-fully-vaccinated"
                  target="_blank"
                >
                  apply{" "}
                </a>
                for approval prior to entry into Singapore. More information on
                the changes to entry requirements for Singapore may be found on
                Singapore’s Safe Travel{" "}
                <a
                  style={{ textDecoration: "none" }}
                  href="https://safetravel.ica.gov.sg/arriving/general-travel/fully-vaccinated"
                  target="_blank"
                >
                  website
                </a>
                .
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Box>
    </div>
  );
};

export default NewsPage;
