import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage";
import RegisterPage from "../../Pages/RegisterPage";
import HomePage from "../../Pages/HomePage";
import SingleVenuePage from "../../Pages/SingleVenuePage";
import Layout from "../Layout";
import CreateVenuePage from "../../Pages/CreateVenuePage";
import SearchResults from "../SearchResult";
import DisplaybookingsPage from "../../Pages/ProfileBookingsPage";
import ProfilePage from "../../Pages/ProfilePage";
import UpdateProfilePage from "../../Pages/UpdateProfilePage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/SingleVenue" element={<SingleVenuePage />} />
          <Route path="/CreateVenue" element={<CreateVenuePage />} />
          <Route path="/SearchPageResult" element={<SearchResults />} />
          <Route path="/ProfileBookings" element={<DisplaybookingsPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/UpdateProfile" element={<UpdateProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
