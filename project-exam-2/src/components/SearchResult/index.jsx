import React, { useEffect, useState } from "react";
import { search_venues } from "../../Shared/Api";

function SearchResults() {
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("q"); // Get the query from the URL

    const fetchData = async () => {
      try {
        const response = await fetch(`${search_venues}?q=${query}`); // Construct the search URL with the query
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSearchResults(data);
        setIsLoading(false);
        console.log(data);
        console.log(response);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!searchResults || searchResults.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div>
      {searchResults.data.map((result) => (
        <div key={result.id}>
          <h2>{result.name}</h2>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
