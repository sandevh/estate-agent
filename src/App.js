import { useState } from 'react';
import './App.css';
import PropertyItem from './components/PropertyItem/PropertyItem';
import propertyData from "./data/properties.json";
import SearchForm from './components/SearchForm/SearchForm';

function App() {

  const [properties] = useState(propertyData.properties || []);

  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleSearch = (search) => {
    const filteredProperties = properties.filter((property) => {
      const isTypeMatch = search.type ? search.type === property.type : true;
      const isInPriceRange =
        search.minPrice && search.maxPrice
          ? property.price >= search.minPrice &&
            property.price <= search.maxPrice
          : true;
      const isInBedroomsRange =
        search.minBedrooms && search.maxBedrooms
          ? property.bedrooms >= search.minBedrooms &&
            property.bedrooms <= search.maxBedrooms
          : true;
      const isInDateRange =
        search.startDate && search.endDate
          ? search.startDate <= property.added &&
            property.added <= search.endDate
          : true;
      const isPostCodeMatch = search.postCodeArea
        ? search.postCodeArea === property.location.split(" ").pop()
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
      <SearchForm onSearch={handleSearch}/>
      {filteredProperties.map((property) => 
        <PropertyItem 
          key={property.id}
          property={property}
        />
      )}
    </div>
  );
}

export default App;
