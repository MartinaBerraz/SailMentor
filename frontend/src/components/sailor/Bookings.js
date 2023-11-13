import AppNavbar from "./AppNavbar";
import Box from "@mui/material/Box";
import Experience from "./Experience";
import React, { useState, useEffect } from "react";
import ExperiencesStepper from "./ExperiencesStepper";
import Typography from "@mui/material/Typography";
import InputAutocomplete from "../common/InputAutocomplete";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import Yachts from "./Yachts";
import { setDestinationFilter } from "../../features/filters/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import backgroundImage from "../images/background.jpg";
import {
  fetchExperiences,
  selectAllExperiences,
  selectFilteredExperiences,
} from "../../features/experiences/experiencesSlice";
import {
  fetchDestinations,
  selectAllDestinations,
} from "../../features/destinations/destinationsSlice";
import BookingList from "../../features/bookings/BookingList";

export const Bookings = () => {
  const dispatch = useDispatch();

  const experiencesList = useSelector(selectFilteredExperiences);
  const experiencesState = useSelector((state) => state.experiences.status);

  const destinationsState = useSelector((state) => state.destinations.status);

  useEffect(() => {
    if (experiencesState === "idle") {
      dispatch(fetchExperiences());
    }

    if (destinationsState === "idle") {
      dispatch(fetchDestinations());
    }
  }, [experiencesState, dispatch]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "27vh", // Set the height to 40% of the viewport height
          flexGrow: 1,
          marginBottom: "3vh",
          backgroundColor: "#3FB295", // Replace with your desired color
          color: "white",
        }}
      >
        <AppNavbar />
        <Typography>
          <h2>Bookings</h2>
          <p>See your previous and following bookings</p>
        </Typography>
      </Box>
      <BookingList />
    </Box>
  );
};

export default Bookings;
