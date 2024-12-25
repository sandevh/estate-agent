import React, { useState } from "react";

const SearchForm = ({onSearch}) => {
  const [search, setSearch] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    startDate: "",
    endDate: "",
    postcodeArea: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type: </label>
          <select name="type" value={search.type} onChange={handleChange}>
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div>
          <label>Min Price: </label>
          <input
            type="number"
            name="minPrice"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Max Price: </label>
          <input
            type="number"
            name="maxPrice"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Min Bedrooms: </label>
          <input
            type="number"
            name="minBedrooms"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Max Bedrooms: </label>
          <input
            type="number"
            name="maxBedrooms"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Start Date: </label>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>End Date: </label>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Post Code: </label>
          <input
            type="text"
            name="postcodeArea"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Search</button>
      </form>
      <p>Search Criteria: {JSON.stringify(search, null, 2)}</p>
    </div>
  );
};

export default SearchForm;
