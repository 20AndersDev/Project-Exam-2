import { useState } from "react";
import { update_profile } from "../../Shared/Api";
import styled from "styled-components";

// Styled Components
const UpdateProfileContainer = styled.div`
  padding: 2rem;
  background: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
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

const ErrorMessage = styled.p`
  color: red;
`;

function UpdateProfile() {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(null);

  // Trim the profile name to remove surrounding double quotes
  let profileName = localStorage.getItem("name");
  if (profileName) {
    profileName = profileName.replace(/^"(.*)"$/, "$1");
  }

  const url = `${update_profile}/${profileName}`;

  async function updateProfileData() {
    try {
      const requestBody = {};

      // Add bio to request body if it's not empty
      if (bio.trim() !== "") {
        requestBody.bio = bio;
      }

      // Add avatar url to request body if it's not empty
      if (avatar.trim() !== "") {
        requestBody.avatar = { url: avatar };
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": localStorage.getItem("apikey"),
        },
        body: JSON.stringify(requestBody),
      });
      console.log("Profile updated:", response);
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData.errors[0].message); // Use the first error message
      }

      console.log("Profile updated:", response);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message); // Update the error message
    }
  }

  function handleUpdate() {
    updateProfileData();
  }

  return (
    <UpdateProfileContainer>
      <Title>Update Profile</Title>
      <Label>
        Update bio:
        <Input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Label>
      <Label>
        Update Avatar:
        <Input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </Label>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={handleUpdate}>Update Profile</Button>
    </UpdateProfileContainer>
  );
}

export default UpdateProfile;
