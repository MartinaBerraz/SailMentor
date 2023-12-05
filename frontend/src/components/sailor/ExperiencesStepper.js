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
import Experience from "./Experience";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import backgroundImage from "../images/background.jpg";

export const ExperiencesStepper = ({ experiences, owner = false }) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = Math.ceil(experiences.length / 3);
  const [activeStep, setActiveStep] = useState(0);

  const startIdx = activeStep * 3;
  const endIdx = Math.min((activeStep + 1) * 3, experiences.length);
  const currentExperiences = experiences.slice(startIdx, endIdx);

  return (
    <div>
      <Grid sx={{ justifyContent: "center" }} container spacing={3}>
        {currentExperiences.map((experience) => (
          <Grid item key={experience.id}>
            <Experience owner={owner} experience={experience} />
          </Grid>
        ))}
      </Grid>
      <Button disabled={activeStep === 0} onClick={handleBack}>
        <KeyboardArrowLeft />
        Back
      </Button>
      <Button disabled={activeStep === steps - 1} onClick={handleNext}>
        Next <KeyboardArrowRight />
      </Button>
    </div>
  );
};

export default ExperiencesStepper;
