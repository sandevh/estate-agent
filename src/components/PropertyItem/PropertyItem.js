import React from "react";
import { Link } from "react-router-dom";
import "../PropertyItem/PropertyItem.css";

const PropertyItem = ({ property, toggleFavorite, isInFavorites, handleDrop}) => {

  const handleDragStart = (e) => {
    e.dataTransfer.setData("property_details", JSON.stringify([property, isInFavorites]));
  };

  return (
    <div className={`property-item ${isInFavorites ? "favorite" : ""}`} draggable onDragStart={handleDragStart} onDrop={handleDrop}>
      <img src={property.picture} alt="property"></img>
      <h3>{property.type}</h3>
      <p>No of Bedrooms: {property.bedrooms}</p>
      <p>Location: {property.location}</p>
      {/* <p>Description: {property.description}</p> */}
      <p>Price: {property.price}</p>
      <p>
        Date added:{" "}
        {`${property.added.day}-${property.added.month}-${property.added.year}`}
      </p>

      <Link to={`/property/${property.id}`} draggable="false">View More</Link>

      <button onClick={() => toggleFavorite(property)}>
        {isInFavorites ? "Remove From Favorites" : "Add To Favorites"}
      </button>
    </div>
  );
};

export default PropertyItem;
