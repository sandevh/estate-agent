import React from "react";
import { LoadScript } from "@react-google-maps/api";

/**
 * GoogleMapsProvider Component
 *
 * Provides the Google Maps API context to child components.
 * Ensures that the Google Maps API is loaded before rendering the children.
 *
 * children - Child components that require Google Maps functionality.
 */
const GoogleMapsProvider = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyC1uzcPajksHgAE2rvNI-mG0c5zb7Vx5FY">
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
