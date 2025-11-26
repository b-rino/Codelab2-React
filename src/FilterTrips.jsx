import React, { useState, useEffect } from "react";

export default function FilterTrips({
  categories,
  selectedCategory,
  onChange,
}) {
  return (
    <label>
      Filter by category:{" "}
      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </label>
  );
}
