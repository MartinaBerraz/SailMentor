import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signInImage from "../images/signIn.jpg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { selectAuthData } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {
  fetchCompanies,
  selectAllCompanies,
  selectCompaniesStatus,
  setCurrentCompany,
} from "../../features/companies/companiesSlice";
import {
  fetchSailors,
  selectSailorsStatus,
  setCurrentSailor,
} from "../../features/sailors/sailorsSlice";
import SignUp from "./SignUp";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        SailMentor
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authData = useSelector(selectAuthData);

  const companiesStatus = useSelector(selectCompaniesStatus);

  useEffect(() => {
    if (companiesStatus === "idle") {
      dispatch(fetchCompanies());
    }
  }, [companiesStatus, dispatch]);

  const sailorsStatus = useSelector(selectSailorsStatus);

  useEffect(() => {
    if (sailorsStatus === "idle") {
      dispatch(fetchSailors());
    }
  }, [sailorsStatus, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    dispatch(loginUser(formDataObject));
    console.log(formDataObject);
  };

  useEffect(() => {
    if (authData && authData.user) {
      console.log(authData);
      if (authData.userType === "Sailor") {
        console.log("funciona");
        dispatch(setCurrentSailor(authData.userFk));
        navigate("/Home");
      } else {
        if (authData.userType === "Company") {
          dispatch(setCurrentCompany(authData.userFk));
          navigate("/yachtsDashboard");
        }
      }
    }
  }, [authData.userType]);

  if (authData && authData.error) {
    console.log(authData.error);
  }
  const customStyles = {
    textDecoration: "none", // Remove underline
    color: "#3FB295", // Change the text color
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${signInImage})`, // Use the imported image
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#3FB295" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 3, mb: 2, height: "6vh" }}
            >
              Sign In
            </Button>
            <Link to="/signUp" style={customStyles} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
            <Copyright sx={{ mt: "30vh" }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
