import logo from "./logo.svg";
import "./App.css";
import { Dashboard } from "./components/company/Dashboard";
import { Home } from "./components/company/Tables/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GenericTable from "./components/company/Tables/GenericTable";
import Dash from "./components/company/Dash";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard component={Home} />} />
        <Route path="/experiences" element={<Dash category="experiences" />} />
        <Route path="/yachts" element={<Dash category="yachts" />} />
      </Routes>
    </div>
  );
}

export default App;
