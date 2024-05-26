import { create_booking } from "../../Shared/Api";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 90%;
  max-width: 300px;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  @media (min-width: 768px) {
    width: 300px;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.ul`
  color: red;
  font-size: 0.9rem;
  list-style-type: none;
  padding: 0;
  text-align: center;
`;
const SuccessMessage = styled.p`
  color: green;
  font-size: 1rem;
  text-align: center;
`;

async function CreateBooking(data) {
  try {
    const response = await fetch(create_booking, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": localStorage.getItem("apikey"),
      },
      body: JSON.stringify(data),
    });

    console.log("Response:", response);

    if (response.status === 201) {
      return true;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

function BookVenue({ id }) {
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
  });

  const [bookingPlaced, setBookingPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "guests" ? parseInt(value, 10) : value,
    }));
  };

  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingSuccess = await CreateBooking({ ...formData, venueId: id });
      if (bookingSuccess) {
        setBookingPlaced(true);
      }
      console.log("Booking created successfully");
      setErrorMessages([]);
    } catch (error) {
      console.error("Error creating booking:", error);
      if (error.errors) {
        setErrorMessages(error.errors.map((err) => err.message));
      } else {
        setErrorMessages([error.message || "An unexpected error occurred"]);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Book Venue</h1>
        <Label>
          From Date:
          <Input
            type="date"
            name="dateFrom"
            value={formData.dateFrom}
            onChange={handleInputChange}
            required
          />
        </Label>
        <Label>
          To Date:
          <Input
            type="date"
            name="dateTo"
            value={formData.dateTo}
            onChange={handleInputChange}
            required
          />
        </Label>
        <Label>
          Guests:
          <Input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
            required
          />
        </Label>
        {errorMessages.length > 0 && (
          <ErrorMessage>
            {errorMessages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ErrorMessage>
        )}
        {bookingPlaced && (
          <SuccessMessage>Booking placed successfully!</SuccessMessage>
        )}

        <SubmitButton type="submit">Create Booking</SubmitButton>
      </Form>
    </Container>
  );
}

export default BookVenue;
