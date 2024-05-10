import { useState, useEffect } from "react";
import { venues_by_name } from "../../Shared/Api";
import { Link } from "react-router-dom";

async function getVenueByName(url) {
  try {
    const accessToken = localStorage.getItem("token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": localStorage.getItem("apikey"),
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching venue data:", error);
    throw error; // Rethrow the error for handling outside this function if necessary
  }
}

function VenueList() {
  const replaceNameUrl = `${venues_by_name}/${localStorage
    .getItem("name")
    .replace(/"/g, "")}/venues`;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getVenueByName(replaceNameUrl);
        setData(newData);
      } catch (error) {
        // Handle error
        console.error("Error fetching venue data:", error);
      }
    };
    fetchData();
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <div>
        <h2>No venues found</h2>
        <Link to="/CreateVenue">
          <button>Create a venue here</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Venues</h1>
        <Link to="/CreateVenue">
          <button>Create a venue here</button>
        </Link>
        {data.data.map((venue, index) => (
          <div key={index}>
            <Link to={`/SingleVenue?id=${venue.id}`}>
              {/* Link to SingleVenue with venue ID */}
              <h2>{venue.name}</h2>
            </Link>
            <p>{venue.description}</p>
            <p>Max guests: {venue.maxGuests}</p>
            <p>Price: {venue.price}</p>
            {/* Add additional venue details here */}
          </div>
        ))}
      </div>
    );
  }
}

function VenueManagerPageView() {
  return (
    <div>
      <h1>
        Welcome venue manager, {localStorage.getItem("name").replace(/"/g, "")}
      </h1>
      <VenueList />
    </div>
  );
}

export default VenueManagerPageView;
