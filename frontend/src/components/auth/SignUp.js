import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import backgroundImage from "../images/background.jpg";
import SailorForm from "./SailorForm";
import CompanyForm from "./CompanyForm";
document.body.style.backgroundImage = `url(${backgroundImage})`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";

function Copyright(props) {
  return (
    <Typography
      sx={{ paddingTop: "5%", paddingBottom: "5%" }}
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

const SignUp = () => {
  const [activeButton, setActiveButton] = useState("Sailor"); // Initially, set "Sailor" button as active

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <Container maxWidth="sm" component={Paper} elevation={6}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "5%",
          paddingTop: "5%",
          paddingBottom: "10%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#3FB295" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Grid sx={{ marginBlock: "5%", marginTop: "10%" }} container>
          <Grid item md={6} xs={6}>
            <Button
              sx={{
                width: "95%",
                height: "120%",
                borderRadius: "20px",
                backgroundColor: activeButton === "Sailor" ? "#3FB295" : "#ccc", // Change colors as needed
              }}
              color="primary"
              variant="contained"
              onClick={() => handleButtonClick("Sailor")}
            >
              Sailor
            </Button>
          </Grid>
          <Grid item md={6} xs={6}>
            <Button
              sx={{
                width: "95%",
                height: "120%",

                borderRadius: "20px",
                backgroundColor:
                  activeButton === "Company" ? "#3FB295" : "#ccc", // Change colors as needed
              }}
              color="primary"
              variant="contained"
              onClick={() => handleButtonClick("Company")}
            >
              Company
            </Button>
          </Grid>
        </Grid>
        {activeButton === "Sailor" && <SailorForm userType={"Sailor"} />}
        {activeButton === "Company" && <SailorForm userType={"Company"} />}
      </Box>
      <Copyright />
    </Container>
  );
};

export default SignUp;
