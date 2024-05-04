import { venues_by_name } from "../../Shared/Api";

const replaceNameUrl = venues_by_name.replace(
  "<name>",
  localStorage.getItem("name")
);

console.log(replaceNameUrl);

function VenueManagerPageView() {
  return (
    <div>
      <h1>Venue Manager Page</h1>
      <p>{replaceNameUrl}</p>
    </div>
  );
}

export default VenueManagerPageView;
