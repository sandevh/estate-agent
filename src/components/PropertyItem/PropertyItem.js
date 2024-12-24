import React from "react";
import "../PropertyItem/PropertyItem.css"

const PropertyItem = ({property}) => {

  return (
    <div className="property-item">
      <h3>{property.type}</h3>
      <p>No of Bedrooms: {property.bedrooms}</p>
      <p>Location: {property.location}</p>
      <p>Description: {property.description}</p>
      <p>Price: {property.price}</p>
      <p>Date added: {`${property.added.day}-${property.added.month}-${property.added.year}`}</p>
    </div>
  );
};

export default PropertyItem;