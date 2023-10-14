import AppNavbar from "./AppNavbar";
import Box from "@mui/material/Box";
import Experience from "./Experience";
import React, { useState, useEffect } from "react";
import ExperiencesStepper from "./ExperiencesStepper";
import Typography from "@mui/material/Typography";
import InputAutocomplete from "../common/InputAutocomplete";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Yachts from "./Yachts";

export const Home = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [resources, setResources] = useState([]);
  const [displayResources, setDisplayedResources] = useState([]);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

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

  return (
    <>
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
        to={`/yachts/${selectedOption.id}`}
        variant="contained"
        color="primary"
      >
        Book a yacht
      </Button>
      {displayResources.length > 0 && (
        <ExperiencesStepper experiences={displayResources} />
      )}
    </>
  );
};

export default Home;
