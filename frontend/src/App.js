import logo from "./logo.svg";
import "./App.css";
import { Home } from "./components/company/Tables/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GenericTable from "./components/company/Tables/GenericTable";
import Dash from "./components/company/Dash";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { AddForm } from "./components/company/forms/AddForm";

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
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
