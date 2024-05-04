import { register_user } from "../../Shared/Api";
import { useState } from "react";

async function registerUser(url, formData) {
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
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    venueManager: false,
  });

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
    await registerUser(register_user, formData);
  };

  return (
    <div>
      <h1>Register an account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
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
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          register as Venue Manager:
          <input
            type="checkbox"
            name="venueManager"
            value={formData.venueManager}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Register</button>
      </form>

      <a href="/">Already have an account? Log in here</a>
    </div>
  );
}

export default Register;
