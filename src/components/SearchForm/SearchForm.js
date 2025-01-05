// Importing necessary modules and components
import React, { useState, useCallback } from "react";
import "../SearchForm/SearchForm.css"; // Importing the CSS file for styling the SearchForm component
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material"; // Importing Material UI components for UI elements
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Importing DatePicker component for date selection
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; // Importing LocalizationProvider for date handling
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Importing Dayjs adapter for date management
import dayjs from "dayjs"; // Importing Dayjs for date manipulation

/**
 * SearchForm Component
 *
 * A form for searching properties based on user input, including filters such as price, bedrooms, date range, and postcode.
 * The form validates inputs and provides error messages when input is invalid.
 *
 * onSearch - Callback function triggered when the form is submitted, receiving the search criteria.
 */
const SearchForm = ({ onSearch }) => {
  // State to hold the current search criteria values
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

  // State to hold validation error messages
  const [errors, setErrors] = useState({});
  // State to determine if form validation should be shown (after form submission or field change)
  const [showValidation, setShowValidation] = useState(false);

  /**
   * validateForm
   *
   * Validates the search form based on defined criteria, ensuring that price, bedroom, date, and postcode fields have valid inputs.
   * It returns a boolean indicating whether the form is valid.
   *
   * Returns true if the form is valid, false if there are errors.
   */
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Price validation
    if (search.minPrice || search.maxPrice) {
      if (Number(search.minPrice) < 0) {
        newErrors.minPrice = "Minimum price cannot be negative";
      } else if (Number(search.maxPrice) < 0) {
        newErrors.maxPrice = "Maximum price cannot be negative";
      } else if (
        search.maxPrice &&
        Number(search.minPrice) > Number(search.maxPrice)
      ) {
        newErrors.maxPrice = "Maximum price must be greater than minimum price";
      }
    }

    // Bedroom validation
    if (search.minBedrooms || search.maxBedrooms) {
      if (Number(search.minBedrooms) < 0) {
        newErrors.minBedrooms = "Minimum bedrooms cannot be negative";
      } else if (Number(search.maxBedrooms) < 0) {
        newErrors.maxBedrooms = "Maximum bedrooms cannot be negative";
      } else if (
        search.maxBedrooms &&
        Number(search.minBedrooms) > Number(search.maxBedrooms)
      ) {
        newErrors.maxBedrooms =
          "Maximum bedrooms must be greater than minimum bedrooms";
      }
    }

    // Date validation (only if both startDate and endDate are filled)
    if (search.startDate && search.endDate) {
      const startDate = search.startDate;
      const endDate = search.endDate;

      if (dayjs(startDate).isAfter(endDate)) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    // Validation for dates not exceeding the current date
    if (search.startDate || search.endDate) {
      const startDate = search.startDate;
      const endDate = search.endDate;
      if (dayjs(startDate).isAfter(dayjs(), "day")) {
        newErrors.startDate = "Start date cannot exceed current date";
      }
      if (dayjs(endDate).isAfter(dayjs(), "day")) {
        newErrors.endDate = "End date cannot exceed current date";
      }
    }

    // Postcode validation
    if (search.postcodeArea) {
      const postcodeRegex = /^[A-Za-z0-9]+$/;
      const formattedPostcode = search.postcodeArea.trim();

      if (formattedPostcode.length < 3) {
        newErrors.postcodeArea = "Postcode must be at least 3 characters long";
      } else if (!postcodeRegex.test(formattedPostcode)) {
        newErrors.postcodeArea =
          "Postcode can only contain letters and numbers";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [search]);

  /**
   * handleChange
   *
   * Handles changes in text input fields (price, bedrooms, postcode) and updates the state accordingly.
   * It also triggers form validation when `showValidation` is true.
   *
   * e - The change event object containing the input field's name and value.
   */
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setSearch((prevSearch) => ({ ...prevSearch, [name]: value }));
      if (showValidation) {
        validateForm();
      }
    },
    [showValidation, validateForm]
  );

  /**
   * handleDateChange
   *
   * Handles changes in the start and end date fields and updates the state accordingly.
   * It also triggers form validation when `showValidation` is true.
   *
   * name - The name of the date field ("startDate" or "endDate").
   * value - The selected date value.
   */
  const handleDateChange = useCallback(
    (name, value) => {
      setSearch((prevSearch) => ({ ...prevSearch, [name]: value }));
      if (showValidation) {
        validateForm();
      }
    },
    [showValidation, validateForm]
  );

  /**
   * handleSubmit
   *
   * Handles form submission, triggers form validation, and calls the `onSearch` callback if the form is valid.
   *
   * e - The submit event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowValidation(true);

    if (validateForm()) {
      onSearch(search);
    }
  };

  /**
   * handleReset
   *
   * Resets all search form fields to their default values and clears validation errors.
   */
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
    setErrors({});
    setShowValidation(false);
    onSearch(resetValues);
  };

  return (
    // Form container wrapped in LocalizationProvider for date handling
    <div className="search-form">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <p className="search-form-heading">Search Properties Here</p>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          {/* Property Type Selector */}
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
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Flat">Flat</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Min/Max Price Input */}
          <div className="form-group-inline">
            <TextField
              label="Min Price"
              type="number"
              name="minPrice"
              value={search.minPrice}
              onChange={handleChange}
              error={!!errors.minPrice}
              helperText={errors.minPrice}
            />
            <TextField
              label="Max Price"
              type="number"
              name="maxPrice"
              value={search.maxPrice}
              onChange={handleChange}
              error={!!errors.maxPrice}
              helperText={errors.maxPrice}
            />
          </div>

          {/* Min/Max Bedrooms Input */}
          <div className="form-group-inline">
            <TextField
              label="Min Bedrooms"
              type="number"
              name="minBedrooms"
              value={search.minBedrooms}
              onChange={handleChange}
              error={!!errors.minBedrooms}
              helperText={errors.minBedrooms}
            />
            <TextField
              label="Max Bedrooms"
              type="number"
              name="maxBedrooms"
              value={search.maxBedrooms}
              onChange={handleChange}
              error={!!errors.maxBedrooms}
              helperText={errors.maxBedrooms}
            />
          </div>

          {/* Start/End Date Picker */}
          <div className="form-group-inline">
            <DatePicker
              label="Start Date"
              value={search.startDate}
              minDate={dayjs()}
              onChange={(newValue) => handleDateChange("startDate", newValue)}
              slotProps={{
                textField: {
                  error: !!errors.startDate,
                  helperText: errors.startDate,
                  fullWidth: true,
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={search.endDate}
              minDate={dayjs()}
              onChange={(newValue) => handleDateChange("endDate", newValue)}
              slotProps={{
                textField: {
                  error: !!errors.endDate,
                  helperText: errors.endDate,
                  fullWidth: true,
                },
              }}
            />
          </div>

          {/* Postcode Area Input */}
          <div className="form-group-inline">
            <TextField
              label="Post Code"
              type="text"
              name="postcodeArea"
              value={search.postcodeArea}
              onChange={handleChange}
              error={!!errors.postcodeArea}
              helperText={errors.postcodeArea}
            />
          </div>

          {/* Submit and Reset Buttons */}
          <div className="control-buttons form-group">
            <button type="submit" className="standard-button">
              Search
            </button>
            <button type="reset" className="standard-button">
              Reset
            </button>
          </div>
        </form>
      </LocalizationProvider>
    </div>
  );
};

// Exporting the SearchForm component for use in other parts of the application
export default SearchForm;
