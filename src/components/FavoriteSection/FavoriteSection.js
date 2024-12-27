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
        <div>
          <button onClick={onClear} className="clear-button">
            Clear Favorites
          </button>
        </div>
      )}

      {favorites.length > 0 ? (
        <div className="favorite-grid">
          {favorites.map((favoriteProperty) => (
            <PropertyItem
              key={favoriteProperty.id}
              property={favoriteProperty}
              toggleFavorite={toggleFavorite}
              isInFavorites={true}
            />
          ))}
        </div>
      ) : (
        <div>
          <p>No favorite properties yet.</p>
          <p>Drag Properties here to add</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteSection;
