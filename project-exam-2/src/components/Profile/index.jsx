import { single_profile } from "../../Shared/Api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Your Profile</h1>
      {profile && (
        <div>
          <img src={profile.data.avatar.url} alt="Profile Avatar" />
          <p>Name: {profile.data.name}</p>
          <p>Email: {profile.data.email}</p>
          <p>Bio: {profile.data.bio}</p>
          <Link to="/UpdateProfile">
            <button>Edit profile</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default DisplayProfile;
