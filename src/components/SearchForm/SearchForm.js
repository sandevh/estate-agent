import React, { useState } from "react";
import "../SearchForm/SearchForm.css";

const SearchForm = ({ onSearch }) => {
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
    onSearch(search);
  };

  const handleReset = (e) => {
    // e.preventDefault();
    setSearch({
      type: "",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      maxBedrooms: "",
      startDate: "",
      endDate: "",
      postcodeArea: "",
    });
    onSearch({
      type: "",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      maxBedrooms: "",
      startDate: "",
      endDate: "",
      postcodeArea: "",
    });
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form-group">
          <label htmlFor="type">Type: </label>
          <select
            id="type"
            name="type"
            value={search.type}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="form-group-inline">
          <div>
            <label htmlFor="minPrice">Min Price: </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={search.minPrice}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="maxPrice">Max Price: </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={search.maxPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group-inline">
          <div>
            <label htmlFor="minBedrooms">Min Bedrooms: </label>
            <input
              type="number"
              id="minBedrooms"
              name="minBedrooms"
              value={search.minBedrooms}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="maxBedrooms">Max Bedrooms: </label>
            <input
              type="number"
              id="maxBedrooms"
              name="maxBedrooms"
              value={search.maxBedrooms}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group-inline">
          <div>
            <label htmlFor="startDate">Start Date: </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={search.startDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="endDate">End Date: </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={search.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="postcodeArea">Post Code: </label>
          <input
            type="text"
            id="postcodeArea"
            name="postcodeArea"
            value={search.postcodeArea}
            onChange={handleChange}
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
