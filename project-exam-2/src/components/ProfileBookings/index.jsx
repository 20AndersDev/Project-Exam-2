import { bookings_by_profile } from "../../Shared/Api";
import { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components
const BookingsContainer = styled.div`
  padding: 2rem;
  background: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookingItem = styled.div`
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

const BookingTitle = styled.h2`
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

const BookingDetails = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
`;

function Displaybookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let profileName = localStorage.getItem("name");

        if (profileName) {
          profileName = profileName.replace(/^"(.*)"$/, "$1");
        }

        const url = `${bookings_by_profile}${profileName}/bookings?_bookings=true&_venue=true`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-Noroff-API-Key": localStorage.getItem("apikey"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings by profile");
        }

        const data = await response.json();
        console.log(data);
        setBookings(data.data);
      } catch (error) {
        console.error("Error getting bookings by profile:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <BookingsContainer>
      <Title>Your Bookings</Title>
      {Array.isArray(bookings) && bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookingItem key={booking.id}>
            <BookingTitle>{booking.venue.name}</BookingTitle>
            <BookingDetails>Guests: {booking.guests}</BookingDetails>
            <BookingDetails>From: {booking.dateFrom}</BookingDetails>
            <BookingDetails>To: {booking.dateTo}</BookingDetails>
          </BookingItem>
        ))
      ) : (
        <BookingDetails>No bookings yet</BookingDetails>
      )}
    </BookingsContainer>
  );
}

export default Displaybookings;
