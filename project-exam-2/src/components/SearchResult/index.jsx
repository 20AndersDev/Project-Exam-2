import React, { useEffect, useState } from "react";
import { search_venues } from "../../Shared/Api";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled Components
const ResultsContainer = styled.div`
  padding: 2rem;
  background: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultItem = styled.div`
  background: #ffffff;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const ResultTitle = styled.h2`
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

const ResultDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
`;

const Message = styled.div`
  font-size: 1.25rem;
  color: #555;
  margin-top: 2rem;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

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
    return <Message>Loading...</Message>;
  }

  if (error) {
    return <Message>Error: {error.message}</Message>;
  }

  if (!searchResults || searchResults.length === 0) {
    return <Message>No results found</Message>;
  }

  return (
    <ResultsContainer>
      <Title>Search Results</Title>
      {searchResults.data.map((result) => (
        <Link to={`/SingleVenue?id=${result.id}`}>
          <ResultItem key={result.id}>
            {result.media && result.media.length > 0 && (
              <Image src={result.media[0].url} alt={result.media[0].alt} />
            )}
            <ResultTitle>{result.name}</ResultTitle>
            <ResultDescription>{result.description}</ResultDescription>
          </ResultItem>
        </Link>
      ))}
    </ResultsContainer>
  );
}

export default SearchResults;
