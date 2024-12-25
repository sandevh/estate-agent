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
    e.preventDefault();
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
          <label>Type: </label>
          <select name="type" value={search.type} onChange={handleChange}>
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="form-group-inline">
          <div>
            <label>Min Price: </label>
            <input
              type="number"
              name="minPrice"
              value={search.minPrice}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Max Price: </label>
            <input
              type="number"
              name="maxPrice"
              value={search.maxPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group-inline">
          <div>
            <label>Min Bedrooms: </label>
            <input
              type="number"
              name="minBedrooms"
              value={search.minBedrooms}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Max Bedrooms: </label>
            <input
              type="number"
              name="maxBedrooms"
              value={search.maxBedrooms}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group-inline">
          <div>
            <label>Start Date: </label>
            <input
              type="date"
              name="startDate"
              value={search.startDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>End Date: </label>
            <input
              type="date"
              name="endDate"
              value={search.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Post Code: </label>
          <input
            type="text"
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
