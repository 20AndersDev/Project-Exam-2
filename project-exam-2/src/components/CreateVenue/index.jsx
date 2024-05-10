import { create_venue } from "../../Shared/Api";
import { useState } from "react";

async function postVenue(url, formData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": localStorage.getItem("apikey"),
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 201) {
      console.log("Venue created:", data);
      window.location.href = "/HomePage";
    } else {
      console.log("Venue not created");
    }
  } catch (error) {
    console.error("Error creating venue:", error);
  }
}

function CreateVenue() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxGuests: null, // Initialize as null or an empty string
    price: null, // Initialize as null or an empty string
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(), // Remove leading and trailing spaces
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Convert maxGuests and price to numbers
    const numMaxGuests =
      formData.maxGuests !== null ? Number(formData.maxGuests) : null;
    const numPrice = formData.price !== null ? Number(formData.price) : null;
    await postVenue(create_venue, {
      ...formData,
      maxGuests: numMaxGuests,
      price: numPrice,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Capacity:
          <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create venue</button>
      </form>
    </div>
  );
}

export default CreateVenue;
