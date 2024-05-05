import React, { useState } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to the home page after logout
  };

  return (
    <nav className="navbar">
      <h1>Navbar</h1>
      {isLoggedIn && ( // Render the navigation links only if the user is logged in
        <ul className="nav-links">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="#">Bookings</a>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
