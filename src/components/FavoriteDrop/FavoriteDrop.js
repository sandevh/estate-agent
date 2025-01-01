import React from "react";
import "../FavoriteDrop/FavoriteDrop.css";

const FavoriteDrop = () => {

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return <div className="fd" onDragOver={handleDragOver}>
    <p>Drop properties here to Add to favorites</p>
  </div>;
}

export default FavoriteDrop;