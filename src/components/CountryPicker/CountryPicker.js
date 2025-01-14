import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../../api";

function CountryPicker({ handleCountryChange }) {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const fetchedCountriesData = await fetchCountries();
        setFetchedCountries(fetchedCountriesData);
      } catch (error) {
        console.erro("Failed to fetch data:", error);
      }
    };
    fetchApi();
  }, []);
  return (
    <FormControl className="form-control">
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {fetchedCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

export default CountryPicker;
