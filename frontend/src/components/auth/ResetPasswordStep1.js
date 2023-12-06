import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  resetStatus,
  selectAuthData,
  selectAuthStatus,
} from "../../features/auth/authSlice";

const ResetPasswordStep1 = ({ onNext }) => {
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);

  useEffect(() => {
    if (authStatus === "pending") {
      setShowProgress(true);
      setOpenAlert(false);
      console.log("pending");
    } else if (authStatus === "failed") {
      setOpenAlert(true);

      setShowProgress(false);
    } else if (authStatus === "success") {
      setShowProgress(false);
      setOpenAlert(false);

      dispatch(resetStatus());
      onNext(email);
    }
  }, [authStatus, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidEmail(email)) {
      // Dispatch an action to send the verification code to the provided email
      dispatch(resetPassword({ email: email }));
      setOpenAlert(false);
    }
    setOpenAlert(true);
  };

  function isValidEmail(email) {
    // Use a simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;

    if (!isValidEmail(newEmail)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
    setEmail(newEmail);

    setOpenAlert(false);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", paddingTop: "10vh" }}
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
          {showProgress ? (
            <CircularProgress sx={{ color: "#3FB295" }} />
          ) : (
            "Send Verification Code"
          )}
        </Button>
        {openAlert && (
          <Alert severity="error" sx={{ marginTop: "3vh" }}>
            Invalid E-mail
          </Alert>
        )}
      </Box>
    </>
  );
};

export default ResetPasswordStep1;
