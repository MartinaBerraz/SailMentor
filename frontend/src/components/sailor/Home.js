import AppNavbar from "./AppNavbar";
import Box from "@mui/material/Box";
import Experience from "./Experience";
import React, { useState, useEffect } from "react";
import ExperiencesStepper from "./ExperiencesStepper";
import Typography from "@mui/material/Typography";
import InputAutocomplete from "../common/InputAutocomplete";

export const Home = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [resources, setResources] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleCallback = (childData) => {
    // Update the name in the component's state
    setSelectedOption(childData);
    handleSelected(options.find((option) => option.name === selectedOption));
  };

  useEffect(() => {
    fetchOptions(baseUrl + `/destinations/`);
    fetchData(baseUrl + `/experiences/`);
  }, []);

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const handleSelected = (option) => {
    if (option) {
      console.log("Found option:", option.name);
      console.log("ID:", option.id);
    } else {
      console.log(`${selectedOption} not found in the options array`);
    }
  };

  const fetchData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
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
          height: "35vh", // Set the height to 40% of the viewport height
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
      {resources.length > 0 && <ExperiencesStepper experiences={resources} />}
    </>
  );
};

export default Home;
