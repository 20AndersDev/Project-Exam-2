import { Link } from "react-router-dom";
import { all_venues } from "../../Shared/Api";
import { useState, useEffect, useRef } from "react";
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
  max-width: 1200px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

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
  height: auto;
  overflow: hidden;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const VenueImageContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const VenueImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.3s ease;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
`;

const AltText = styled.span`
  position: absolute;
  color: #555;
  font-size: 1rem;
  text-align: center;
  padding: 0.5rem;
  visibility: ${({ isLoaded }) => (isLoaded ? "hidden" : "visible")};
`;

const VenueName = styled.h2`
  font-size: 1.5vw;
  color: #007bff;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 5vw;
  }

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const VenueDescription = styled.p`
  font-size: 1vw;
  color: #555;

  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

function DisplayVenues() {
  const { data, isLoading, isError } = useApi(all_venues);
  const [imageLoadStatus, setImageLoadStatus] = useState({});
  const loadStatusRef = useRef({});

  useEffect(() => {
    const initialImageStatus = data.reduce((status, venue) => {
      status[venue.id] = false;
      return status;
    }, {});
    setImageLoadStatus(initialImageStatus);
    loadStatusRef.current = initialImageStatus;
  }, [data]);

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (isError) {
    return <PageContainer>Error fetching data</PageContainer>;
  }

  const handleImageError = (event, venueId) => {
    event.target.src = "default-image-url.jpg";
    setImageLoadStatus((prevState) => ({
      ...prevState,
      [venueId]: false,
    }));
  };

  const handleImageLoad = (venueId) => {
    if (!loadStatusRef.current[venueId]) {
      setImageLoadStatus((prevState) => ({
        ...prevState,
        [venueId]: true,
      }));
      loadStatusRef.current[venueId] = true;
    }
  };

  return (
    <PageContainer>
      <Title>Venues available for booking</Title>
      <VenueList>
        {data.map((venue) => (
          <VenueItem key={venue.id}>
            <VenueImageContainer>
              {venue.media && venue.media.length > 0 && venue.media[0].url ? (
                <>
                  <VenueImage
                    src={venue.media[0].url}
                    alt={venue.media.alt}
                    onError={(e) => handleImageError(e, venue.id)}
                    onLoad={() => handleImageLoad(venue.id)}
                    isLoaded={imageLoadStatus[venue.id]}
                  />
                  <AltText isLoaded={imageLoadStatus[venue.id]}>
                    {venue.media[0].alt || venue.name}
                  </AltText>
                </>
              ) : (
                <>
                  <VenueImage
                    src="default-image-url.jpg"
                    alt="Default Image"
                    onLoad={() => handleImageLoad(venue.id)}
                    isLoaded={imageLoadStatus[venue.id]}
                  />
                  <AltText isLoaded={imageLoadStatus[venue.id]}>
                    Default Image
                  </AltText>
                </>
              )}
            </VenueImageContainer>
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
