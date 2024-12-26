import React from "react";
import PropertyItem from "../PropertyItem/PropertyItem";
import "../FavoriteSection/FavoriteSection.css";

const FavoriteSection = ({ favorites, toggleFavorite, onClear, handleAddDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="favorite-section" 
      onDragOver={handleDragOver}
      // onDrop={handleAddDrop}
    >
      {favorites.length > 0 && (
        <button onClick={onClear} className="clear-button">
          Clear Favorites
        </button>
      )}

      {favorites.length > 0 ? (
        favorites.map((favoriteProperty) => (
          <PropertyItem
            key={favoriteProperty.id}
            property={favoriteProperty}
            toggleFavorite={toggleFavorite}
            isInFavorites={true}
          />
        ))
      ) : (
        <p>No favorite properties yet.</p>
      )}
    </div>
  );
};

export default FavoriteSection;
