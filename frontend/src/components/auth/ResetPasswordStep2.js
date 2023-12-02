// ResetPasswordStep2.jsx
import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { verifyCodeAndResetPassword } from "../../features/auth/authSlice";

const ResetPasswordStep2 = ({ email, onReset }) => {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const verificationCode = codes.join(""); // Combine individual digits

    // Dispatch an action to verify the code and reset the password
    dispatch(
      verifyCodeAndResetPassword({
        email: email,
        verificationCode: verificationCode,
        newPassword: newPassword,
      })
    );

    // Optionally, you can navigate to a different route or perform other actions
    onReset();
  };

  const handleCodeChange = (index, value) => {
    console.log(email);
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Focus on the next input field after entering a digit
    if (value !== "" && index < codes.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  return (
    <Box sx={{ textAlign: "center", paddingTop: "3vh" }}>
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
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPasswordStep2;
