import { register_user } from "../../Shared/Api";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled Components
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;
`;

const RegisterTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #555;
`;

const CheckboxInput = styled.input`
  width: auto;
  margin: 0;
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const LoginLink = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-top: 1rem;
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

async function registerUser(url, formData, setErrorMessage) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("User registered:", data);
    if (response.status === 201) {
      window.location.href = "/";
    } else {
      console.log("User not registered");
      setErrorMessage(data.errors.map((error) => error.message));
    }
  } catch (error) {
    console.error("Error registering user:", error);
    setErrorMessage(["An error occurred while registering. Please try again."]);
  }
}

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    venueManager: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await registerUser(register_user, formData, setErrorMessage);
  };

  return (
    <RegisterContainer>
      <RegisterTitle>Register an account</RegisterTitle>

      <Form onSubmit={handleSubmit}>
        <Label>
          Email:
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Label>
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
          Password:
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Label>
        {errorMessage && (
          <ErrorMessage>
            {errorMessage.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ErrorMessage>
        )}
        <CheckboxLabel>
          Register as Venue Manager:
          <CheckboxInput
            type="checkbox"
            name="venueManager"
            checked={formData.venueManager}
            onChange={handleChange}
          />
        </CheckboxLabel>
        <Button type="submit">Register</Button>
      </Form>
      <Link to="/">
        <LoginLink>
          <p>Already have an account? Log in here</p>
        </LoginLink>
      </Link>
    </RegisterContainer>
  );
}

export default Register;
