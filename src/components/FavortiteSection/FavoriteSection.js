import React from "react";
import PropertyItem from "../PropertyItem/PropertyItem";
import "../FavortiteSection/FavoriteSection.css";

const FavoriteSection = ({favorites, toggleFavorite, onClear}) => {

  return (
    <div className="favorite-section">
      {favorites.length > 0 && (
        <button onClick={onClear}>Clear Favorites</button>
      )}
      {favorites.map((favoriteProperty) => (
        <PropertyItem
          property={favoriteProperty}
          toggleFavorite={toggleFavorite}
          isInFavorites={true}
        />
      ))}
    </div>
  );
};

export default FavoriteSection;