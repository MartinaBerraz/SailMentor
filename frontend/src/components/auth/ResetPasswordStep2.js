import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthStatus,
  verifyCodeAndResetPassword,
} from "../../features/auth/authSlice";

const ResetPasswordStep2 = ({ email, onNext }) => {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);

  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    if (authStatus === "failed") {
      console.log(authError);
      setOpenAlert(true);
    } else if (authStatus === "success") {
      onNext();
      setOpenAlert(false);
    }
  }, [authStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const verificationCode = codes.join(""); // Combine individual digits

    try {
      // Dispatch an action to verify the code and reset the password
      dispatch(
        verifyCodeAndResetPassword({
          email: email,
          verificationCode: verificationCode,
          newPassword: newPassword,
        })
      );

      // If the dispatch is successful, proceed to the next step
    } catch (error) {
      // Handle errors here, you can set an error state and display a message
      console.error("Error:", error);
      // Optionally, you can show an error message to the user
      // setErrorState(true);
    }
  };

  const handleCodeChange = (index, value) => {
    console.log(email);
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    setOpenAlert(false);

    // Focus on the next input field after entering a digit
    if (value !== "" && index < codes.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  return (
    <Box sx={{ textAlign: "center", paddingTop: "2vh" }}>
      <Typography
        sx={{
          justifyContent: "center",
          alignSelf: "center",
          justifyItems: "center",
          opacity: "0.9",
          paddingBottom: "2vh",
          alignItems: "center",
        }}
      >
        Enter the verification code sent to your email
      </Typography>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {codes.map((code, index) => (
          <TextField
            key={index}
            id={`code-${index}`}
            type="text"
            variant="outlined"
            size="medium"
            maxLength="1"
            value={code}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            sx={{
              width: "3rem",
              marginInline: "0.5rem",
              fontSize: "2rem",
              textAlign: "center",
              display: "flex",
              alignContent: "center",
            }}
          />
        ))}
      </Box>
      <TextField
        type="password"
        placeholder="Enter New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ textAlign: "center", marginTop: "10vh", width: "100%" }}
      />
      <Button
        variant="contained"
        sx={{
          width: "100%",
          alignSelf: "center",
          display: "flex",
          height: "7vh",
          marginTop: "2vh",
        }}
        onClick={handleSubmit}
      >
        {authStatus === "pending" ? (
          <CircularProgress sx={{ color: "#3FB295" }} />
        ) : (
          "Reset Password"
        )}
      </Button>
      {openAlert && (
        <Alert severity="error" sx={{ marginTop: "2vh" }}>
          Invalid code
        </Alert>
      )}
    </Box>
  );
};

export default ResetPasswordStep2;
