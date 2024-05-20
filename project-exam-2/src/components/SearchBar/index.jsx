import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search query

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value); // Update searchQuery state as the user types
  };

  const handleSearch = () => {
    window.location.href = "/SearchPageResult?q=" + searchQuery; // Redirect to the search page
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
}

export default SearchBar;
