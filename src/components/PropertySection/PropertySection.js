// Importing necessary modules from React and other components
import React from "react";
import PropertyItem from "../PropertyItem/PropertyItem"; // Importing PropertyItem component to display individual property
import "../PropertySection/PropertySection.css"; // Importing the CSS file for styling the PropertySection component

/**
 * PropertySection Component
 *
 * Displays a list of properties by mapping over the provided array of properties.
 * Allows users to interact with each property item, toggle favourites, and handle drag events.
 *
 * properties - Array of property objects to be displayed in the section.
 * togglefavourite - Function to toggle the favourite status of a property.
 * onDragEnd - Function to handle the end of the drag event.
 */
const PropertySection = ({ properties, togglefavourite, onDragEnd }) => {
  /**
   * handleDragOver
   *
   * Prevents the default behavior for dragover events, allowing drop functionality on this section.
   *
   * e - The dragover event object.
   */
  const handleDragOver = (e) => {
    // Prevent the default behavior to allow dropping of dragged elements
    e.preventDefault();
  };

  return (
    // Main container for the list of property items, with dragover event handling
    <div
      className="property-items"
      onDragOver={handleDragOver} // Handles the dragover event to allow dropping
      // onDrop={handleRemoveDrop} // Placeholder for drop handler (currently commented out)
    >
      {/* Conditionally render properties or a message when no properties are available */}
      {properties.length > 0 ? (
        // Mapping over the properties array to render each property item
        properties.map((property) => (
          <PropertyItem
            key={property.id} // Unique key for each property item to improve rendering performance
            property={property} // Passing the property object to PropertyItem
            togglefavourite={togglefavourite} // Passing the togglefavourite function to PropertyItem
            isInfavourites={false} // Boolean indicating whether the property is in the favourites list (currently set to false)
            onDragEnd={onDragEnd} // Passing the onDragEnd function to handle drag end events
          />
        ))
      ) : (
        // Displayed if there are no properties to show
        <p className="properties-not-found">
          Sorry, no properties match your search criteria..
        </p>
      )}
    </div>
  );
};

// Exporting the PropertySection component for use in other parts of the application
export default PropertySection;
