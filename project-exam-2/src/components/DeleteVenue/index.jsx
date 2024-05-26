import styled from "styled-components";
import { delete_venue } from "../../Shared/Api";

const DeleteButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  border-radius: 5px;

  &:hover {
    background-color: #ff5555;
    color: white;
  }
`;

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
          onDelete();
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
      <DeleteButton onClick={deleteVenue}>Delete</DeleteButton>
    </div>
  );
}

export default DeleteVenue;
