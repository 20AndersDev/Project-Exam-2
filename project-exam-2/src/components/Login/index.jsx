import { login_user } from "../../Shared/Api";
import { useState } from "react";
import styled from "styled-components";

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;
`;

const LoginTitle = styled.h1`
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

const RegisterLink = styled.p`
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

async function loginUser(url, formData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    console.log("User logged in:", data);
    if (response.status === 200) {
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("name", JSON.stringify(data.data.name));
      localStorage.setItem("VenueManager", data.data.venueManager);
      window.location.href = "/HomePage";
    } else {
      console.log("User not logged in");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
  }
}

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(login_user, formData);
  };

  return (
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
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
          Password:
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit">Login</Button>
      </Form>
      <RegisterLink>
        Not registered an account yet? <a href="/register">Register</a>
      </RegisterLink>
    </LoginContainer>
  );
}

export default LoginForm;
