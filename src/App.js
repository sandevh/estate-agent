import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import propertyData from "./data/properties.json";
import SearchForm from "./components/SearchForm/SearchForm";
import FavoriteSection from "./components/FavoriteSection/FavoriteSection";
import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
import PropertySection from "./components/PropertySection/PropertySection";

const App = () => {
  const [properties] = useState(propertyData?.properties || []);

  const [filteredProperties, setFilteredProperties] = useState(properties);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
    // const handleSearch = (search) => {
    //   const filteredProperties = properties.filter((property) => {
    //     const addedDate = new Date(${property.added.month}-${property.added.day}-${property.added.year});

    //     const isTypeMatch = search.type ? search.type === property.type : true;

    //     let isInPriceRange = true;
    //     if (search.minPrice && search.maxPrice) {
    //       isInPriceRange =
    //         search.minPrice <= property.price &&
    //         property.price <= search.maxPrice;
    //     } else if (search.minPrice) {
    //       isInPriceRange = search.minPrice <= property.price;
    //     } else if (search.maxPrice) {
    //       isInPriceRange = search.maxPrice >= property.price;
    //     } 

    //     let isInBedroomsRange = true;
    //     if (search.minBedrooms && search.maxBedrooms) {
    //       isInBedroomsRange =
    //         search.minBedrooms <= property.bedrooms &&
    //         property.bedrooms <= search.maxBedrooms;
    //     } else if (search.minBedrooms) {
    //       isInBedroomsRange = search.minBedrooms <= property.bedrooms;
    //     } else if (search.maxBedrooms) {
    //       isInBedroomsRange = search.maxBedrooms >= property.bedrooms;
    //     }

    //     let isInDateRange = true;
    //       if (search.startDate && search.endDate) {
    //         isInDateRange =
    //           new Date(search.startDate) <= addedDate &&
    //           addedDate <= new Date(search.endDate);
    //       } else if (search.startDate) {
    //         isInDateRange = new Date(search.startDate) <= addedDate;
    //       } else if (search.endDate) {
    //         isInDateRange = new Date (search.endDate) >= addedDate;
    //       }

    //     const isPostCodeMatch = search.postcodeArea
    //       ? property.location
    //           .toLowerCase()
    //           .includes(search.postcodeArea.toLowerCase().trim())
    //       : true;
    //     return (
    //       isTypeMatch &&
    //       isInPriceRange &&
    //       isInBedroomsRange &&
    //       isInDateRange &&
    //       isPostCodeMatch
    //     );
    //   });
    //   setFilteredProperties(filteredProperties);
    // };

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
          (search.minBedrooms ? search.minBedrooms <= property.bedrooms: true) &&
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

  const handleAddDrop = (e) => {
    e.preventDefault();
    const property_item = e.dataTransfer.getData("property_details");
    const propertyDetails = JSON.parse(property_item);
    const property = propertyDetails[0];
    const isInFavorites = propertyDetails[1];
    if (!isInFavorites) {
      addFavorite(property);
    }
  };

  const handleRemoveDrop = (e) => {
    e.preventDefault();
    const property_item = e.dataTransfer.getData("property_details");
    const propertyDetails = JSON.parse(property_item);
    const property = propertyDetails[0];
    const isInFavorites = propertyDetails[1];
    if (isInFavorites) {
      removeFavorite(property);
    }
  };

  return (
    <Router>
      <div className="App">
        <h2>Real Estate</h2>

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
                >
                  <PropertySection
                    properties={filteredProperties}
                    toggleFavorite={addFavorite}
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

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
// import propertyData from "./data/properties.json";
// import SearchForm from "./components/SearchForm/SearchForm";
// import FavoriteSection from "./components/FavoriteSection/FavoriteSection";
// import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
// import PropertySection from "./components/PropertySection/PropertySection";

// const useFavorites = () => {
//   const loadFavorites = () =>
//     JSON.parse(localStorage.getItem("favorites")) || [];

//   const saveFavorites = (favorites) =>
//     localStorage.setItem("favorites", JSON.stringify(favorites));

//   const [favorites, setFavorites] = useState(loadFavorites);

//   const addFavorite = useCallback(
//     (property) => {
//       if (favorites.find((favorite) => property.id === favorite.id)) {
//         window.alert("Already in Favorites");
//         return;
//       }
//       const updatedFavorites = [...favorites, property];
//       setFavorites(updatedFavorites);
//       saveFavorites(updatedFavorites);
//     },
//     [favorites]
//   );

//   const removeFavorite = useCallback(
//     (property) => {
//       const updatedFavorites = favorites.filter(
//         (favorite) => favorite.id !== property.id
//       );
//       setFavorites(updatedFavorites);
//       saveFavorites(updatedFavorites);
//     },
//     [favorites]
//   );

//   const clearFavorites = useCallback(() => {
//     setFavorites([]);
//     saveFavorites([]);
//   }, []);

//   return { favorites, addFavorite, removeFavorite, clearFavorites };
// };

// const parseDate = ({ day, month, year }) => {
//   return new Date(`${month}-${day}-${year}`);
// };

// const App = () => {
//   const [properties] = useState(propertyData?.properties || []);

//   useEffect(() => {
//     if (!propertyData?.properties) {
//       console.warn("No properties available.");
//     }
//   }, []);

//   const [filteredProperties, setFilteredProperties] = useState(properties);

//   const { favorites, addFavorite, removeFavorite, clearFavorites } =
//     useFavorites();

//   const handleSearch = useCallback(
//     (search) => {
//       const filtered = properties.filter((property) => {
//         const addedDate = parseDate(property.added);

//         if (isNaN(addedDate.getTime())) {
//           console.warn("Invalid date in property data:", property.added);
//           return false;
//         }

//         const isTypeMatch = search.type ? search.type === property.type : true;

//         const isInPriceRange =
//           (search.minPrice ? search.minPrice <= property.price : true) &&
//           (search.maxPrice ? search.maxPrice >= property.price : true);

//         const isInBedroomsRange =
//           (search.minBedrooms
//             ? search.minBedrooms <= property.bedrooms
//             : true) &&
//           (search.maxBedrooms ? search.maxBedrooms >= property.bedrooms : true);

//         const isInDateRange =
//           (search.startDate ? new Date(search.startDate) <= addedDate : true) &&
//           (search.endDate ? new Date(search.endDate) >= addedDate : true);

//         const isPostCodeMatch = search.postcodeArea
//           ? property.location
//               .toLowerCase()
//               .includes(search.postcodeArea.toLowerCase().trim())
//           : true;

//         return (
//           isTypeMatch &&
//           isInPriceRange &&
//           isInBedroomsRange &&
//           isInDateRange &&
//           isPostCodeMatch
//         );
//       });
//       setFilteredProperties(filtered);
//     },
//     [properties]
//   );

//   const memoizedFilteredProperties = useMemo(
//     () => filteredProperties,
//     [filteredProperties]
//   );

//   return (
//       <Router>
//         <div className="App">
//           <h1>Real Estate App</h1>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <div>
//                   <h3>Search Form</h3>
//                   <SearchForm onSearch={handleSearch} />

//                   <h3>Properties</h3>
//                   {memoizedFilteredProperties.length > 0 ? (
//                     <PropertySection
//                       properties={memoizedFilteredProperties}
//                       toggleFavorite={addFavorite}
//                     />
//                   ) : (
//                     <p>No Properties Found</p>
//                   )}

//                   <h3>Favorite Properties</h3>
//                   {favorites.length > 0 ? (
//                     <FavoriteSection
//                       favorites={favorites}
//                       toggleFavorite={removeFavorite}
//                       onClear={clearFavorites}
//                     />
//                   ) : (
//                     <p>No Added Favorite Properties yet</p>
//                   )}
//                 </div>
//               }
//             />
//             <Route
//               path="/property/:id"
//               element={<PropertyDetails properties={properties} />}
//             />
//           </Routes>
//         </div>
//       </Router>
//   );
// };

// export default App;
