import { updateVenue } from "../../Shared/Api";

async function updateVenue(id, data) {
  try {
    fetch(updateVenue + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": localStorage.getItem("apikey"),
      },
    }).then((response) => {
      if (response.status === 204) {
        window.location.reload(); // Refresh the page
      } else {
        console.log("Venue updated");
        return response.json();
      }
    });
  } catch (error) {
    console.error("Error updating venue:", error);
  }
}
