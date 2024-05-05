import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage";
import RegisterPage from "../../Pages/RegisterPage";
import HomePage from "../../Pages/HomePage";
import SingleVenuePage from "../../Pages/SingleVenuePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/SingleVenue" element={<SingleVenuePage />} />
      </Routes>
    </Router>
  );
}

export default App;
