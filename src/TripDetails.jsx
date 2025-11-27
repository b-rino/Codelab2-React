import React, { useState, useEffect } from "react";
import formatDate, { getDuration } from "./formatDate";

export default function TripDetails({ tripId }) {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetch(`/api/trips/${tripId}`)
      .then((response) => response.json())
      .then((data) => setTrip(data))
      .catch((error) => console.error("Error fetching trip details:", error));
  }, [tripId]);

  if (!trip) return <p>Loading trip details...</p>;

  let totalWeight = 0;
  let totalCheapestPrice = 0;

  if (trip.packingItems && trip.packingItems.length > 0) {
    totalWeight = trip.packingItems.reduce(
      (sum, item) => sum + item.weightInGrams * item.quantity,
      0
    );
  }

  totalCheapestPrice = trip.packingItems.reduce((sum, item) => {
    if (item.buyingOptions && item.buyingOptions.length > 0) {
      const cheapest = Math.min(...item.buyingOptions.map((opt) => opt.price));
      return sum + cheapest;
    }
    return sum;
  }, 0);

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

      {trip.packingItems && trip.packingItems.length > 0 && (
        <>
          <h3>Packing Items</h3>
          <table className="packing-table">
            <thead>
              <tr>
                <th>Item name</th>
                <th>Weight (g)</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Category</th>
                <th>Buying options</th>
              </tr>
            </thead>
            <tbody>
              {trip.packingItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.weightInGrams}</td>
                  <td>{item.quantity}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.buyingOptions.map((option, i) => (
                      <div key={i}>
                        {option.shopName} – {option.price} kr
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="packing-summary">
            <p>
              <strong>Total weight:</strong> {totalWeight} g
            </p>
            <p>
              <strong>Total cheapest price:</strong> {totalCheapestPrice} kr
            </p>
          </div>
        </>
      )}
    </div>
  );
}
