import { useState, useEffect } from "react";
import { single_venue, update_venue } from "../../Shared/Api";
import DeleteVenue from "../DeleteVenue";
import useApi from "../../Hooks/Apihooks/";
import Calendar from "react-calendar";
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

const VenueDetails = styled.div`
  margin: 2rem 0;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Detail = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
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

const BookingContainer = styled.div`
  margin-top: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BookingItem = styled.div`
  margin-bottom: 1rem;
`;

const CalendarContainer = styled.div`
  margin-top: 2rem;
`;

function DisplaySingleVenue() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
  });

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const url = `${single_venue}/${id}?_owner=true&_bookings=true`;
  const { data, isLoading, isError } = useApi(url);

  useEffect(() => {
    if (data && data.maxGuests) {
      setFormData({
        name: data.name,
        description: data.description,
        price: parseInt(data.price),
        maxGuests: parseInt(data.maxGuests),
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "price" || name === "maxGuests" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${update_venue}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": localStorage.getItem("apikey"),
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log("Venue updated");
        window.location.reload();
      } else {
        console.log("Error updating venue");
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const handleDelete = () => {
    window.location.href = "/HomePage";
  };

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (isError || !data) {
    return <PageContainer>Error fetching data</PageContainer>;
  }

  const ownerName = data.owner ? data.owner.name : null;
  const localStorageName = localStorage.getItem("name");
  let trimmedLocalStorageName = localStorageName
    ? localStorageName.replace(/^"(.*)"$/, "$1")
    : null;

  const isVenueManager = localStorage.getItem("VenueManager") === "true";

  const bookings = data.bookings || [];

  return (
    <PageContainer>
      <Title>Single Venue</Title>
      <VenueDetails>
        <Detail>Name: {data.name}</Detail>
        <Detail>Description: {data.description}</Detail>
        <Detail>Price: {data.price}</Detail>
        <Detail>Max Guests: {data.maxGuests}</Detail>
      </VenueDetails>

      {editing ? (
        <Form onSubmit={handleSubmit}>
          <Label>
            Name:
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            Description:
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            Price:
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            Max Guests:
            <Input
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleInputChange}
            />
          </Label>
          <Button type="submit">Update Venue</Button>
        </Form>
      ) : (
        <>
          {ownerName === trimmedLocalStorageName && (
            <Button onClick={() => setEditing(true)}>Edit</Button>
          )}
          {!isVenueManager && (
            <CalendarContainer>
              <Calendar />
            </CalendarContainer>
          )}
          {isVenueManager && <DeleteVenue id={id} onDelete={handleDelete} />}
        </>
      )}

      {ownerName === trimmedLocalStorageName && (
        <BookingContainer>
          <p>Bookings on your venue:</p>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingItem key={booking.id}>
                <p>Name: {booking.customer.name}</p>
                <p>Email: {booking.customer.email}</p>
                <p>Booking Start: {booking.dateFrom}</p>
                <p>Booking End: {booking.dateTo}</p>
              </BookingItem>
            ))
          ) : (
            <p>No bookings</p>
          )}
        </BookingContainer>
      )}
    </PageContainer>
  );
}

export default DisplaySingleVenue;
