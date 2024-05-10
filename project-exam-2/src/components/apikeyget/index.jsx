import { getapikey } from "../../Shared/Api.js";

async function postApikey() {
  try {
    const response = await fetch(getapikey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: "Holidazekey",
      }),
    });
    const data = await response.json();
    localStorage.setItem("apikey", data.data.key);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating API key:", error);
    throw error; // Throw the error for handling outside this function if necessary
  }
}

export default postApikey;
