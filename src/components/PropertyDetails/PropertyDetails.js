import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Gallery from "../Gallery/Gallery";
import "./PropertyDetails.css";

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
    <Tabs className="property-tabs">
      <TabList>
        <Tab>Details</Tab>
        <Tab>Gallery</Tab>
        <Tab>Map</Tab>
      </TabList>

      <TabPanel>
        <div className="property-details-container">
          <div className="property-details">
            <h1 className="property-details-heading">{property.type}</h1>
            <p className="property-details-text">
              <strong>Location:</strong> {property.location}
            </p>
            <p className="property-details-text">
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <p className="property-details-text">
              <strong>Price:</strong> ${property.price.toLocaleString()}
            </p>
            <p className="property-details-text">
              <strong>Description:</strong> {property.description}
            </p>
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <div className="property-details-container">
          {/* <h5>Property Gallery</h5> */}
          <Gallery galleryImages={property.galleryImages} />
        </div>
      </TabPanel>

      <TabPanel>
        <div className="property-details-container">
          {/* <h5>Map Location</h5> */}
          {/* Here you can add a map or location functionality */}
        </div>
      </TabPanel>

      <button className="property-details-button" onClick={() => navigate("/")}>
        Back to Listings
      </button>
    </Tabs>
  );
};

export default PropertyDetails;
