import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

/**
 * Map Component
 *
 * Displays a Google Map centered on the provided coordinates with a marker at the center.
 *
 * coordinates - The latitude and longitude for the map's center.
 * coordinates.latitude - The latitude value.
 * coordinates.longitude - The longitude value.
 */
const Map = ({ coordinates }) => {
  const latitude = coordinates.latitude;
  const longitude = coordinates.longitude;
  const center = { lat: latitude, lng: longitude };

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={center}
      zoom={10}
    >
      {/* Marker to indicate the center location */}
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;
