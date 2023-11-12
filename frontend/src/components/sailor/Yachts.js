import React from "react";
import AppNavbar from "./AppNavbar";
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDestinations,
  selectAllDestinations,
} from "../../features/destinations/destinationsSlice";
import YachtsList from "../../features/yachts/YachtsList";
import FilterForm from "../common/FilterForm";
import backgroundImage from "../images/background.jpg";
import BookForm from "../common/BookForm";

export const Yachts = () => {
  const destinationStatus = useSelector((state) => state.destinations.status);

  const dispatch = useDispatch();
  const destinationsList = useSelector(selectAllDestinations);

  useEffect(() => {
    if (destinationStatus === "idle") {
      dispatch(fetchDestinations());
      console.log(destinationsList);
    }
  }, [destinationStatus, dispatch]);

  return (
    <Box
      sx={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          maxHeight: "40vh",
          backgroundColor: "#3FB295", // Replace with your desired color
          color: "white",
          marginBottom: "1vh",
        }}
      >
        <AppNavbar />
        <Typography>
          <h2>Find your perfect yacht</h2>
          <p>Plan your trip</p>
        </Typography>
        <FilterForm />
      </Box>
      <Grid container>
        <Grid item md={5}>
          <BookForm />
        </Grid>
        <Grid item md={7}>
          <YachtsList />
        </Grid>
      </Grid>

      {/* <Grid
          sx={{ marginLeft: "2%" }}
          container
          spacing={1}
          alignItems="center"
        >
          <Grid item>
            <InputDatePicker label={"Departure date"} />
          </Grid>
          <Grid item></Grid>
          <Grid item>
            <FormGroup sx={{ marginLeft: "20%" }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Tripulation"
              />
            </FormGroup>
          </Grid>
        </Grid> */}
    </Box>
  );
};

export default Yachts;
