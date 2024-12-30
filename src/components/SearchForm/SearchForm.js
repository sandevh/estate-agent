import React, { useState } from "react";
import "../SearchForm/SearchForm.css";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const SearchForm = ({ onSearch }) => {
  const [search, setSearch] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    startDate: null,
    endDate: null,
    postcodeArea: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setSearch({ ...search, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleReset = () => {
    const resetValues = {
      type: "",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      maxBedrooms: "",
      startDate: null,
      endDate: null,
      postcodeArea: "",
    };
    setSearch(resetValues);
    onSearch(resetValues);
  };

  return (
    <div className="search-form">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="form-group">
            <FormControl fullWidth>
              <InputLabel id="type-select-label">Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-input"
                name="type"
                value={search.type}
                onChange={handleChange}
                label="Type"
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Flat">Flat</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="form-group-inline">
            <TextField
              label="Min Price"
              type="number"
              name="minPrice"
              value={search.minPrice}
              onChange={handleChange}
            />
            <TextField
              label="Max Price"
              type="number"
              name="maxPrice"
              value={search.maxPrice}
              onChange={handleChange}
            />
          </div>

          <div className="form-group-inline">
            <TextField
              label="Min Bedrooms"
              type="number"
              name="minBedrooms"
              value={search.minBedrooms}
              onChange={handleChange}
            />
            <TextField
              label="Max Bedrooms"
              type="number"
              name="maxBedrooms"
              value={search.maxBedrooms}
              onChange={handleChange}
            />
          </div>

          <div className="form-group-inline">
            <DatePicker
              label="Start Date"
              value={search.startDate}
              onChange={(newValue) => handleDateChange("startDate", newValue)}
              TextFieldComponent={(params) => (
                <TextField {...params} fullWidth />
              )} 
            />
            <DatePicker
              label="End Date"
              value={search.endDate}
              onChange={(newValue) => handleDateChange("endDate", newValue)}
              TextFieldComponent={(params) => (
                <TextField {...params} fullWidth />
              )} 
            />
          </div>

          <div className="form-group">
            <TextField
              label="Post Code"
              type="text"
              name="postcodeArea"
              value={search.postcodeArea}
              onChange={handleChange}
            />
          </div>

          <div className="control-buttons form-group">
            <button type="submit">Search</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      </LocalizationProvider>
    </div>
  );
};

export default SearchForm;
