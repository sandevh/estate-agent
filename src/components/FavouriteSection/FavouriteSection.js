import React from "react";
import PropertyItem from "../PropertyItem/PropertyItem";
import "../FavouriteSection/FavouriteSection.css";

/**
 * favouriteSection Component
 *
 * Displays the list of favourite properties with options to clear favourites or toggle them.
 * Supports drag-and-drop functionality for managing favourites.
 *
 * favourites - Array of favourite properties.
 * togglefavourite - Function to add or remove a property from favourites.
 * onClear - Function to clear all favourite properties.
 * onDragEnd - Function to handle the end of a drag event.
 */
const favouriteSection = ({ favourites, togglefavourite, onClear, onDragEnd }) => {
  // Prevent the default drag-over behavior.
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="favourite-section" onDragOver={handleDragOver}>
      {/* Display clear button if there are favourites */}
      {favourites.length > 0 && (
        <div>
          <button onClick={onClear} className="clear-button standard-button">
            Clear favourites
          </button>
        </div>
      )}

      {/* Display grid of favourite properties or a placeholder message */}
      {favourites.length > 0 ? (
        <div className="favourite-grid">
          {favourites.map((favouriteProperty) => (
            <PropertyItem
              key={favouriteProperty.id}
              property={favouriteProperty}
              togglefavourite={togglefavourite}
              isInfavourites={true}
              onDragEnd={onDragEnd}
            />
          ))}
        </div>
      ) : (
        <div className="no-favourites">
          <p>No favourite properties yet.</p>
          <p>Drag & Drop Properties here to add</p>
        </div>
      )}
    </div>
  );
};

export default favouriteSection;
