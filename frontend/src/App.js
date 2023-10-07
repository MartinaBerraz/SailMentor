import logo from "./logo.svg";
import "./App.css";
import { Dashboard } from "./components/company/Dashboard";
import { Home } from "./components/company/Tables/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Experiences from "./components/company/Tables/Experiences";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard component={Home} />} />
        <Route
          path="/experiences"
          element={<Dashboard component={Experiences} />}
        />
      </Routes>
    </div>
  );
}

export default App;
