import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const baseUrl = "http://localhost:8000";

function Carrousel({ images }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "53vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map(
          (step, index) =>
            step && (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                  overflow: "hidden",
                }}
              >
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  src={`${baseUrl}${step}`}
                  alt={`step-${index}`}
                />
              </Box>
            )
        )}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default Carrousel;
