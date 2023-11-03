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
export const Home = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [resources, setResources] = useState([]);
  const [displayResources, setDisplayedResources] = useState([]);
  const dispatch = useDispatch();
  const initialDestination = useSelector((state) => state.filters.destination);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(initialDestination);

  const handleCallback = (childData) => {
    // Update the name in the component's state
    setDisplayedResources(
      resources.filter((item) => item.destination_name === childData)
    );
    setSelectedOption(options.find((option) => option.name === childData));
  };

  useEffect(() => {
    fetchOptions(baseUrl + `/destinations/`);
    fetchData(baseUrl + `/experiences/`);
  }, []);

  const fetchData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
        setDisplayedResources(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchOptions = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleOnClick = (e) => {
    if (selectedOption) {
      console.log(selectedOption);
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
          options={options}
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
      {displayResources.length > 0 && (
        <ExperiencesStepper experiences={displayResources} />
      )}
    </Box>
  );
};

export default Home;
