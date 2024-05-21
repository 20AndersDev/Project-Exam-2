import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../SearchBar";

// Styled Components
const NavbarContainer = styled.nav`
  background: #333;
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
  }
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  let localStorageName = localStorage.getItem("name");

  // Trim the localStorageName to remove surrounding double quotes
  if (localStorageName) {
    localStorageName = localStorageName.replace(/^"(.*)"$/, "$1");
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const accessToken = localStorage.getItem("token");
  const isVenueManager = localStorage.getItem("VenueManager");

  return (
    <NavbarContainer>
      <Logo>Navbar</Logo>
      <SearchBar />
      <NavLinks>
        <NavItem>
          <Link to="/HomePage">View all Venues</Link>
        </NavItem>
      </NavLinks>
      {isLoggedIn ? (
        <NavLinks>
          <NavItem>
            <Link to="/Profile">
              <p>Profile</p>
            </Link>
          </NavItem>
          {accessToken && !isVenueManager && (
            <NavItem>
              <Link to={`/ProfileBookings?name=${localStorageName}`}>
                <p>View your Bookings</p>
              </Link>
            </NavItem>
          )}
          <NavItem>
            <Button onClick={handleLogout}>Logout</Button>
          </NavItem>
        </NavLinks>
      ) : (
        <NavLinks>
          <NavItem>
            <Link to="/">
              <Button>Login</Button>
            </Link>
          </NavItem>
        </NavLinks>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
