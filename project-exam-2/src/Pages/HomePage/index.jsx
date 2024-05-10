import React, { useEffect } from "react";
import DisplayVenues from "../../components/CustomerHomePageView";
import VenueManagerPageView from "../../components/VenueManagerPageView";
import postApikey from "../../components/apikeyget"; // Import the postApikey function

function HomePageRole() {
  if (localStorage.getItem("VenueManager") === "true") {
    return <VenueManagerPageView />;
  } else {
    return <DisplayVenues />;
  }
}

function HomePage() {
  useEffect(() => {
    // Call the postApikey function when the component mounts
    postApikey()
      .then((apiKey) => {
        // Handle the API key if needed
        console.log("API key created:", apiKey);
      })
      .catch((error) => {
        // Handle errors if necessary
        console.error("Error creating API key:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return <HomePageRole />;
}

export default HomePage;
