import "./App.css";
import React, { useEffect, useState } from "react";
import formatDate, { getDuration } from "./formatDate";
import FilterTrips from "./FilterTrips";
import TripDetails from "./TripDetails";

function App() {
  const [trips, setTrips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTripId, setSelectedTripId] = useState(null);

  useEffect(() => {
    fetch("/api/trips")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching joke:", error));
  }, []);

  useEffect(() => {
    fetch("/packinglist/")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error fetching categories", error));
  }, []);

  const filteredTrips = selectedCategory
    ? trips.filter(
        (trip) => trip.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : trips;

  return (
    <>
      <h1 className="page-title">Trips</h1>

      <div className="container">
        <div className="left">
          <FilterTrips
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
          />
          <ul>
            {filteredTrips.map((trip) => (
              <li
                key={trip.id}
                onClick={() => setSelectedTripId(trip.id)}
                className="trip-item"
              >
                <strong>{trip.name}</strong>
                <br />
                Start: {formatDate(trip.starttime)}
                <br />
                Slut: {formatDate(trip.endtime)}
                <br />
                Varighed: {getDuration(trip.starttime, trip.endtime)}
                <br />
                Pris: <strong>{trip.price} kr</strong>
                <br />
                <br />
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          {selectedTripId && <TripDetails tripId={selectedTripId} />}
        </div>
      </div>
    </>
  );
}

export default App;
