import logo from "./logo.svg";
import "./App.css";
import { Home } from "./components/sailor/Home.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GenericTable from "./components/company/Tables/GenericTable";
import Dash from "./components/company/Dash";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { AddForm } from "./components/company/forms/AddForm";
import Yachts from "./components/sailor/Yachts";

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
            backgroundColor: "dark", // Custom background color for primary contained button
            color: "white", // Custom text color for primary contained button
            "&:hover": {
              backgroundColor: "grey", // Custom background color on hover
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
          <Route
            path="/experiences"
            element={<Dash category="experiences" />}
          />
          <Route path="/bookings" element={<Dash category="bookings" />} />
          <Route path="/yachts/add" element={<AddForm category="yachts" />} />
          <Route path="/yachts" element={<Dash category="yachts" />} />
          <Route path="/yachts/:destination_id" element={<Yachts />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
