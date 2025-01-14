import React, { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import Chart from "./components/Chart/Chart";
import { fetchData } from "./api";
import covidImg from "./assets/images/covid-img.png";

function App() {
  const [covidData, setCovidData] = useState({});
  const [country, setCountry] = useState("");

  const handleCountryChange = async (country) => {
    try {
      const fetchedData = await fetchData(country);
      setCovidData(fetchedData);
      setCountry(country);
    } catch (error) {
      console.erro("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    const fetchedCovidData = async () => {
      try {
        const data = await fetchData();
        setCovidData(data);
      } catch (error) {
        console.erro("Failed to fetch data:", error);
      }
    };
    fetchedCovidData();
  }, []);

  return (
    <div className="container">
      <img src={covidImg} className="covid-img" alt="COVID-19" />
      <Cards data={covidData} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={covidData} country={country} />
    </div>
  );
}

export default App;
