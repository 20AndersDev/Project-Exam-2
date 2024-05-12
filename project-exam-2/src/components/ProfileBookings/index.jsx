import { bookings_by_profile } from "../../Shared/Api";
import { useEffect, useState } from "react";

function Displaybookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          bookings_by_profile + urlParams.get("name") + "/bookings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "X-Noroff-API-Key": localStorage.getItem("apikey"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings by profile");
        }

        const data = await response.json();
        setBookings(data); // Update state with fetched data
      } catch (error) {
        console.error("Error getting bookings by profile:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          {/* Render the properties you need from each booking */}
          <h2>{booking.id}</h2>
          <p>{booking.dateFrom}</p>
          <p>{booking.dateTo}</p>
          {/* Add more properties as needed */}
        </div>
      ))}
    </div>
  );
}

export default Displaybookings;
