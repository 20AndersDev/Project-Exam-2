import { login_user } from "../../Shared/Api";
import { useState } from "react";

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
    <div>
      <h1>Login</h1>
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
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>

      <p>
        Not registered an account yet? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default LoginForm;
