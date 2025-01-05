import React, { useState } from "react";
import "./Gallery.css";

/**
 * Gallery Component
 *
 * Displays a gallery of images with a carousel and clickable thumbnails.
 *
 * galleryImages - Array of image file paths to display in the gallery.
 */
const Gallery = ({ galleryImages }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Tracks the currently displayed image.

  // Updates the selected image when a thumbnail is clicked.
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Moves to the next image in the carousel.
  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Moves to the previous image in the carousel.
  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="gallery-container">
      {/* Carousel to display the currently selected image */}
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

      {/* Thumbnail images */}
      <div className="thumbnails-container">
        {galleryImages.map((image, index) => (
          <img
            key={index}
            src={"../" + image}
            alt="Thumbnail"
            className={`thumbnail-image ${
              index === selectedImageIndex ? "selected" : ""
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
