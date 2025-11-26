import "./App.css";
import React, { useEffect, useState } from "react";
import formatDate, { getDuration } from "./FormatDate";
import FilterTrips from "./FilterTrips";

function App() {
  const [trips, setTrips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("/api/trips")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching joke:", error));
  }, []);

  useEffect(() => {
    fetch("https://packingapi.cphbusinessapps.dk/packinglist/")
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
      <h1>Trips</h1>
      <FilterTrips
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />
      <ul>
        {filteredTrips.map((trip) => (
          <li key={trip.id}>
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
    </>
  );
}

export default App;
