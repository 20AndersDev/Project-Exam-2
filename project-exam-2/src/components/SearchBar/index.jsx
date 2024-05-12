import React, { useState, useEffect } from "react";
import { search_venues } from "../../Shared/Api"; // Importing the API endpoint
import useSearchApi from "../../Hooks/Apihooks/Search"; // Importing the custom hook

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search query

  // State to track search results, loading state, and error state
  const { data, isLoading, isError, fetchData } = useSearchApi();

  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value); // Update searchQuery state as the user types
  };

  const handleSearch = () => {
    window.location.href = "/SearchPageResult?q=" + searchQuery; // Redirect to the search page

    const searchUrl = `${search_venues}${encodeURIComponent(searchQuery)}`;

    // Fetch data from the API using the constructed search URL
    fetchData(searchUrl);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
      {isError && <div>Error: Failed to fetch data</div>}
    </div>
  );
}

export default SearchBar;
