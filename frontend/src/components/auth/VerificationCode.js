import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/auth/authSlice";
import { useHistory } from "react-router-dom";

const VerificationCode = () => {
  const history = useHistory();

  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidEmail(email)) {
      dispatch(resetPassword(email));
      history.push("/another-view");
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
      console.log(email);
    }
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
        width: "40%",
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        paddingTop: "7vh",
      }}
    >
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
          paddingBottom: "5vh",
          alignItems: "center",
        }}
        variant="h6"
      >
        Reset your Password
      </Typography>
      <Box
        sx={{
          height: "0.2vh",
          backgroundColor: "#3FB295",
          width: "80%",
          display: "flex",
          alignSelf: "center",
        }}
      ></Box>
      <Typography
        sx={{
          opacity: "0.7",
          justifyContent: "center",
          alignSelf: "center",
          paddingTop: "13vh",
        }}
        variant="h6"
      >
        Enter your email
      </Typography>
      <TextField
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        value={email}
        autoComplete="email"
        onChange={handleEmailChange}
        error={Boolean(emailError)}
        helperText={emailError}
        sx={{
          marginTop: "4vh",
          width: "80%",
          display: "flex",
          alignSelf: "center",
          paddingBottom: "3vh",
        }}
      />
      <Typography></Typography>
      <Button
        variant="contained"
        sx={{
          width: "80%",
          alignSelf: "center",
          display: "flex",
          height: "7vh",
        }}
        onClick={handleSubmit}
      >
        SUBMIT{" "}
      </Button>
    </Paper>
  );
};

export default VerificationCode;
