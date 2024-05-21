import { create_booking } from "../../Shared/Api";
import React, { useState } from "react";

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

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

function BookVenue() {
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
    venueId: "", // Initialize venueId state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CreateBooking(formData); // Call CreateBooking function
      // Optionally, perform additional actions after booking creation
      console.log("Booking created successfully");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Hello</h1>
      <label>
        From Date:
        <input
          type="date"
          name="dateFrom"
          value={formData.dateFrom}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        To Date:
        <input
          type="date"
          name="dateTo"
          value={formData.dateTo}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Guests:
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Create Booking</button>
    </form>
  );
}

export default BookVenue;
