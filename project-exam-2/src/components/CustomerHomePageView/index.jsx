import { Link } from "react-router-dom";
import { all_venues } from "../../Shared/Api";
import useApi from "../../Hooks/Apihooks/";
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
  margin-bottom: 2rem;
`;

const VenueList = styled.ul`
  list-style: none;
  padding: 0;
`;

const VenueItem = styled.li`
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
  font-size: 1.5rem;
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

const VenueDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

function DisplayVenues() {
  const { data, isLoading, isError } = useApi(all_venues);

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (isError) {
    return <PageContainer>Error fetching data</PageContainer>;
  }

  return (
    <PageContainer>
      <Title>Customer Home Page</Title>
      <VenueList>
        {data.map((venue) => (
          <VenueItem key={venue.id}>
            <VenueName>
              {/* Use Link component to redirect to SingleVenue with ID as query parameter */}
              <Link to={`/SingleVenue?id=${venue.id}`}>{venue.name}</Link>
            </VenueName>
            <VenueDescription>{venue.description}</VenueDescription>
          </VenueItem>
        ))}
      </VenueList>
    </PageContainer>
  );
}

export default DisplayVenues;
