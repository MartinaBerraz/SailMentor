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
    <>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "25vh",
          backgroundColor: "#3FB295", // Replace with your desired color
          color: "white",
          marginBottom: "4vh",
        }}
      >
        <AppNavbar />
        <Typography sx={{ marginBottom: "10vh" }}>
          <h2>Find your perfect yacht</h2>
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <FilterForm />
        </Grid>
        <Grid item xs={12} sm={7}>
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
    </>
  );
};

export default Yachts;
