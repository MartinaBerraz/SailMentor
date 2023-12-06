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
export const Home = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [resources, setResources] = useState([]);
  const dispatch = useDispatch();
  const initialDestination = useSelector((state) => state.filters.destination);

  const [selectedOption, setSelectedOption] = useState(initialDestination);

  const experiencesList = useSelector(selectFilteredExperiences);
  const experiencesState = useSelector((state) => state.experiences.status);

  const destinationsList = useSelector(selectAllDestinations);
  const destinationsState = useSelector((state) => state.destinations.status);

  const handleCallback = (childData) => {
    // Update the name in the component's state
    // setDisplayedResources(
    //   experiencesList.filter((item) => item.destination_name === childData)
    // );
    // setSelectedOption(options.find((option) => option.name === childData));
    // console.log(childData);

    if (childData) {
      const destination = destinationsList.find(
        (item) => item.name === childData
      );
      console.log("destination id:" + destination.id);
      dispatch(setDestinationFilter(destination.id));
    }
  };

  useEffect(() => {
    if (experiencesState === "idle") {
      dispatch(fetchExperiences());
    }

    if (destinationsState === "idle") {
      dispatch(fetchDestinations());
    }
    // fetchOptions(baseUrl + `/destinations/`);
    // fetchData(baseUrl + `/experiences/`);
  }, [experiencesState, dispatch]);

  const handleOnClick = (e) => {
    if (selectedOption) {
      dispatch(setDestinationFilter(selectedOption.id));
    }
  };

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
          height: "33vh", // Set the height to 40% of the viewport height
          flexGrow: 1,
          backgroundColor: "#3FB295", // Replace with your desired color
          color: "white",
        }}
      >
        <AppNavbar />
        <Typography>
          <h2>Ready for a New Adventure?</h2>
          <p>Let's start by choosing a destination</p>
        </Typography>
        <InputAutocomplete
          options={destinationsList}
          label="Discover"
          parentCallback={handleCallback}
        />
      </Box>
      <Button
        component={Link}
        to={`/yachts`}
        variant="contained"
        color="primary"
        onClick={handleOnClick}
      >
        Book a yacht
      </Button>
      {experiencesList.length > 0 && (
        <ExperiencesStepper experiences={experiencesList} />
      )}
    </Box>
  );
};

export default Home;
