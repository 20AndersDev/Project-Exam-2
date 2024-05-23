import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 20px;
  flex-grow: 1;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    window.location.href = "/SearchPageResult?q=" + searchQuery;
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
