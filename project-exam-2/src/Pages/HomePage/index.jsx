import DisplayVenues from "../../components/CustomerHomePageView";
import VenueManagerPageView from "../../components/VenueManagerPageView";

function HomePageRole() {
  if (localStorage.getItem("VenueManager") === "true") {
    return <VenueManagerPageView />;
  } else {
    return <DisplayVenues />;
  }
}

function HomePage() {
  return <HomePageRole />;
}

export default HomePage;
