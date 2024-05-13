import { useState } from "react";
import { update_profile } from "../../Shared/Api";

function UpdateProfile() {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

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
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  function handleUpdate() {
    updateProfileData();
  }

  return (
    <div>
      <h1>Update Profile</h1>
      <label>
        Update bio:
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </label>
      <br />
      <label>
        Update Avatar:
        <input
          type="url"
          value={avatar.url}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
}

export default UpdateProfile;
