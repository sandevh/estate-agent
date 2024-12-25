import React from "react";
import "./PropertyItem.css";

const PropertyItem = ({ property, toggleFavorite, isInFavorites }) => {
  return (
    <div className={`property-item ${isInFavorites ? "favorite" : ""}`}>
      <h3>{property.type}</h3>
      <p>No of Bedrooms: {property.bedrooms}</p>
      <p>Location: {property.location}</p>
      <p>Description: {property.description}</p>
      <p>Price: {property.price}</p>
      <p>
        Date added:{" "}
        {`${property.added.day}-${property.added.month}-${property.added.year}`}
      </p>
      <button onClick={() => toggleFavorite(property)}>
        {isInFavorites ? "Remove From Favorites" : "Add To Favorites"}
      </button>
    </div>
  );
};

export default PropertyItem;
