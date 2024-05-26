import styled from "styled-components";
import { create_venue } from "../../Shared/Api";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Label = styled.label`
  font-size: 1.2em;
  margin-bottom: 10px;
  padding-right: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
  width: 100%; // Add this line
  box-sizing: border-box; // Add this line
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.ul`
  color: red;
  font-size: 1em;
`;

async function postVenue(url, formData, setError) {
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

    if (!response.ok) {
      throw new Error(data.errors.map((err) => err.message).join(", "));
    }

    if (response.status === 201) {
      console.log("Venue created:", data);
      window.location.href = "/HomePage";
    } else {
      console.log("Venue not created");
    }
  } catch (error) {
    console.error("Error creating venue:", error);
    setError(error.message);
  }
}

function CreateVenue() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxGuests: null,
    price: null,
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const numMaxGuests =
      formData.maxGuests !== null ? Number(formData.maxGuests) : null;
    const numPrice = formData.price !== null ? Number(formData.price) : null;
    await postVenue(
      create_venue,
      {
        ...formData,
        maxGuests: numMaxGuests,
        price: numPrice,
      },
      setError
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name:
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Label>
      <Label>
        Description:
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Label>
      <Label>
        Capacity:
        <Input
          type="number"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleChange}
        />
      </Label>
      <Label>
        Price:
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </Label>
      {error && (
        <ErrorMessage>
          {error.split(", ").map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ErrorMessage>
      )}
      <Button type="submit">Create venue</Button>
    </Form>
  );
}

export default CreateVenue;
