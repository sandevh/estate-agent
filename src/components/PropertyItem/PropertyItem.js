import React from "react";
import { Link } from "react-router-dom";
import "../PropertyItem/PropertyItem.css";

const PropertyItem = ({ property, toggleFavorite, isInFavorites, handleDrop, onDragEnd }) => {

  const handleDragStart = (e) => {
    e.dataTransfer.setData("property_details", JSON.stringify([property, isInFavorites]));
  };

  return (
    <div
      className={`property-item ${isInFavorites ? "favorite" : ""}`}
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
    >
      <img src={property.picture} alt="property" draggable="false" />
      <div className="details">
        <h3>{property.type}</h3>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C8.13 2 5 5.58 5 9.5c0 3.71 3.75 8.25 7 12 3.25-3.75 7-8.29 7-12C19 5.58 15.87 2 12 2z"></path>
            <circle cx="12" cy="9.5" r="2.5"></circle>
          </svg>
          {property.location}
        </p>
        <p>Description: {property.description.split(". ")[0]}.</p>
        <p>Price: {property.price}</p>
        <p>
          Date added:{" "}
          {`${property.added.day}-${property.added.month}-${property.added.year}`}
        </p>

        <div className="control-buttons">
          <Link
            to={`/property/${property.id}`}
            draggable="false"
            className="property-page-link"
          >
            View More
          </Link>
          <button onClick={() => toggleFavorite(property)}>
            {isInFavorites ? "Remove From Favorites" : "Add To Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;