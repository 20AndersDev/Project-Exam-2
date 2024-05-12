import { useState, useEffect } from "react";
import { single_venue, update_venue } from "../../Shared/Api";
import DeleteVenue from "../DeleteVenue";
import useApi from "../../Hooks/Apihooks/";
import Calendar from "react-calendar";
import CreateBooking from "../../components/CreateBooking";

function DisplaySingleVenue() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
  });
  const [bookingData, setBookingData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
    venueId: "",
  });

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const url = `${single_venue}/${id}?_owner=true&_bookings=true`;
  const { data, isLoading, isError } = useApi(url);

  useEffect(() => {
    if (data && data.maxGuests) {
      // Add a check for data.maxGuests
      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        Guests: String(data.Guests).trim(), // Convert to string and trim the maxGuests value
      });
      setBookingData((prevState) => ({
        ...prevState,
        venueId: id, // Set venueId when data is loaded
      }));
    }
  }, [data, id]);

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    // Validate guests input to ensure it's a valid number
    if (name === "guests" && isNaN(value)) {
      // If value is not a number, set it to 0
      updatedValue = 0;
    } else if (name === "guests") {
      // If value is a number, parse it to an integer
      updatedValue = parseInt(value);
    }
    setBookingData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        price: parseInt(formData.price),
        maxGuests: parseInt(formData.maxGuests),
      };

      const response = await fetch(`${update_venue}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": localStorage.getItem("apikey"),
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.status === 200) {
        console.log("Venue updated");
        const data = await response.json();
        console.log("Response data:", data);
      } else {
        console.log("Error updating venue");
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CreateBooking(bookingData);
      console.log(response);
      // Handle success or error response
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleDelete = () => {
    window.location.href = "/HomePage";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching data</div>;
  }

  const ownerName = data.owner ? data.owner.name : null;
  const localStorageName = localStorage.getItem("name");
  const isVenueManager = localStorage.getItem("role") === "VenueManager";

  const bookings = data.bookings || [];
  const unavailableDates = bookings.map(
    (booking) => new Date(booking.dateFrom)
  );

  console.log(bookingData.guests);

  return (
    <div>
      <h1>Single Venue</h1>
      <p>Name: {data.name}</p>
      <p>Description: {data.description}</p>
      <p>Price: {data.price}</p>
      <p>Max Guests: {data.maxGuests}</p>
      <Calendar
        tileDisabled={({ date }) =>
          unavailableDates.some((d) => d.toDateString() === date.toDateString())
        }
      />
      {localStorage.getItem("token") && !isVenueManager && (
        <form onSubmit={handleBookingSubmit}>
          <input
            type="date"
            name="dateFrom"
            value={bookingData.dateFrom}
            onChange={handleBookingInputChange}
            required
          />
          <input
            type="date"
            name="dateTo"
            value={bookingData.dateTo}
            onChange={handleBookingInputChange}
            required
          />
          <input
            type="number"
            name="guests"
            value={bookingData.guests}
            onChange={handleBookingInputChange}
            required
          />
          <input type="hidden" name="venueId" value={id} />
          <button type="submit">Book Venue</button>
        </form>
      )}
      <div>
        {ownerName === localStorageName && (
          <div>
            <p>Bookings on your venue:</p>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id}>
                  <p>Name: {booking.customer.name}</p>
                  <p>Email: {booking.customer.email}</p>
                  <p>Booking Start: {booking.dateFrom}</p>
                  <p>Booking End: {booking.dateTo}</p>
                </div>
              ))
            ) : (
              <p>No bookings</p>
            )}
          </div>
        )}
      </div>
      {ownerName === localStorageName && (
        <>
          {editing ? (
            <form onSubmit={handleSubmit}>
              {/* Input fields for editing venue */}
            </form>
          ) : (
            <button onClick={() => setEditing(true)}>Edit</button>
          )}
          <DeleteVenue id={id} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
}

export default DisplaySingleVenue;
