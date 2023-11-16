import Box from "@mui/material/Box";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { addSailor } from "../../features/sailors/sailorsSlice"; // Adjust the import path accordingly
import { addCompany } from "../../features/companies/companiesSlice";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

function isStrongPassword(password) {
  // Password should be at least 8 characters long
  // It should contain at least one uppercase letter, one lowercase letter, one number, and one special character
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return strongPasswordRegex.test(password);
}

function isValidEmail(email) {
  // Use a simple regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const SignUpForm = ({ userType }) => {
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const navigate = useNavigate();

  const handleDialogClose = () => {
    setDialogOpen(false);

    if (dialogTitle === "Success") {
      navigate("/signIn");
    }
  };

  const showDialog = (title, content) => {
    setDialogTitle(title);
    setDialogContent(content);
    setDialogOpen(true);
  };

  const customStyles = {
    textDecoration: "none", // Remove underline
    color: "#3FB295", // Change the text color
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    if (!isStrongPassword(password)) {
      setPasswordError("Password must be strong.");
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;

    if (!isValidEmail(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const { email, password, username } = formDataObject;

    if (isValidEmail(email) && isStrongPassword(password) && username) {
      console.log(formDataObject);
      if (userType === "Sailor") {
        dispatch(addSailor(formDataObject)).then((response) => {
          console.log("API Response:", response);
          if (response.error.message) {
            showDialog("Error", `Username already in use`);
          } else {
            showDialog("Success", "Sailor added successfully");
          }
        });
      } else {
        dispatch(addCompany(formDataObject)).then((response) => {
          console.log("API Response:", response);
          if (response.error.message) {
            showDialog("Error", `Username already in use`);
          } else {
            showDialog("Success", "Sailor added successfully");
          }
        });
      }
    } else {
      showDialog("Error", "Invalid credentials");
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ marginTop: "7%", marginBlock: "1%" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="given-name"
              name="username"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
              helperText={passwordError}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 7, mb: 2, height: "7vh", borderRadius: "10px" }}
        >
          Sign Up
        </Button>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle sx={{ marginInline: "3vw" }}>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogContent}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDialogClose}
              autoFocus
              sx={{ width: "100%" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container justifyContent="center">
          <Grid item>
            <Link style={customStyles} to="/signIn" variant="primary">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUpForm;
