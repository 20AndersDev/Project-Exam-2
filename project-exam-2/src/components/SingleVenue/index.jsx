import { useEffect } from "react";
import { single_venue } from "../../Shared/Api";
import useApi from "../../Hooks/Apihooks/";

function DisplaySingleVenue() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const url = `${single_venue}/${id}`;

  const { data, isLoading, isError } = useApi(url);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>Single Venue</h1>
      <p>Name: {data.name}</p>
      <p>Description: {data.description} </p>
    </div>
  );
}

export default DisplaySingleVenue;
