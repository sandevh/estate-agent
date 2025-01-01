import React from "react";
import PropertyItem from "../PropertyItem/PropertyItem";
import "../PropertySection/PropertySection.css";

const PropertySection = ({ properties, toggleFavorite, onDragEnd }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="property-items"
      onDragOver={handleDragOver}
      // onDrop={handleRemoveDrop}
    >
      {properties.length > 0 ? (
        properties.map((property) => (
          <PropertyItem
            key={property.id}
            property={property}
            toggleFavorite={toggleFavorite}
            isInFavorites={false}
            onDragEnd={onDragEnd}
          />
        ))
      ) : (
        <p>No properties available.</p>
      )}
    </div>
  );
};

export default PropertySection;