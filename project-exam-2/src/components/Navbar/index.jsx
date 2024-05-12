import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const localStorageName = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h1>Navbar</h1>
      <SearchBar />
      <ul>
        <li>
          <Link to="/HomePage">View all Venues</Link>
        </li>
      </ul>
      {isLoggedIn ? (
        <ul className="nav-links">
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            {/* Include the name as a query parameter */}
            <Link to={`/ProfileBookings?name=${localStorageName}`}>
              <a href="#">View your Bookings</a>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul className="nav-links">
          <li>
            <Link to="/">
              <button>Login </button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
