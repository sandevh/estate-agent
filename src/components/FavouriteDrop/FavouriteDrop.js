import React from "react";
import "../FavouriteDrop/FavouriteDrop.css";


// This component renders a drop zone where users can drag and drop properties to add them to favourites.
const favouriteDrop = () => {
  // Prevent the default behavior when dragging over the drop zone.
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="favourtie-drop" onDragOver={handleDragOver}>
      <p>Drop properties here to Add to favourites</p>
    </div>
  );
};

export default favouriteDrop;
