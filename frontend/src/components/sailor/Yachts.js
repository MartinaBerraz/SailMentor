import React from "react";
import AppNavbar from "./AppNavbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import YachtCard from "./YachtCard";
import YachtsStepper from "./YachtsStepper";

export const Yachts = () => {
  const { destination_id } = useParams();
  const [resources, setResources] = useState([]);
  const [displayResources, setDisplayedResources] = useState([]);
  const baseUrl = "http://127.0.0.1:8000/api";

  const [filters, setFilters] = useState({
    destination: "",
    max_people: 0,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(filters).toString();

    fetchData(baseUrl + `/yachts/?${queryParams}`);
  }, []);

  const fetchData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDisplayedResources(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <Box
        sx={{
          height: "30vh", // Set the height to 40% of the viewport height
          flexGrow: 1,
          backgroundColor: "#3FB295", // Replace with your desired color
          color: "white",
        }}
      >
        <AppNavbar />
        <Typography>
          <h2>Find your perfect yacht</h2>
        </Typography>
        {console.log(destination_id)}
      </Box>
      <YachtsStepper yachts={displayResources} />
    </>
  );
};

export default Yachts;
