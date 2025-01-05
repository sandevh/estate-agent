// Importing necessary modules from React and React Router
import React from "react";
import { Link } from "react-router-dom"; // Link is used for navigation between pages
import "../PropertyItem/PropertyItem.css"; // Importing the CSS file for styling the component

/**
 * PropertyItem Component
 *
 * Displays a summary of property details, with options to add/remove from favourites and view more details.
 * It also supports drag-and-drop functionality for the property item.
 *
 * property - The property object that contains details like price, type, bedrooms, etc.
 * togglefavourite - Function to add/remove the property from favourites.
 * isInfavourites - Boolean flag that indicates whether the property is in the favourites list.
 * handleDrop - Function to handle the drop event during drag-and-drop.
 * onDragEnd - Function to handle the end of a drag operation.
 */
const PropertyItem = ({
  property,
  togglefavourite,
  isInfavourites,
  handleDrop,
  onDragEnd,
}) => {
  /**
   * handleDragStart
   *
   * Sets the data to be transferred during the drag event.
   * It stores the property details along with the "isInfavourites" state.
   *
   * e - The drag event object.
   */
  const handleDragStart = (e) => {
    // Sets the dragged data (property details and favourites status) for later use during the drop event
    e.dataTransfer.setData(
      "property_details",
      JSON.stringify([property, isInfavourites])
    );
  };

  return (
    // Main wrapper for the property item. It adds a "favourite" class if the property is in favourites
    <div
      className={`property-item ${isInfavourites ? "favourite" : ""}`}
      draggable // Makes the property item draggable
      onDragStart={handleDragStart} // Handles the start of the drag event
      onDrop={handleDrop} // Handles the drop event when the item is dragged over
      onDragEnd={onDragEnd} // Handles what happens after the drag operation ends
    >
      {/* Displaying the property image */}
      <img src={property.picture} alt="property" draggable="false" />

      {/* Property details section */}
      <div className="details">
        {/* Displaying the type of property */}
        <h3>{property.type}</h3>

        {/* Displaying the number of bedrooms */}
        <p>Bedrooms: {property.bedrooms}</p>

        {/* Displaying the location of the property with an SVG location pin */}
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
          {property.location} {/* Property location */}
        </p>

        {/* Displaying a shortened version of the description */}
        <p>Description: {property.description.split(". ")[0]}.</p>

        {/* Displaying the price of the property */}
        <p>Price: {property.price}</p>

        {/* Control buttons section */}
        <div className="control-buttons">
          {/* Link to the property page to view more details */}
          <Link
            to={`/property/${property.id}`} // Navigates to a detailed view page for the property
            draggable="false" // Disables dragging on the link itself
            className="property-page-link"
          >
            View More
          </Link>

          {/* Button to toggle between adding/removing the property from favourites */}
          <button
            onClick={() => togglefavourite(property)} // Calls the togglefavourite function when clicked
            className="standard-button"
          >
            {/* Button text changes based on whether the property is in favourites */}
            {isInfavourites ? "Remove From favourites" : "Add To favourites"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Exporting the PropertyItem component for use in other parts of the application
export default PropertyItem;
