import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthStatus,
  verifyCodeAndResetPassword,
} from "../../features/auth/authSlice";

function isStrongPassword(password) {
  // Password should be at least 8 characters long
  // It should contain at least one uppercase letter, one lowercase letter, one number, and one special character
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return strongPasswordRegex.test(password);
}

const ResetPasswordStep2 = ({ email, onNext }) => {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);

  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    setOpenAlert(false);
    if (authStatus === "failed") {
      console.log(authError);
      setOpenAlert(true);
    } else if (authStatus === "success") {
      onNext();
      setOpenAlert(false);
    }
  }, [authStatus]);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setOpenAlert(false);

    if (!isStrongPassword(password)) {
      setNewPassword(password);
      setPasswordError(
        "Password should be at least 8 characters long, contain an uppercase and a lowercase letter, one number, and one special character."
      );
    } else {
      setNewPassword(password);
      setPasswordError("");
    }
  };

  const handleCodeChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    console.log(newCodes);

    setOpenAlert(false);

    if (value !== "" && index < codes.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const verificationCode = codes.join("");
    console.log(newPassword);

    if (!isStrongPassword(newPassword)) {
      setOpenAlert(true);
      setPasswordError("");
      console.log("probelm in psw");
      return;
    } else {
      setOpenAlert(false);
      setPasswordError("");
      console.log("here");
    }

    try {
      console.log("got here");
      dispatch(
        verifyCodeAndResetPassword({
          email: email,
          verificationCode: verificationCode,
          newPassword: newPassword,
        })
      );
    } catch (error) {
      console.error("Error:", error);
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
        onChange={(e) => handlePasswordChange(e)}
        error={Boolean(passwordError)}
        helperText={passwordError}
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
        <Alert severity="error" sx={{ marginTop: "10vh" }}>
          Invalid code or Password not Strong Enough
        </Alert>
      )}
    </Box>
  );
};

export default ResetPasswordStep2;
