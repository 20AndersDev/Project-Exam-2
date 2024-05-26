import styled from "styled-components";
import { create_venue } from "../../Shared/Api";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
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
    maxGuests: null,
    price: null,
  });

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
    await postVenue(create_venue, {
      ...formData,
      maxGuests: numMaxGuests,
      price: numPrice,
    });
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
      <Button type="submit">Create venue</Button>
    </Form>
  );
}

export default CreateVenue;
