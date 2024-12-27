import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../PropertyDetails/PropertyDetails.css";

const PropertyDetails = ({ properties }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find((prop) => prop.id === id);

  if (!property) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>Property not found</p>
    );
  }

  return (
    <div className="property-details-container">
      <div className="property-details">
        <h1 className="property-details-heading">{property.type} Details</h1>
        <p className="property-details-text">
          <strong>Location:</strong> {property.location}
        </p>
        <p className="property-details-text">
          <strong>Bedrooms:</strong> {property.bedrooms}
        </p>
        <p className="property-details-text">
          <strong>Price:</strong> ${property.price}
        </p>
        <p className="property-details-text">
          <strong>Description:</strong> {property.description}
        </p>
        <button
          className="property-details-button"
          onClick={() => navigate("/")}
        >
          Back to Listings
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;