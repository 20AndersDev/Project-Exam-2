import { login_user } from "../../Shared/Api";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 1.5rem;
`;

async function loginUser(url, formData, navigate, setErrorMessage) {
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
      navigate("/HomePage");
    } else {
      console.log("User not logged in");
      setErrorMessage(data.errors[0].message);
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    setErrorMessage("An error occurred while logging in.");
  }
}

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(login_user, formData, navigate, setErrorMessage);
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </Form>

      <RegisterLink>
        <Link to="/register">
          <p>Register an account here</p>
        </Link>
      </RegisterLink>
    </LoginContainer>
  );
}

export default LoginForm;
