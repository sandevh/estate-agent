import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import propertyData from "./data/properties.json";
import SearchForm from "./components/SearchForm/SearchForm";
import FavoriteSection from "./components/FavoriteSection/FavoriteSection";
import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
import PropertySection from "./components/PropertySection/PropertySection";
import FavoriteDrop from "./components/FavoriteDrop/FavoriteDrop";

const App = () => {
  const [properties] = useState(propertyData?.properties || []);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [shouldShow, setShouldShow] = useState(false);

  const handleSearch = (search) => {
    const filtered = properties.filter((property) => {
      const addedDate = new Date(
        `${property.added.month}-${property.added.day}-${property.added.year}`
      );

      const isTypeMatch = search.type ? search.type === property.type : true;
      const isInPriceRange =
        (search.minPrice ? search.minPrice <= property.price : true) &&
        (search.maxPrice ? search.maxPrice >= property.price : true);
      const isInBedroomsRange =
        (search.minBedrooms ? search.minBedrooms <= property.bedrooms : true) &&
        (search.maxBedrooms ? search.maxBedrooms >= property.bedrooms : true);
      const isInDateRange =
        (search.startDate ? new Date(search.startDate) <= addedDate : true) &&
        (search.endDate ? new Date(search.endDate) >= addedDate : true);
      const isPostCodeMatch = search.postcodeArea
        ? property.location
            .toLowerCase()
            .split(" ")
            .pop()
            .includes(search.postcodeArea.toLowerCase().trim())
        : true;

      return (
        isTypeMatch &&
        isInPriceRange &&
        isInBedroomsRange &&
        isInDateRange &&
        isPostCodeMatch
      );
    });
    setFilteredProperties(filtered);
  };

  const addFavorite = (property) => {
    if (favorites.find((favorite) => property.id === favorite.id)) {
      alert("Already in Favorites");
      return;
    }
    const updatedFavorites = [...favorites, property];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (property) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== property.id
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.setItem("favorites", JSON.stringify([]));
  };

  const handleDragStart = (e) => {
    if (e.isInFavorites) {
      console.log("weee")
    }
    setShouldShow(true);
  };

  const handleDragEnd = () => {
    setShouldShow(false);
  }

  const handleAddDrop = (e) => {
    e.preventDefault();
    setShouldShow(false);

    const property_item = e.dataTransfer.getData("property_details");
    if (!property_item) return;

    const propertyDetails = JSON.parse(property_item);
    const property = propertyDetails[0];
    const isInFavorites = propertyDetails[1];

    if (!isInFavorites) {
      addFavorite(property);
    }
  };

  const handleRemoveDrop = (e) => {
    e.preventDefault();
    setShouldShow(false);

    const property_item = e.dataTransfer.getData("property_details");
    if (!property_item) return;

    const propertyDetails = JSON.parse(property_item);
    const property = propertyDetails[0];
    const isInFavorites = propertyDetails[1];

    if (isInFavorites) {
      removeFavorite(property);
    }
  };

  return (
    <Router>
      <div
        className="App"
        onDragOver={(e) => e.preventDefault()}
      >
        <h2>Real Estate</h2>
        {shouldShow && (
          <div onDrop={handleAddDrop} className="drop-zone">
            <FavoriteDrop />
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h3>Search Form</h3>
                <SearchForm onSearch={handleSearch} />

                <h3>Properties</h3>
                <div
                  onDrop={handleRemoveDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={handleDragStart}
                >
                  <PropertySection
                    properties={filteredProperties}
                    toggleFavorite={addFavorite}
                    onDragEnd={handleDragEnd}
                  />
                </div>

                <h3>Favorite Properties</h3>
                <div
                  onDrop={handleAddDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <FavoriteSection
                    favorites={favorites}
                    toggleFavorite={removeFavorite}
                    onClear={clearFavorites}
                    onDragEnd={handleDragEnd}
                  />
                </div>
              </>
            }
          />
          <Route
            path="/property/:id"
            element={<PropertyDetails properties={properties} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

