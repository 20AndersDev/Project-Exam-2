import { useState, useEffect } from "react";
import { venues_by_name } from "../../Shared/Api";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  padding: 2rem;
  background: #f0f2f5;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #555;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background: #0056b3;
  }
`;

const VenueListContainer = styled.div`
  margin-top: 2rem;
`;

const VenueItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const VenueName = styled.h2`
  font-size: 1.25rem;
  color: #007bff;
  margin: 0;
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const VenueDetails = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
`;

const VenueImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

async function getVenueByName(url) {
  try {
    const accessToken = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apikey");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching venue data:", error);
    throw error;
  }
}

function VenueList() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apikey");
    const storedToken = localStorage.getItem("token");

    if (storedApiKey && storedToken) {
      const fetchData = async () => {
        try {
          const replaceNameUrl = `${venues_by_name}/${localStorage
            .getItem("name")
            .replace(/"/g, "")}/venues`;
          const newData = await getVenueByName(replaceNameUrl);
          setData(newData);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, []);

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data === null || data.length === 0) {
    return (
      <div>
        <Subtitle>No venues found</Subtitle>
        <Link to="/CreateVenue">
          <Button>Create a venue here</Button>
        </Link>
      </div>
    );
  } else {
    return (
      <VenueListContainer>
        <Subtitle>Venues you are managing:</Subtitle>
        <Link to="/CreateVenue">
          <Button>Create a venue here</Button>
        </Link>
        {data.data.map((venue, index) => (
          <VenueItem key={index}>
            {venue.media && venue.media.length > 0 && venue.media[0].url ? (
              <VenueImage src={venue.media[0].url} alt={venue.name} />
            ) : (
              <VenueImage src="default-image-url" alt="Default Image" />
            )}
            <VenueName>
              <Link to={`/SingleVenue?id=${venue.id}`}>{venue.name}</Link>
            </VenueName>
            <VenueDetails>{venue.description}</VenueDetails>
            <VenueDetails>Max guests: {venue.maxGuests}</VenueDetails>
            <VenueDetails>Price: {venue.price}</VenueDetails>
            {/* Add additional venue details here */}
          </VenueItem>
        ))}
      </VenueListContainer>
    );
  }
}

function VenueManagerPageView() {
  return (
    <PageContainer>
      <Title>
        Welcome venue manager, {localStorage.getItem("name").replace(/"/g, "")}
      </Title>
      <VenueList />
    </PageContainer>
  );
}

export default VenueManagerPageView;
