import { useState, useEffect } from "react";
import { single_venue, update_venue } from "../../Shared/Api";
import DeleteVenue from "../DeleteVenue";
import useApi from "../../Hooks/Apihooks/";
import CreateBooking from "../CreateBooking";
import Calendar from "react-calendar";

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
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching data</div>;
  }

  const ownerName = data.owner ? data.owner.name : null;
  const localStorageName = localStorage.getItem("name");
  let trimmedLocalStorageName = localStorageName
    ? localStorageName.replace(/^"(.*)"$/, "$1")
    : null;

  const isVenueManager = localStorage.getItem("VenueManager") === "true";

  const bookings = data.bookings || [];

  return (
    <div>
      <h1>Single Venue</h1>
      <p>Name: {data.name}</p>
      <p>Description: {data.description}</p>
      <p>Price: {data.price}</p>
      <p>Max Guests: {data.maxGuests}</p>

      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Max Guests:
            <input
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Update Venue</button>
        </form>
      ) : (
        <>
          {ownerName === trimmedLocalStorageName && (
            <button onClick={() => setEditing(true)}>Edit</button>
          )}
          {!isVenueManager && <Calendar />}
          {isVenueManager && <DeleteVenue id={id} onDelete={handleDelete} />}
        </>
      )}

      <div>
        {ownerName === trimmedLocalStorageName && (
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
    </div>
  );
}

export default DisplaySingleVenue;
