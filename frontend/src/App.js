import logo from "./logo.svg";
import "./App.css";
import Home from "./components/sailor/Home";
import { Routes, Route, BrowserRouter, Switch } from "react-router-dom";
import GenericTable from "./components/company/Tables/GenericTable";
import Dash from "./components/company/Dash";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { AddForm } from "./components/company/forms/AddForm";
import Yachts from "./components/sailor/Yachts";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { isAuthenticated } from "./features/auth/authSlice";
import { useSelector } from "react-redux";
import Bookings from "./components/sailor/Bookings";
import { UpdateForm } from "./components/company/forms/UpdateForm";
import YachtsDashboard from "./components/company/YachtsDashboard";
import Profile, {
  SailorExperiences,
} from "./components/sailor/SailorExperiences";
import Availability from "./components/company/Availability";

function App() {
  const customTheme = createTheme({
    typography: {
      fontFamily: "Kotta One, sans-serif",
    },
    // palette: {
    //   background: {
    //     default: "#f0f0f0", // Change to your desired background color
    //   },
    // },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            "&:focus": {
              textDecoration: "underline", // Underline for focused links
              textDecorationColor: "#3FB295", // Underline color for focused links
            },
            color: "#3FB295",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#3FB295", // Change the focused label color
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "#3FB295", // Change the focused border color
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          colorSecondary: {
            "&$checked": {
              // Controls checked color for the thumb
              color: "#f2ff00",
            },
          },
          track: {
            // Controls default (unchecked) color for the track
            ".Mui-checked.Mui-checked + &": {
              // Controls checked color for the track
              opacity: 0.7,
              backgroundColor: "#3FB295",
            },
          },
        },
      },
      MuiFormLabel: {
        root: {
          "&:focus": {
            color: "#3FB295", // Change the focused label color
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            "&:focus": {
              borderColor: "#3FB295", // Change the focused background color
            },
          },
          icon: {
            color: "#3FB295", // Change the select icon color
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: "#3FB295", // Custom background color for primary contained button
            color: "white", // Custom text color for primary contained button
            "&:hover": {
              backgroundColor: "grey", // Custom background color on hover
            },
            margin: "1px",
            marginTop: "1%",
          },
          containedSecondary: {
            backgroundColor: "black", // Custom background color for primary contained button
            color: "white", // Custom text color for primary contained button
            "&:hover": {
              backgroundColor: "grey", // Custom background color on hover
            },
            margin: "1px",
            marginTop: "1%",
          },
          containedInfo: {
            backgroundColor: "grey",
            color: "white", // Custom text color for primary contained button
            "&:hover": {
              backgroundColor: "#3FB295", // Custom background color on hover
            },
            margin: "1px",
            marginTop: "1%",
          },
        },
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            element={
              <ProtectedRoute typeAllowed="Sailor" redirectPath="/my%yachts" />
            }
          >
            <Route path="/sailorExperiences" element={<SailorExperiences />} />

            <Route path="/home" element={<Home />} />
            <Route path="/yachts" element={<Yachts />} />
            <Route path="/bookings" element={<Bookings />} />
          </Route>
          <Route
            element={
              <ProtectedRoute typeAllowed="Company" redirectPath="/home" />
            }
          >
            <Route path="/:category/update/:id" element={<UpdateForm />} />
            <Route path="/companyYachts" element={<YachtsDashboard />} />
            <Route
              path="/companyBookings"
              element={<Dash category="bookings" rowsPerPage={10} />}
            />
            <Route
              path="/companyHistory"
              element={<Dash category="history" rowsPerPage={10} />}
            />

            <Route path="/yachts/add" element={<AddForm category="yachts" />} />
            <Route path="/companyAvailability" element={<Availability />} />
          </Route>
          <Route index element={<SignIn />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
