import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { addSailor } from "../../features/sailors/sailorsSlice"; // Adjust the import path accordingly
import { useDispatch } from "react-redux";
import { addCompany } from "../../features/companies/companiesSlice";
import SignIn from "./SignIn";
import { Link } from "react-router-dom";

const SailorForm = ({ userType }) => {
  const dispatch = useDispatch();

  const customStyles = {
    textDecoration: "none", // Remove underline
    color: "#3FB295", // Change the text color
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log(formDataObject);
    if (userType === "Sailor") {
      dispatch(addSailor(formDataObject));
    } else {
      dispatch(addCompany(formDataObject));
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
              autoComplete="new-password"
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
export default SailorForm;
