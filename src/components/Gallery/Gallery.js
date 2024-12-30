import React, { useState } from "react";
import "./Gallery.css";

const Gallery = ({ galleryImages }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="gallery-container">
      <div className="carousel-container">
        <button className="prev-button" onClick={prevImage}>
          &#10094;
        </button>
        <img
          src={"../" + galleryImages[selectedImageIndex]}
          alt="Enlarged"
          className="fullscreen-image"
        />
        <button className="next-button" onClick={nextImage}>
          &#10095;
        </button>
      </div>

      {/* Thumbnails */}
      <div className="thumbnails-container">
        {galleryImages.map((image, index) => (
          <img
            key={index}
            src={"../" + image}
            alt="Thumbnail"
            className={`thumbnail-image ${index === selectedImageIndex ? "selected" : ""}`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
