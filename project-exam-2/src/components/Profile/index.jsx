import { single_profile } from "../../Shared/Api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const ProfileContainer = styled.div`
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

const ProfileDetails = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Detail = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
`;

const EditButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background: #0056b3;
  }
`;

function DisplayProfile() {
  const [profile, setProfile] = useState(null); // State to hold profile data

  useEffect(() => {
    async function fetchData() {
      try {
        let profileName = localStorage.getItem("name");

        // Trim the profileName to remove surrounding double quotes
        if (profileName) {
          profileName = profileName.replace(/^"(.*)"$/, "$1");
        }

        const response = await fetch(`${single_profile}/${profileName}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-Noroff-API-Key": localStorage.getItem("apikey"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        console.log(data);
        setProfile(data); // Update state with fetched profile data
      } catch (error) {
        console.error("Error getting profile:", error);
      }
    }

    fetchData(); // Call fetchData when the component mounts
  }, []); // Empty dependency array ensures fetchData is only called once

  // Render profile data if available
  return (
    <ProfileContainer>
      <Title>Your Profile</Title>
      {profile && (
        <ProfileDetails>
          <Avatar src={profile.data.avatar.url} alt="Profile Avatar" />
          <Detail>Name: {profile.data.name}</Detail>
          <Detail>Email: {profile.data.email}</Detail>
          <Detail>Bio: {profile.data.bio}</Detail>
          <Link to="/UpdateProfile">
            <EditButton>Edit profile</EditButton>
          </Link>
        </ProfileDetails>
      )}
    </ProfileContainer>
  );
}

export default DisplayProfile;
