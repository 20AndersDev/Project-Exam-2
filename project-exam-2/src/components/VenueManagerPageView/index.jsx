import { venues_by_name } from "../../Shared/Api";

const replaceNameUrl = venues_by_name.replace(
  "<name>",
  localStorage.getItem("name")
);

async function getVenueByName(url) {
  try {
    const response = await fetch(url, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getVenueByName(replaceNameUrl);

function VenueManagerPageView() {
  return (
    <div>
      <h1>Venue Manager Page</h1>
      <p>{replaceNameUrl}</p>
    </div>
  );
}

export default VenueManagerPageView;
