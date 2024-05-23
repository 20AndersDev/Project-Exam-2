import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../SearchBar";
import { GiHamburgerMenu } from "react-icons/gi";

// Styled Components
const NavbarContainer = styled.nav`
  background: #ff7f50; /* Warm coral color */
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;

  @media (max-width: 950px) {
    flex-direction: column;
    width: 100%;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    padding-top: 1rem;
  }
`;

const NavItem = styled.li`
  a,
  Link {
    display: flex;
    color: white;
    text-decoration: none;
    align-items: center;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  background: #ffa500; /* Warm orange color */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s ease;
  &:hover {
    background: #ff8c00; /* Darker orange */
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);
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
  const isVenueManager = JSON.parse(localStorage.getItem("VenueManager"));

  return (
    <NavbarContainer>
      <Logo>Holidaze</Logo>

      <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
        <GiHamburgerMenu size={24} color="white" />
      </HamburgerMenu>
      <NavLinks isOpen={menuOpen}>
        <SearchBar />
        <NavItem>
          <Link to="/HomePage">
            <p>Home</p>
          </Link>
        </NavItem>
        {isLoggedIn ? (
          <>
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
              <p>
                <Button onClick={handleLogout}>Logout</Button>
              </p>
            </NavItem>
          </>
        ) : (
          <NavItem>
            <Link to="/">
              <p>
                <Button>Login</Button>
              </p>
            </Link>
          </NavItem>
        )}
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
