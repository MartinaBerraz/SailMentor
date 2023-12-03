// ResetPasswordStepper.jsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ResetPasswordStep1 from "./ResetPasswordStep1";
import ResetPasswordStep2 from "./ResetPasswordStep2";
import { Avatar, Paper } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import ResetPasswordStep3 from "./ResetPasswordStep3";

const steps = ["Enter Email", "Verification Code", "Reset Successful"];

const ResetPasswordStepper = ({ onClose }) => {
  const [email, setEmail] = useState(""); // Add state to store the email

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Paper
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        padding: "10px",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        display: "flex",
        height: "80%",
        width: "45%",
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        paddingTop: "5vh",
        paddingInline: "5vw",
      }}
    >
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              color="inherit"
              //   onClick={() => setActiveStep(index)}
              completed={index < activeStep}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "secondary.dark", // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "grey.500", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#3FB295", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "white", // circle's number (ACTIVE)
                },
              }}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          backgroundColor: "#3FB295",
          height: "0.3vh",
          marginBottom: "7vh",
          marginTop: "3vh",
        }}
      ></Box>
      <Avatar
        sx={{
          marginBottom: "2vh",
          alignSelf: "center",
          display: "flex",
          bgcolor: "#3FB295",
        }}
      >
        <LockResetIcon />
      </Avatar>
      <Typography
        sx={{
          justifyContent: "center",
          alignSelf: "center",
          justifyItems: "center",
          opacity: "0.9",
          paddingBottom: "2vh",
          alignItems: "center",
        }}
        variant="h5"
      >
        Reset your Password
      </Typography>

      <div>
        <React.Fragment>
          {activeStep === 0 && (
            <ResetPasswordStep1
              onNext={(nextEmail) => {
                setEmail(nextEmail);
                handleNext();
              }}
            />
          )}
          {activeStep === 1 && (
            <ResetPasswordStep2 email={email} onNext={() => handleNext()} />
          )}
          {activeStep === 2 && (
            <ResetPasswordStep3 onClose={handleCloseModal} />
          )}
        </React.Fragment>
      </div>
    </Paper>
  );
};

export default ResetPasswordStepper;
