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

const ResetPasswordStep1 = ({ onNext }) => {
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidEmail(email)) {
      // Dispatch an action to send the verification code to the provided email
      dispatch(resetPassword({ email: email }));
      // // Proceed to the next step
      onNext(email);
    }
  };

  function isValidEmail(email) {
    // Use a simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleEmailChange = (e) => {
    const email = e.target.value;

    if (!isValidEmail(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
      setEmail(email);
    }
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", paddingTop: "15vh" }}
      >
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={handleEmailChange}
          error={Boolean(emailError)}
          helperText={emailError}
          sx={{
            display: "flex",
            alignSelf: "center",
            paddingBottom: "5vh",
          }}
        />
        <Typography></Typography>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            alignSelf: "center",
            display: "flex",
            height: "7vh",
          }}
          onClick={handleSubmit}
        >
          Send Verification Code
        </Button>
      </Box>
    </>
  );
};

export default ResetPasswordStep1;
