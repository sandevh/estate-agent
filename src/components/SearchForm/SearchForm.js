// import React, { useState } from "react";
// import "../SearchForm/SearchForm.css";

// const SearchForm = ({ onSearch }) => {
//   const [search, setSearch] = useState({
//     type: "",
//     minPrice: "",
//     maxPrice: "",
//     minBedrooms: "",
//     maxBedrooms: "",
//     startDate: "",
//     endDate: "",
//     postcodeArea: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSearch({ ...search, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(search);
//   };

//   const handleReset = (e) => {
//     // e.preventDefault();
//     const resetValues = {
//       type: "",
//       minPrice: "",
//       maxPrice: "",
//       minBedrooms: "",
//       maxBedrooms: "",
//       startDate: "",
//       endDate: "",
//       postcodeArea: "",
//     };
//     setSearch(resetValues);
//     onSearch(resetValues);
//   };

//   return (
//     <div className="search-form">
//       <form onSubmit={handleSubmit} onReset={handleReset}>
//         <div className="form-group">
//           <label htmlFor="type-input">Type: </label>
//           <select
//             id="type-input"
//             name="type"
//             value={search.type}
//             onChange={handleChange}
//           >
//             <option value="">Any</option>
//             <option value="House">House</option>
//             <option value="Flat">Flat</option>
//           </select>
//         </div>

//         <div className="form-group-inline">
//           <div>
//             <label htmlFor="minPrice-input">Min Price: </label>
//             <input
//               type="number"
//               id="minPrice-input"
//               name="minPrice"
//               value={search.minPrice}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label htmlFor="maxPrice-input">Max Price: </label>
//             <input
//               type="number"
//               id="maxPrice-input"
//               name="maxPrice"
//               value={search.maxPrice}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="form-group-inline">
//           <div>
//             <label htmlFor="minBedrooms-input">Min Bedrooms: </label>
//             <input
//               type="number"
//               id="minBedrooms-input"
//               name="minBedrooms"
//               value={search.minBedrooms}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label htmlFor="maxBedrooms-input">Max Bedrooms: </label>
//             <input
//               type="number"
//               id="maxBedrooms-input"
//               name="maxBedrooms"
//               value={search.maxBedrooms}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="form-group-inline">
//           <div>
//             <label htmlFor="startDate-input">Start Date: </label>
//             <input
//               type="date"
//               id="startDate-input"
//               name="startDate"
//               value={search.startDate}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label htmlFor="endDate-input">End Date: </label>
//             <input
//               type="date"
//               id="endDate-input"
//               name="endDate"
//               value={search.endDate}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="postcodeArea-input">Post Code: </label>
//           <input
//             type="text"
//             id="postcodeArea-input"
//             name="postcodeArea"
//             value={search.postcodeArea}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="control-buttons">
//           <button type="submit">Search</button>
//           <button type="reset">Reset</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchForm;

import React, { useState } from "react";
import { DropdownList, NumberPicker, DateTimePicker } from "react-widgets";
import "../SearchForm/SearchForm.css";
import "react-widgets/styles.css";

const SearchForm = ({ onSearch }) => {
  const [search, setSearch] = useState({
    type: "",
    minPrice: null, 
    maxPrice: null, 
    minBedrooms: null, 
    maxBedrooms: null, 
    startDate: null,
    endDate: null,
    postcodeArea: "",
  });

  const handleChange = (value, name) => {
    if (
      name === "minPrice" ||
      name === "maxPrice" ||
      name === "minBedrooms" ||
      name === "maxBedrooms"
    ) {
      value = Number(value);
    }
    setSearch({ ...search, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleReset = (e) => {
    const resetValues = {
      type: "",
      minPrice: null, 
      maxPrice: null, 
      minBedrooms: null, 
      maxBedrooms: null, 
      startDate: null, 
      endDate: null, 
      postcodeArea: "",
    };
    setSearch(resetValues);
    onSearch(resetValues);
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form-group">
          <label htmlFor="type-input">Type: </label>
          <DropdownList
            name="type"
            value={search.type}
            onChange={(value) => handleChange(value, "type")}
            data={["", "House", "Flat"]}
          />
        </div>

        <div className="form-group-inline">
          <div>
            <label htmlFor="minPrice-input">Min Price: </label>
            <NumberPicker
              name="minPrice"
              value={search.minPrice}
              onChange={(value) => handleChange(value, "minPrice")}
              min={0}
            />
          </div>

          <div>
            <label htmlFor="maxPrice-input">Max Price: </label>
            <NumberPicker
              name="maxPrice"
              value={search.maxPrice}
              onChange={(value) => handleChange(value, "maxPrice")}
              min={0}
            />
          </div>
        </div>

        <div className="form-group-inline">
          <div>
            <label htmlFor="minBedrooms-input">Min Bedrooms: </label>
            <NumberPicker
              name="minBedrooms"
              value={search.minBedrooms}
              onChange={(value) => handleChange(value, "minBedrooms")}
              min={1}
            />
          </div>

          <div>
            <label htmlFor="maxBedrooms-input">Max Bedrooms: </label>
            <NumberPicker
              name="maxBedrooms"
              value={search.maxBedrooms}
              onChange={(value) => handleChange(value, "maxBedrooms")}
              min={1}
            />
          </div>
        </div>

        <div className="form-group-inline">
          <div>
            <label htmlFor="startDate-input">Start Date: </label>
            <DateTimePicker
              name="startDate"
              value={search.startDate}
              onChange={(value) => handleChange(value, "startDate")}
              time={"false"}
            />
          </div>

          <div>
            <label htmlFor="endDate-input">End Date: </label>
            <DateTimePicker
              name="endDate"
              value={search.endDate}
              onChange={(value) => handleChange(value, "endDate")}
              time={"false"}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="postcodeArea-input">Post Code: </label>
          <input
            type="text"
            id="postcodeArea-input"
            name="postcodeArea"
            value={search.postcodeArea}
            onChange={(e) => handleChange(e.target.value, "postcodeArea")}
          />
        </div>

        <div className="control-buttons">
          <button type="submit">Search</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
