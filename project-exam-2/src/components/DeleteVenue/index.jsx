import { delete_venue } from "../../Shared/Api";

function DeleteVenue({ id, onDelete }) {
  function deleteVenue() {
    fetch(delete_venue + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": localStorage.getItem("apikey"),
      },
    })
      .then((response) => {
        if (response.status === 204) {
          onDelete(); // Call the onDelete callback
          console.log("Venue deleted");
        } else {
          return response.json();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  return (
    <div>
      <button onClick={deleteVenue}>Delete</button>
    </div>
  );
}

export default DeleteVenue;
