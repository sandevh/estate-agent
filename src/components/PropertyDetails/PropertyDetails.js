import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Gallery from "../Gallery/Gallery";
import Map from "../GoogleMap/Map";
import "./PropertyDetails.css";

/**
 * PropertyDetails Component
 *
 * Displays detailed information about a selected property, including tabs for details, a gallery, and a map.
 *
 * properties - Array of property objects with details, gallery images, and coordinates.
 */
const PropertyDetails = ({ properties }) => {
  const { id } = useParams(); // Extracts the property ID from the route parameters.
  const navigate = useNavigate(); // Hook to navigate back to the main listings page.

  // Finds the property matching the given ID.
  const property = properties.find((prop) => prop.id === id);

  if (!property) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>Property not found</p>
    );
  }

  return (
    <Tabs className="property-tabs">
      <TabList>
        <Tab>Details</Tab>
        <Tab>Gallery</Tab>
        <Tab>Floor Plan</Tab>
        <Tab>Map</Tab>
      </TabList>

      {/* Details Tab */}
      <TabPanel>
        <div className="property-details-container">
          <div className="property-details">
            <h1 className="property-details-heading">{property.type}</h1>
            <p className="property-details-price">
              <strong className="topic">Price</strong> {property.price}
            </p>
            <p className="property-details-bedrooms">
              <strong className="topic">Bedrooms</strong> {property.bedrooms}
            </p>
            <p className="property-details-tenure">
              <strong className="topic">Tenure</strong> {property.tenure}
            </p>
            <p className="property-details-location">
              <strong className="topic">Location</strong> {property.location}
            </p>
            <p className="property-details-description">
              <strong className="topic">Description</strong>{" "}
              {property.description}
            </p>
            <p className="property-details-added">
              <strong>Added:</strong>{" "}
              {`${property.added.day} ${property.added.month}, ${property.added.year}`}
            </p>
          </div>
        </div>
      </TabPanel>

      {/* Gallery Tab */}
      <TabPanel>
        <div className="property-details-container">
          <Gallery galleryImages={property.galleryImages} />
        </div>
      </TabPanel>

      <TabPanel>
        <div className="property-details-container">
          <img src={"../" + property.floorplan} alt="floor-plan" className="floor-plan" /> 
        </div>
      </TabPanel>

      {/* Map Tab */}
      <TabPanel>
        <div className="property-details-container">
          <Map coordinates={property.coordinates} />
        </div>
      </TabPanel>

      {/* Back to Listings Button */}
      <div className="back-to-listings">
        <button
          className="property-details-button standard-button"
          onClick={() => navigate("/")}
        >
          Back to Listings
        </button>
      </div>
    </Tabs>
  );
};

export default PropertyDetails;
