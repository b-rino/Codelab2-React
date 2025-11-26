import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [trips, setTrips] = useState([""]);

  useEffect(() => {
    fetch("https://tripapi.cphbusinessapps.dk/api/trips")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching joke:", error));
  }, []);

  return (
    <>
      <h1>Trips</h1>
      <ul>
        {trips.map((trip) => (
          // hele objektet vises således: <li key={trip.id}>{JSON.stringify(trip)}</li>
          <li key={trip.id}>{trip.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
