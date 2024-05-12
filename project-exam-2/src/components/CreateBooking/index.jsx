import { create_booking } from "../../Shared/Api";

async function CreateBooking(data) {
  try {
    const response = await fetch(create_booking, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": localStorage.getItem("apikey"),
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json(); // Renamed to avoid naming conflict
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export default CreateBooking;
