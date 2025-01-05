// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
// import propertyData from "./data/properties.json";
// import SearchForm from "./components/SearchForm/SearchForm";
// import favouriteSection from "./components/favouriteSection/favouriteSection";
// import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
// import PropertySection from "./components/PropertySection/PropertySection";
// import favouriteDrop from "./components/favouriteDrop/favouriteDrop";

// const App = () => {
//   const [properties] = useState(propertyData?.properties || []);
//   const [filteredProperties, setFilteredProperties] = useState(properties);
//   const [favourites, setfavourites] = useState(
//     JSON.parse(localStorage.getItem("favourites")) || []
//   );
//   const [shouldShow, setShouldShow] = useState(false);

//   const handleSearch = (search) => {
//     const filtered = properties.filter((property) => {
//       const addedDate = new Date(
//         `${property.added.month}-${property.added.day}-${property.added.year}`
//       );
//       const isTypeMatch =
//         search.type === "Any" || (search.type ? search.type === property.type : true );
//       const isInPriceRange =
//         (search.minPrice ? search.minPrice <= property.price : true) &&
//         (search.maxPrice ? search.maxPrice >= property.price : true);
//       const isInBedroomsRange =
//         (search.minBedrooms ? search.minBedrooms <= property.bedrooms : true) &&
//         (search.maxBedrooms ? search.maxBedrooms >= property.bedrooms : true);
//       const isInDateRange =
//         (search.startDate ? new Date(search.startDate) <= addedDate : true) &&
//         (search.endDate ? new Date(search.endDate) >= addedDate : true);
//       const isPostCodeMatch = search.postcodeArea
//         ? property.location
//             .toLowerCase()
//             .split(", ")
//             .pop()
//             .includes(search.postcodeArea.toLowerCase().trim())
//         : true;

//       return (
//         isTypeMatch &&
//         isInPriceRange &&
//         isInBedroomsRange &&
//         isInDateRange &&
//         isPostCodeMatch
//       );
//     });
//     setFilteredProperties(filtered);
//   };

//   const addfavourite = (property) => {
//     if (favourites.find((favourite) => property.id === favourite.id)) {
//       alert("Already in favourites");
//       return;
//     }
//     const updatedfavourites = [...favourites, property];
//     setfavourites(updatedfavourites);
//     localStorage.setItem("favourites", JSON.stringify(updatedfavourites));
//   };

//   const removefavourite = (property) => {
//     const updatedfavourites = favourites.filter(
//       (favourite) => favourite.id !== property.id
//     );
//     setfavourites(updatedfavourites);
//     localStorage.setItem("favourites", JSON.stringify(updatedfavourites));
//   };

//   const clearfavourites = () => {
//     setfavourites([]);
//     localStorage.setItem("favourites", JSON.stringify([]));
//   };

//   const handleDragStart = (e) => {
//     if (e.isInfavourites) {
//       console.log("weee")
//     }
//     setShouldShow(true);
//   };

//   const handleDragEnd = () => {
//     setShouldShow(false);
//   }

//   const handleAddDrop = (e) => {
//     e.preventDefault();
//     setShouldShow(false);

//     const property_item = e.dataTransfer.getData("property_details");
//     if (!property_item) return;

//     const propertyDetails = JSON.parse(property_item);
//     const property = propertyDetails[0];
//     const isInfavourites = propertyDetails[1];

//     if (!isInfavourites) {
//       addfavourite(property);
//     }
//   };

//   const handleRemoveDrop = (e) => {
//     e.preventDefault();
//     setShouldShow(false);

//     const property_item = e.dataTransfer.getData("property_details");
//     if (!property_item) return;

//     const propertyDetails = JSON.parse(property_item);
//     const property = propertyDetails[0];
//     const isInfavourites = propertyDetails[1];

//     if (isInfavourites) {
//       removefavourite(property);
//     }
//   };

//   return (
//     <Router>
//       <div
//         className="App"
//         onDragOver={(e) => e.preventDefault()}
//       >
//         <h1 className="site-name">Estate Agent</h1>
//         {shouldShow && (
//           <div onDrop={handleAddDrop} className="drop-zone">
//             <favouriteDrop />
//           </div>
//         )}
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 {/* <h3>Search Form</h3> */}
//                 <SearchForm onSearch={handleSearch} />

//                 {/* <h3>Properties</h3> */}
//                 <div
//                   onDrop={handleRemoveDrop}
//                   onDragOver={(e) => e.preventDefault()}
//                   onDragEnter={handleDragStart}
//                 >
//                   <PropertySection
//                     properties={filteredProperties}
//                     togglefavourite={addfavourite}
//                     onDragEnd={handleDragEnd}
//                   />
//                 </div>

//                 <h3>favourite Properties</h3>
//                 <div
//                   onDrop={handleAddDrop}
//                   onDragOver={(e) => e.preventDefault()}
//                 >
//                   <favouriteSection
//                     favourites={favourites}
//                     togglefavourite={removefavourite}
//                     onClear={clearfavourites}
//                     onDragEnd={handleDragEnd}
//                   />
//                 </div>
//               </>
//             }
//           />
//           <Route
//             path="/property/:id"
//             element={<PropertyDetails properties={properties} />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import propertyData from "./data/properties.json";
import SearchForm from "./components/SearchForm/SearchForm";
import FavouriteSection from "./components/FavouriteSection/FavouriteSection";
import FavouriteDrop from "./components/FavouriteDrop/FavouriteDrop";
import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
import PropertySection from "./components/PropertySection/PropertySection";

const App = () => {
  // State for holding property data loaded from JSON.
  const [properties] = useState(propertyData?.properties || []);

  // State for storing the search criteria entered by the user.
  const [search, setSearch] = useState({});

  // State for managing the list of favourite properties, loaded from localStorage if available.
  const [favourites, setfavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  // State for tracking if the drag-and-drop drop zones should be visible.
  const [shouldShow, setShouldShow] = useState(false);

  // Sync the favourites state with localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Filter properties based on the search criteria using useMemo for optimization.
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const addedDate = new Date(
        `${property.added.month}-${property.added.day}-${property.added.year}`
      );

      // Check if the property matches the selected type, price range, bedrooms range, date range, and postcode area.
      const isTypeMatch =
        search.type === "Any" ||
        (search.type ? search.type === property.type : true);
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
            .split(", ")
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
  }, [properties, search]);

  // Add a property to the favourites list if it is not already there.
  const addfavourite = (property) => {
    setfavourites((prevfavourites) => {
      if (prevfavourites.find((favourite) => property.id === favourite.id)) {
        alert("Already in favourites");
        return prevfavourites;
      }
      return [...prevfavourites, property];
    });
  };

  // Remove a property from the favourites list.
  const removefavourite = (property) => {
    setfavourites((prevfavourites) =>
      prevfavourites.filter((favourite) => favourite.id !== property.id)
    );
  };

  // Clear all properties from the favourites list.
  const clearfavourites = () => {
    setfavourites([]);
  };

  // Display the drop zone when a drag event starts.
  const handleDragStart = () => {
    setShouldShow(true);
  };

  // Hide the drop zone when a drag event ends.
  const handleDragEnd = () => {
    setShouldShow(false);
  };

  // Add a property to favourites using drag-and-drop.
  const handleAddDrop = (e) => {
    e.preventDefault();
    setShouldShow(false);

    const propertyItem = e.dataTransfer.getData("property_details");
    if (!propertyItem) return;

    const propertyDetails = JSON.parse(propertyItem);
    const property = propertyDetails[0];
    const isInfavourites = propertyDetails[1];

    if (!isInfavourites) {
      addfavourite(property);
    }
  };

  // Remove a property from favourites using drag-and-drop.
  const handleRemoveDrop = (e) => {
    e.preventDefault();
    setShouldShow(false);

    const propertyItem = e.dataTransfer.getData("property_details");
    if (!propertyItem) return;

    const propertyDetails = JSON.parse(propertyItem);
    const property = propertyDetails[0];
    const isInfavourites = propertyDetails[1];

    if (isInfavourites) {
      removefavourite(property);
    }
  };

  // Prevent default browser behavior for drag-over events.
  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <Router>
      <div className="App" onDragOver={preventDefault}>
        <h1 className="site-name">Estate Agent</h1>

        {/* Show a drop zone for adding properties to favourites during a drag operation. */}
        {shouldShow && (
          <div onDrop={handleAddDrop} className="drop-zone">
            <FavouriteDrop />
          </div>
        )}

        <Routes>
          {/* Home page with search form, property list, and favourites section */}
          <Route
            path="/"
            element={
              <>
                <SearchForm onSearch={setSearch} />
                <div
                  onDrop={handleRemoveDrop}
                  onDragOver={preventDefault}
                  onDragEnter={handleDragStart}
                >
                  <PropertySection
                    properties={filteredProperties}
                    togglefavourite={addfavourite}
                    onDragEnd={handleDragEnd}
                  />
                </div>

                <h3>Favourite Properties</h3>
                <div onDrop={handleAddDrop} onDragOver={preventDefault}>
                  <FavouriteSection
                    favourites={favourites}
                    togglefavourite={removefavourite}
                    onClear={clearfavourites}
                    onDragEnd={handleDragEnd}
                  />
                </div>
              </>
            }
          />

          {/* Route for displaying details of a specific property */}
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
