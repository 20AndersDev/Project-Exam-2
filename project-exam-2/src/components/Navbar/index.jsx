import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

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
            <a href="#">View your Bookings</a>
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
