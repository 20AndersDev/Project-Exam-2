import { useState, useEffect } from "react";
import { single_venue, update_venue } from "../../Shared/Api";
import DeleteVenue from "../DeleteVenue";
import useApi from "../../Hooks/Apihooks/";
import Calendar from "react-calendar";
import styled from "styled-components";
import BookVenue from "../CreateBooking";
import "react-calendar/dist/Calendar.css"; // Import the default calendar CSS

// Styled Components
const PageContainer = styled.div`
  padding: 2rem;
  background: #f0f2f5;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
`;

const VenueDetails = styled.div`
  margin: 2rem 0;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Detail = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin: 0.5rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 1rem;
  &:hover {
    background: #0056b3;
  }
`;

const BookingContainer = styled.div`
  margin-top: 2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const BookingItem = styled.div`
  margin-bottom: 1rem;
`;

const CalendarContainer = styled.div`
  margin-top: 2rem;
  .react-calendar {
    width: 100%;
    max-width: 100%;
    background: #fff;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__navigation {
    display: flex;
    margin-bottom: 1rem;
    button {
      color: #007bff;
      min-width: 44px;
      background: none;
      font-size: 1rem;
      margin-top: 8px;
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 1rem;
    color: #007bff;
    text-transform: uppercase;
  }

  .react-calendar__month-view__days {
    font-size: 0.875rem;
  }

  .react-calendar__tile {
    max-width: 100%;
    background: none;
    text-align: center;
    padding: 0.75rem 0.5rem;
    border-radius: 6px;
    transition: background 0.3s, color 0.3s;
    &:hover {
      background: #e6f7ff;
      color: #007bff;
    }
  }

  .react-calendar__tile--now {
    background: #e6f7ff;
    color: #007bff;
  }

  .react-calendar__tile--active {
    background: #007bff;
    color: white;
  }

  .react-calendar__tile--active:hover {
    background: #0056b3;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const StyledH1 = styled.h1`
  color: #333;
  font-size: 2em;
  margin-bottom: 0.5em;
`;

function DisplaySingleVenue() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
  });

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const url = `${single_venue}/${id}?_owner=true&_bookings=true`;
  const { data, isLoading, isError } = useApi(url);

  useEffect(() => {
    if (data && data.id) {
      setFormData((prevData) => ({
        ...prevData,
        name: data.name,
        description: data.description,
        price: data.price,
        maxGuests: data.maxGuests,
      }));
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "price" || name === "maxGuests" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${update_venue}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": localStorage.getItem("apikey"),
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log("Venue updated");
        window.location.reload();
      } else {
        console.log("Error updating venue");
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const handleDelete = () => {
    window.location.href = "/HomePage";
  };

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (isError || !data) {
    return <PageContainer>Error fetching data</PageContainer>;
  }

  const ownerName = data.owner ? data.owner.name : null;
  const localStorageName = localStorage.getItem("name");
  let trimmedLocalStorageName = localStorageName
    ? localStorageName.replace(/^"(.*)"$/, "$1")
    : null;

  const accessToken = localStorage.getItem("token");
  const isVenueManager = JSON.parse(localStorage.getItem("VenueManager"));

  const bookings = data.bookings || [];

  const bookedDates =
    data && data.bookings
      ? data.bookings.map((booking) => ({
          from: new Date(booking.dateFrom),
          to: new Date(booking.dateTo),
        }))
      : [];

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isBookedDate = (date) => {
    return bookedDates.some((range) => date >= range.from && date <= range.to);
  };

  return (
    <PageContainer>
      <Title>Single Venue</Title>
      <VenueDetails>
        {data.media && data.media.length > 0 && (
          <StyledImage src={data.media[0].url} alt={data.media[0].alt} />
        )}
        <StyledH1>{data.name}</StyledH1>
        <Detail>{data.description}</Detail>
        <Detail>Price: {data.price}</Detail>
        <Detail>Max Guests: {data.maxGuests}</Detail>
      </VenueDetails>
      {editing ? (
        <Form onSubmit={handleSubmit}>
          <Label>
            Name:
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            Description:
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            Price:
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Label>
          <Label>
            Max Guests:
            <Input
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleInputChange}
            />
          </Label>
          <Button type="submit">Update Venue</Button>
        </Form>
      ) : (
        <>
          {ownerName === trimmedLocalStorageName && (
            <>
              <Button onClick={() => setEditing(true)}>Edit Venue</Button>
              <DeleteVenue id={id} onDelete={handleDelete} />
            </>
          )}
          {!accessToken && !isVenueManager && (
            <>
              <CalendarContainer>
                <Calendar
                  tileDisabled={({ date }) =>
                    isPastDate(date) || isBookedDate(date)
                  }
                />
              </CalendarContainer>
            </>
          )}
          {accessToken && !isVenueManager && (
            <>
              <CalendarContainer>
                <Calendar
                  tileDisabled={({ date }) =>
                    isPastDate(date) || isBookedDate(date)
                  }
                />
              </CalendarContainer>
              <BookVenue id={id} />
            </>
          )}
          {ownerName === trimmedLocalStorageName && (
            <BookingContainer>
              <p>Bookings on your venue:</p>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingItem key={booking.id}>
                    <p>Name: {booking.customer.name}</p>
                    <p>Email: {booking.customer.email}</p>
                    <p>Booking Start: {booking.dateFrom}</p>
                    <p>Booking End: {booking.dateTo}</p>
                  </BookingItem>
                ))
              ) : (
                <p>No bookings</p>
              )}
            </BookingContainer>
          )}
        </>
      )}
    </PageContainer>
  );
}

export default DisplaySingleVenue;
