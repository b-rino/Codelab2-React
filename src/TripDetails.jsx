import React, { useState, useEffect } from "react";
import formatDate, { getDuration } from "./formatDate";

export default function TripDetails({ tripId }) {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetch(`https://tripapi.cphbusinessapps.dk/api/trips/${tripId}`)
      .then((response) => response.json())
      .then((data) => setTrip(data))
      .catch((error) => console.error("Error fetching trip details:", error));
  }, [tripId]);

  if (!trip) return <p>Loading trip details...</p>;

  return (
    <div id="tripDetails">
      <h2>{trip.name}</h2>
      <p>
        <strong>Start:</strong> {formatDate(trip.starttime)} <br />
        <strong>Slut:</strong> {formatDate(trip.endtime)} <br />
        <strong>Varighed:</strong> {getDuration(trip.starttime, trip.endtime)}{" "}
        <br />
        <strong>Pris:</strong> {trip.price} kr <br />
        <strong>Kategori:</strong> {trip.category}
      </p>

      <h3>Guide</h3>
      <p>
        {trip.guide.firstname} {trip.guide.lastname} <br />
        Email: {trip.guide.email} <br />
        Telefon: {trip.guide.phone} <br />
        Erfaring: {trip.guide.yearsOfExperience} år
      </p>
    </div>
  );
}
