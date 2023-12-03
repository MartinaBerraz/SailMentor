// ResetPasswordStep1.jsx
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ResetPasswordStep3 = ({ onClose }) => {
  const handleProceedToSignIn = () => {
    // Close the modal by calling onClose
    onClose();
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          paddingTop: "10vh",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            opacity: "0.8",
            marginBottom: "2vh",
          }}
        >
          {" "}
          You have succesfully restored your password!
        </Typography>
        <Button
          onClick={handleProceedToSignIn}
          variant="contained"
          sx={{
            width: "80%",
            alignSelf: "center",
            display: "flex",
            height: "7vh",
          }}
        >
          proceed to sign in
        </Button>
      </Box>
    </>
  );
};

export default ResetPasswordStep3;
