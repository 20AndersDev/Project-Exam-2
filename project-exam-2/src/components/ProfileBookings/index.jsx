import { bookings_by_profile } from "../../Shared/Api";
import { useEffect, useState } from "react";

function Displaybookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let profileName = localStorage.getItem("name");

        // Trim the profileName to remove surrounding double quotes
        if (profileName) {
          profileName = profileName.replace(/^"(.*)"$/, "$1");
        }

        const url = `${bookings_by_profile}${profileName}/bookings?_bookings=true&_venue=true`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-Noroff-API-Key": localStorage.getItem("apikey"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings by profile");
        }

        const data = await response.json();
        console.log(data);
        setBookings(data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error getting bookings by profile:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {Array.isArray(bookings) ? (
        bookings.map((booking) => (
          <div key={booking.id}>
            {/* Render the properties you need from each booking */}
            <h2>{booking.venue.name}</h2>
            <p>Guests: {booking.guests}</p>
            <p> From: {booking.dateFrom}</p>
            <p> To: {booking.dateTo}</p>
            {/* Add more properties as needed */}
          </div>
        ))
      ) : (
        <p>No bookings yet</p>
      )}
    </div>
  );
}

export default Displaybookings;
