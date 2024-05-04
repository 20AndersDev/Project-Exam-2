import { all_venues } from "../../Shared/Api";
import useApi from "../../Hooks/Apihooks/";

function DisplayVenues() {
  const { data, isLoading, isError } = useApi(all_venues);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>Customer Home Page</h1>
      <ul>
        {data.map((venue) => (
          <li key={venue.id}>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayVenues;
