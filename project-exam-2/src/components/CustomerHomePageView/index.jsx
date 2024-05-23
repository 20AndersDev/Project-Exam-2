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
  text-align: center;
`;

const VenueList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 1200px; /* To center the content and avoid overflow */

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const VenueItem = styled.li`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 350px; /* Set a fixed height */
  overflow: hidden; /* Ensure content doesn't overflow */

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const VenueImage = styled.img`
  width: 100%;
  height: 150px; /* Set a fixed height */
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const VenueName = styled.h2`
  font-size: 1.5rem;
  color: #007bff;
  margin: 0.5rem 0;

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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
`;

function DisplayVenues() {
  const { data, isLoading, isError } = useApi(all_venues);

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (isError) {
    return <PageContainer>Error fetching data</PageContainer>;
  }

  console.log(data);

  const handleImageError = (event) => {
    event.target.src = "default-image-url.jpg"; // Provide a path to a default image
  };

  return (
    <PageContainer>
      <Title>Venues available for booking</Title>
      <VenueList>
        {data.map((venue) => (
          <VenueItem key={venue.id}>
            {venue.media && venue.media.length > 0 && venue.media[0].url ? (
              <VenueImage
                src={venue.media[0].url}
                alt={venue.media[0].alt || venue.name}
                onError={handleImageError}
              />
            ) : (
              <VenueImage src="default-image-url.jpg" alt="Default Image" />
            )}
            <VenueName>
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
