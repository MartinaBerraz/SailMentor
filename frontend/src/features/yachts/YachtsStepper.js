import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";

import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Experience from "../../components/sailor/Experience";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import YachtCard from "./YachtCard";

export const YachtsStepper = ({ yachts }) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = Math.ceil(yachts.length / 2); // Calculate the number of steps
  const [activeStep, setActiveStep] = useState(0); // Initialize it with 0 or the desired step
  const cardsPerPage = 2; // Set the number of cards to display per page

  const startIndex = activeStep * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedYachts = yachts.slice(startIndex, endIndex);

  return (
    <div>
      {/* <Stepper activeStep={activeStep} alternativeLabel>
        {Array.from({ length: steps }).map((_, index) => (
          <Step key={index}></Step>
        ))}
      </Stepper> */}
      <Grid sx={{ justifyContent: "center" }} container>
        {yachts.map((yacht, index) => (
          <Grid item md={6} key={yacht.id}>
            <YachtCard yacht={yacht} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default YachtsStepper;
