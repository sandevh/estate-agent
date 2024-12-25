import React, { useState } from 'react';
import './App.css';
import PropertyItem from './components/PropertyItem/PropertyItem';
import propertyData from "./data/properties.json";
import SearchForm from './components/SearchForm/SearchForm';
import FavoriteSection from './components/FavoriteSection/FavoriteSection';

const App = () => {

  const [properties] = useState(propertyData?.properties || []);

  const [filteredProperties, setFilteredProperties] = useState(properties);

  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

  const handleAddFavorites = (property) => {
    if (favorites.find((favorite) => property.id === favorite.id)) {
      alert("Already in Favorites");
      return;
    }
    const updatedFavorites = [...favorites, property];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  const handleRemoveFavorites = (property) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== property.id
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.setItem("favorites", JSON.stringify([]))
  }

  const handleSearch = (search) => {
    const filteredProperties = properties.filter((property) => {
      const addedDate = new Date(`${property.added.month}-${property.added.day}-${property.added.year}`);
      
      const isTypeMatch = search.type ? search.type === property.type : true;
      
      let isInPriceRange = true;
      if (search.minPrice && search.maxPrice) {
        isInPriceRange =
          search.minPrice <= property.price &&
          property.price <= search.maxPrice;
      } else if (search.minPrice) {
        isInPriceRange = search.minPrice <= property.price;
      } else if (search.maxPrice) {
        isInPriceRange = search.maxPrice >= property.price;
      }
      // const isInPriceRange =
      //   search.minPrice && search.maxPrice
      //     ? property.price >= search.minPrice &&
      //       property.price <= search.maxPrice
      //     : true;
      
      let isInBedroomsRange = true;
      if (search.minBedrooms && search.maxBedrooms) {
        isInBedroomsRange =
          search.minBedrooms <= property.bedrooms &&
          property.bedrooms <= search.maxBedrooms;
      } else if (search.minBedrooms) {
        isInBedroomsRange = search.minBedrooms <= property.bedrooms;
      } else if (search.maxBedrooms) {
        isInBedroomsRange = search.maxBedrooms >= property.bedrooms;
      }
      // const isInBedroomsRange =
      //   search.minBedrooms && search.maxBedrooms
      //     ? property.bedrooms >= search.minBedrooms &&
      //       property.bedrooms <= search.maxBedrooms
      //     : true;

      let isInDateRange = true;
        if (search.startDate && search.endDate) {
          isInDateRange =
            new Date(search.startDate) <= addedDate &&
            addedDate <= new Date(search.endDate);
        } else if (search.startDate) {
          isInDateRange = new Date(search.startDate) <= addedDate;
        } else if (search.endDate) {
          isInDateRange = new Date (search.endDate) >= addedDate;
        }
      // const isInDateRange =
      //   search.startDate && search.endDate
      //     ? new Date(search.startDate) <= addedDate &&
      //       addedDate <= new Date(search.endDate)
      //     : true;

      const isPostCodeMatch = search.postcodeArea
        ? property.location
            .toLowerCase()
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
    setFilteredProperties(filteredProperties);
  };

  return (
    <div className="App">
      <h3>Search Form</h3>
      <SearchForm onSearch={handleSearch} />
      <h3>Properties</h3>
      <div className='property-items'>
        {filteredProperties.map((property) => (
          <PropertyItem
            key={property.id}
            property={property}
            toggleFavorite={handleAddFavorites}
            isInFavorites={false}
          />
        ))}
      </div>
      <h3>Favorite Properties</h3>
      {favorites.length > 0 ? (
        <FavoriteSection
          favorites={favorites}
          toggleFavorite={handleRemoveFavorites}
          onClear={clearFavorites}
        />
      ) : (
        "No Added favorite Properties yet"
      )}
    </div>
  );
}

export default App;