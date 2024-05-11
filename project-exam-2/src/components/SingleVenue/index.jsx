import { useEffect } from "react";
import { single_venue } from "../../Shared/Api";
import DeleteVenue from "../DeleteVenue"; // Import the DeleteVenue component
import useApi from "../../Hooks/Apihooks/";

function DisplaySingleVenue() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const url = `${single_venue}/${id}?_owner=true`;
  console.log(url);
  const { data, isLoading, isError } = useApi(url);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Check if data is still loading or if there's an error
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching data</div>;
  }

  // Check if data.owner exists and matches the name in localStorage
  const ownerName = data.owner ? data.owner.name : null;
  const localStorageName = localStorage.getItem("name");
  const trimmedLocalStorageName = localStorageName
    ? localStorageName.replace(/"/g, "")
    : "";

  if (ownerName === trimmedLocalStorageName) {
    return (
      <div>
        <h1>Single Venue</h1>
        <p>Name: {data.name}</p>
        <p>Description: {data.description}</p>
        <DeleteVenue id={id} />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Single Venue</h1>
        <p>Name: {data.name}</p>
        <p>Description: {data.description}</p>
      </div>
    );
  }
}

export default DisplaySingleVenue;
